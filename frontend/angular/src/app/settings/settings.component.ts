import {Component, OnInit} from '@angular/core';
import {SharedService} from "../shared.service";
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {UserService} from "../user/user.service";
import {httpFactory} from "@angular/http/src/http_module";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    host: {'class': 'content'},
    providers: [UserService]
})
export class SettingsComponent implements OnInit {

    public currentUser;
    private errorMessage;
    public isLoading = false;
    public showPayInField = false;
    public showPayOutField = false;

    userForm: FormGroup;
    firstName = new FormControl('', Validators.required);
    lastName = new FormControl('', Validators.required);
    gender = new FormControl('', Validators.required);
    payIn = new FormControl('', Validators.required);
    payOut = new FormControl('', Validators.required);

    /**
     *
     * @param {SharedService} sharedService
     * @param {UserService} serviceUser
     * @param {FormBuilder} formBuilder
     */
    constructor(private sharedService: SharedService, private serviceUser: UserService, formBuilder: FormBuilder) {
        this.userForm = formBuilder.group({
            firstName: this.firstName,
            lastName: this.lastName,
            gender: this.gender,
            payIn: this.payIn,
            payOut: this.payOut
        });
    }

    ngOnInit() {
        this.sharedService.currentLoggedInUser.subscribe(user => this.currentUser = user);
    }

    /**
     *
     * @return {Promise<any>}
     */
    updateUser(): Promise<any> {
        this.isLoading = true;
        return this.serviceUser.updateUser(this.currentUser.email, this.userJson())
            .toPromise()
            .then(() => {
                this.errorMessage = null;
                this.isLoading = false;
                this.showPayInField = false;
                this.showPayOutField = false;
            })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    addToBalance() {
        this.showPayInField = true;
        this.showPayOutField = false;
    }

    removeFromBalance() {
        this.showPayInField = false;
        this.showPayOutField = true;
    }

    /**
     *
     * @return {any}
     */
    userJson(): any {
        let newUserBalance = this.currentUser.balance;
        if (this.showPayInField && !this.showPayOutField) {
            if (this.payIn.value && this.payIn.value > 0) {
                newUserBalance = this.currentUser.balance + this.payIn.value;
            }
        }

        if (!this.showPayInField && this.showPayOutField) {
            if (this.payOut.value && this.payOut.value > 0) {
                newUserBalance = this.currentUser.balance - this.payOut.value;
            }
        }

        return {
            $class: 'org.eyes.znueni.User',
            'email': this.currentUser.email,
            'firstName': this.firstName.value,
            'lastName': this.lastName.value,
            'balance': newUserBalance,
            'isAdmin': this.currentUser.isAdmin,
            'isActive': this.currentUser.isActive,
            'gender': this.gender.value
        };
    }
}
