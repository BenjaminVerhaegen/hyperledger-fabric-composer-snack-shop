import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import {FinishShopping} from "../../org.eyes.znueni";
import {ResetShoppingList} from "../../org.eyes.znueni";
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class SubmitTransactionService {

    constructor(private finishShopping: DataService<FinishShopping>, private resetShoppingList: DataService<ResetShoppingList>) {
    };

    public submitFinishShopping(nameSpace: string, itemToAdd: any): Observable<FinishShopping> {
        return this.finishShopping.add(nameSpace, itemToAdd);
    }

    public submitResetShoppingList(nameSpace: string, itemToAdd: any): Observable<ResetShoppingList> {
        return this.resetShoppingList.add(nameSpace, itemToAdd);
    }
}
