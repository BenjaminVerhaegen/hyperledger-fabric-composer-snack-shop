import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../product/product.service';
import {OrderService} from "../order.service";
import {OrderTransactionService} from "../order.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../shared.service";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
    selector: 'app-order-modals',
    templateUrl: './order-modals.component.html',
    styleUrls: ['./order-modals.component.css'],
    providers: [ProductService, OrderService, OrderTransactionService, ShoppingListService]
})
export class OrderModalsComponent implements OnInit {

    public isLoading = false;
    public allProducts;
    public allUsers;
    private errorMessage;
    public currentUser;
    public orderedProduct;
    public shoppingList;

    orderForm: FormGroup;
    product = new FormControl('', Validators.required);
    amount = new FormControl('1', Validators.required);

    @ViewChild('closeAfterOrder') closeAfterOrder: ElementRef;
    @ViewChild('closeAfterDeleteOrder') closeAfterDeleteOrder: ElementRef;

    constructor(private serviceShared: SharedService, private serviceProduct: ProductService, private orderService: OrderService, private orderTransactionService: OrderTransactionService, private shoppingListService: ShoppingListService, formBuilder: FormBuilder) {
        this.orderForm = formBuilder.group({
            product: this.product,
            amount: this.amount
        });
    }

    ngOnInit() {
        this.serviceShared.currentLoggedInUser.subscribe(user => this.currentUser = user);
        this.serviceShared.currentProducts.subscribe(products => this.allProducts = products);
        this.serviceShared.currentUsers.subscribe(users => this.allUsers = users);
        this.serviceShared.currentShoppingList.subscribe(shoppingList => this.shoppingList = shoppingList);
        this.serviceShared.currentOrderedProduct.subscribe(product => this.orderedProduct = product);
    }

    order(): Promise<any> {
        this.isLoading = true;
        return this.orderTransactionService.addOrder(this.orderJson())
            .toPromise()
            .then(() => {
                this.errorMessage = null;
                let order = this.orderJson();
                order.product = this.allProducts.filter((product: any) => product.id === this.product.value)[0];
                order.user = this.currentUser;

                this.shoppingList.orders.push(order);
                this.shoppingList.orders.sort((a: any, b: any) => {
                    if (a.product.name < b.product.name) return -1;
                    else if (a.product.name > b.product.name) return 1;
                    else return 0;
                });
                this.shoppingList.totalPrice += Number(order.amount * order.product.price);
                this.serviceShared.passShoppingList(this.shoppingList);
                this.isLoading = false;
                SharedService.closeModal(this.closeAfterOrder);
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    orderJson(): any {
        let amount = this.amount.value;
        if (this.amount.value < 1) {
            amount = 1;
        }
        return {
            $class: 'org.eyes.znueni.Order',
            'product': 'resource:org.eyes.znueni.Product#' + this.product.value,
            'user': 'resource:org.eyes.znueni.User#' + this.currentUser.email,
            'amount': amount,
        };
    }

    deleteOrderedProduct() {
        this.isLoading = true;
        this.shoppingList.orders.forEach((order) => {
            let product = this.allProducts.filter((product: any) => product.id ===  order.product.id)[0];
            order.product = 'resource:org.eyes.znueni.Product#' + product.id;
            if (order.user.email === this.currentUser.email) {
                order.user = 'resource:org.eyes.znueni.User#' + this.currentUser.email;
            } else {
                let user = this.allUsers.filter((user: any) => user.email ===  order.user.email)[0];
               order.user = 'resource:org.eyes.znueni.User#' + user.email;
            }
        });
        let orderToDelete = this.shoppingList.orders.filter((order: any) => order.transactionId ===  this.orderedProduct.transactionId)[0];
        this.shoppingList.orders = this.shoppingList.orders.filter(order => order !== orderToDelete);
        let totalPrice = this.shoppingList.totalPrice;
        delete this.shoppingList.totalPrice;
        return this.shoppingListService.updateAsset(this.shoppingList.id, this.shoppingList)
            .toPromise()
            .then(() => {

                this.shoppingList.orders.forEach((order) => {
                    let productRef = String(order.product);
                    let productId = productRef.substr(productRef.lastIndexOf('#') + 1);
                    order.product = this.allProducts.filter((product: any) => product.id ===  productId)[0];
                    if (order.user.email === this.currentUser.email) {
                        order.user = this.currentUser;
                    } else {
                        let userRef = String(order.user);
                        let userId = userRef.substr(userRef.lastIndexOf('#') + 1);
                        order.user = this.allUsers.filter((user: any) => user.email ===  userId)[0];
                    }
                });
                this.isLoading = true;
                this.shoppingList.totalPrice = totalPrice;
                this.serviceShared.passShoppingList(this.shoppingList);
                SharedService.closeModal(this.closeAfterDeleteOrder);
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            })
    }
}
