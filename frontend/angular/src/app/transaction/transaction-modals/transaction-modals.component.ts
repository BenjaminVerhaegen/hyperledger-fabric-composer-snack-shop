import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../shared.service";

@Component({
    selector: 'app-transaction-modals',
    templateUrl: './transaction-modals.component.html',
    styleUrls: ['./transaction-modals.component.css']
})
export class TransactionModalsComponent implements OnInit {

    public transaction = null;
    public options = {
        lineNumbers: true,
        theme: 'material',
        mode: 'javascript',
        scroll: true
    };

    constructor(private serviceShared: SharedService) {
    }

    ngOnInit() {
        this.serviceShared.currentTransaction.subscribe(transaction => this.transaction = transaction);
    };

}
