import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingLocation } from '../org.eyes.znueni';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ShoppingLocationService {

    private NAMESPACE: string = 'ShoppingLocation';

    constructor(private dataService: DataService<ShoppingLocation>) {};

    public getAll(): Observable<ShoppingLocation[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getShoppingLocation(id: any): Observable<ShoppingLocation> {
        return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addShoppingLocation(itemToAdd: any): Observable<ShoppingLocation> {
        return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateShoppingLocation(id: any, itemToUpdate: any): Observable<ShoppingLocation> {
        return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }
}
