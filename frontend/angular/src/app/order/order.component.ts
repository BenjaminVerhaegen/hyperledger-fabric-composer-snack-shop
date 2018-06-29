import {Component, OnInit} from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
    host: {'class': 'content'}
})
export class OrderComponent implements OnInit {

    public shoppingList;
    public currentUser;
    public totalPrice = 0;

    /**
     *
     * @param {SharedService} serviceShared
     */
    constructor(private serviceShared: SharedService) {
    }

    ngOnInit() {
        this.serviceShared.currentLoggedInUser.subscribe(user => this.currentUser = user);
        this.serviceShared.currentShoppingList.subscribe(shoppingList => this.shoppingList = shoppingList);
        if (this.shoppingList.orders) {
            this.shoppingList.orders.forEach((order) => {
                if (order.user.email === this.currentUser.email) {
                    this.totalPrice =+ order.amount * order.product.price;
                }
            });
        }
    }

    passOrderedProduct(product): void {
        this.serviceShared.passOrderedProduct(product);
    }
}
