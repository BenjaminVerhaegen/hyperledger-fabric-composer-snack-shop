import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import {HistorianRecord} from '../org.hyperledger.composer.system';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TransactionService {

    private NAMESPACES = 'system/historian';

    constructor(
        private dataServiceHistorian: DataService<HistorianRecord>) {};

    getAllTransactions(): Observable<HistorianRecord[]> {
        return this.dataServiceHistorian.getAll(this.NAMESPACES);
    }
}
