import {Component, OnInit} from '@angular/core';
import {TransactionService} from "./transaction.service";
import {SharedService} from "../shared.service";
import {PagerService} from "../pager.service";

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css'],
    host: {'class': 'content'},
    providers: [TransactionService]
})
export class TransactionComponent implements OnInit {

    public transactions: object[];
    public pager: any = {};
    public pagedTransactions: any[];
    public isLoading = false;
    private errorMessage;

    constructor(private serviceShared: SharedService, private serviceTransaction: TransactionService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.loadAllTransactions()
            .then(() => {
                this.setPage(1);
                this.isLoading = false;
            });
    }

    /**
     *
     * @return {Promise<any>}
     */
    loadAllTransactions(): Promise<any> {
        let tempList = [];
        return this.serviceTransaction.getAllTransactions()
            .toPromise()
            .then((result) => {
                this.errorMessage = null;
                result.forEach((transaction: any) => {
                    let substrings = transaction.transactionType.split('.');
                    transaction.transactionType = substrings[substrings.length - 1];

                    if (transaction.participantInvoking) {
                        transaction.participantInvoking = transaction.participantInvoking.split('#')[1];
                    } else {
                        transaction.participantInvoking = 'none';
                    }

                    tempList.push(transaction);

                    tempList.sort((a: any, b: any) => {
                        if (a.transactionTimestamp > b.transactionTimestamp) return -1;
                        else if (a.transactionTimestamp < b.transactionTimestamp) return 1;
                        else return 0;
                    });

                });
                this.transactions = tempList;
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = PagerService.getPager(this.transactions.length, page);

        // get current page of items
        this.pagedTransactions = this.transactions.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    /**
     *
     *
     * @param transaction
     */
    passTransactionRecord(transaction): void {
        this.serviceShared.passTransactionRecord(transaction);
    }
}
