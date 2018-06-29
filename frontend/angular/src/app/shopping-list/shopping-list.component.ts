import {Component, OnInit} from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
    host: {class: 'content'}
})
export class ShoppingListComponent implements OnInit {

    private shoppingList: object;
    public total = 0;
    public currentUser = null;

    constructor(private serviceShared: SharedService) {}

    ngOnInit(): void {
        this.serviceShared.currentLoggedInUser.subscribe(user => this.currentUser = user);
        this.serviceShared.currentShoppingList.subscribe(shoppingList => this.shoppingList = shoppingList);
    }
}
