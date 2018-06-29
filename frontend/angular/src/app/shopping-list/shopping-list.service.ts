import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingList } from '../org.eyes.znueni';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ShoppingListService {
    private NAMESPACE: string = 'ShoppingList';

    constructor(private dataService: DataService<ShoppingList>) {};

    public getAll(): Observable<ShoppingList[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<ShoppingList> {
        return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<ShoppingList> {
        return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<ShoppingList> {
        return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<ShoppingList> {
        return this.dataService.delete(this.NAMESPACE, id);
    }
}
