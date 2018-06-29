import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import {ShoppingList} from "../org.eyes.znueni";
import {Order} from "../org.eyes.znueni";
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class OrderTransactionService {

    private NAMESPACE: string = 'Order';

    constructor(private dataService: DataService<Order>) {
    };

    public getAll(): Observable<Order[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getOrder(id: any): Observable<Order> {
        return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addOrder(itemToAdd: any): Observable<Order> {
        return this.dataService.add(this.NAMESPACE, itemToAdd);
    }
}

// Can be injected into a constructor
@Injectable()
export class OrderService {

    private NAMESPACE: string = 'queries/selectOpenShoppingList';

    constructor(private dataService: DataService<ShoppingList>) {
    };

    public getAll(): Observable<ShoppingList[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getOrder(id: any): Observable<ShoppingList> {
        return this.dataService.getSingle(this.NAMESPACE, id);
    }
}