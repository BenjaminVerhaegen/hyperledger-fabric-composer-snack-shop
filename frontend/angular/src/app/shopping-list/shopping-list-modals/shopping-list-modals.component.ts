import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../../order/order.service";
import {SharedService} from "../../shared.service";
import {SubmitTransactionService} from "./shopping-list-modals.service";
import {UserService} from "../../user/user.service";

@Component({
    selector: 'app-shopping-list-modals',
    templateUrl: './shopping-list-modals.component.html',
    styleUrls: ['./shopping-list-modals.component.css'],
    providers: [OrderService, SubmitTransactionService, UserService]

})
export class ShoppingListModalsComponent implements OnInit {

    public isLoading = false;
    private errorMessage;
    private shoppingList;
    public currentUser;
    @ViewChild('closeAfterReset') closeAfterReset: ElementRef;
    @ViewChild('closeAfterOffset') closeAfterOffset: ElementRef;

    constructor(private serviceShared: SharedService, private orderService: OrderService, private submitTransactionService: SubmitTransactionService, private userService: UserService) {
    }

    ngOnInit() {
        this.serviceShared.currentLoggedInUser.subscribe(user => this.currentUser = user);
        this.serviceShared.currentShoppingList.subscribe(shoppingList => this.shoppingList = shoppingList);
    }

    getOpenShoppingList(): Promise<any> {
        return this.orderService.getAll()
            .toPromise()
            .then((shoppingList) => {
                this.shoppingList = shoppingList[0];
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    finishShopping(): Promise<any> {
        this.isLoading = true;
        let nameSpace = 'FinishShopping';
        return this.submitTransactionService.submitFinishShopping(nameSpace, this.transactionJson(nameSpace))
            .toPromise()
            .then(() => {
                return this.userService.getUser(this.currentUser.email)
                    .toPromise()
                    .then((user) => {
                        this.currentUser.balance = user.balance;
                        this.serviceShared.passCurrentLoggedInUser(this.currentUser);
                    });
            })
            .then(() => {
                return this.getOpenShoppingList()
                    .then(() => {
                        this.serviceShared.passShoppingList(this.shoppingList);
                        this.isLoading = false;
                        SharedService.closeModal(this.closeAfterOffset);
                    });
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    resetShoppingList(): Promise<any> {
        this.isLoading = true;
        let nameSpace = 'ResetShoppingList';
        return this.submitTransactionService.submitResetShoppingList(nameSpace, this.transactionJson(nameSpace))
            .toPromise()
            .then(() => {
                this.shoppingList.orders = [];
                this.serviceShared.passShoppingList(this.shoppingList);
                this.isLoading = false;
                SharedService.closeModal(this.closeAfterReset);
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    transactionJson(transactionType: string): any {
        return {
            $class: 'org.eyes.znueni.' + transactionType,
            'shoppingList': 'resource:org.eyes.znueni.ShoppingList#' + this.shoppingList.id
        };
    }
}
