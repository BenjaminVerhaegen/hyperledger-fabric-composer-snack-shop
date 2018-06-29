import {Component, OnInit} from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
    selector: 'app-shoppingLocation',
    templateUrl: './shopping-location.component.html',
    styleUrls: ['./shopping-location.component.css'],
    host: {'class': 'content'}
})

export class ShoppingLocationComponent implements OnInit {

    public shoppingLocations: object[];

    /**
     *
     * @param {SharedService} serviceShared
     */
    constructor(private serviceShared: SharedService) {}

    ngOnInit(): void {
        this.serviceShared.currentShoppingLocations.subscribe(shoppingLocations => this.shoppingLocations = shoppingLocations);
    }

    /**
     *
     *
     * @param shoppingLocation
     */
    passShoppingLocation(shoppingLocation): void {
        this.serviceShared.passShoppingLocation(shoppingLocation);
    }
}
