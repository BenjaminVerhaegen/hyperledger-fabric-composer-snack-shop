import {Component, OnInit} from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
    selector: 'app-Product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    host: {'class': 'content'}
})

export class ProductComponent implements OnInit {

    public products: object[];

    /**
     *
     * @param {SharedService} serviceShared
     */
    constructor(private serviceShared: SharedService) {}

    ngOnInit(): void {
        this.serviceShared.currentProducts.subscribe(products => this.products = products);
    }

    /**
     *
     * @param product
     */
    passProduct(product): void {
        this.serviceShared.passProduct(product);
    }
}
