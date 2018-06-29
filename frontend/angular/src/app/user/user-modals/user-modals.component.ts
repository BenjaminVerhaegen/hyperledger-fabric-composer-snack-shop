import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {UserService} from '../user.service';
import {SharedService} from "../../shared.service";
import {DataService} from "../../data.service";
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-user-modals',
    templateUrl: './user-modals.component.html',
    styleUrls: ['./user-modals.component.css'],
    providers: [UserService]
})
export class UserModalsComponent implements OnInit {

    public isLoading = false;
    public user;
    public users: object[];
    private userRole;
    private errorMessage;
    public showPayInField = false;
    public showPayOutField = false;

    @ViewChild('closeAfterCreateButton') closeAfterCreateButton: ElementRef;
    @ViewChild('closeAfterDeactivateButton') closeAfterDeactivateButton: ElementRef;
    @ViewChild('closeAfterDeleteButton') closeAfterDeleteButton: ElementRef;
    @ViewChild('closeAfterEditButton') closeAfterEditButton: ElementRef;

    userForm: FormGroup;
    email = new FormControl('', Validators.required);
    firstName = new FormControl('', Validators.required);
    lastName = new FormControl('', Validators.required);
    balance = new FormControl('00.00', Validators.required);
    payIn = new FormControl('', Validators.required);
    payOut = new FormControl('', Validators.required);
    gender = new FormControl('', Validators.required);

    constructor(private serviceShared: SharedService, private serviceUser: UserService, formBuilder: FormBuilder, private dataService: DataService<any>) {
        this.userForm = formBuilder.group({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            balance: this.balance,
            payIn: this.payIn,
            payOut: this.payOut,
            gender: this.gender
        });
    }

    ngOnInit() {
        this.serviceShared.currentUser.subscribe(user => this.user = user);
        this.serviceShared.currentUsers.subscribe(users => this.users = users);
    }

    changeUserStatus(userIdentifier, currentStatus): Promise<any> {
        this.isLoading = true;
        userIdentifier = String(userIdentifier);
        let userToUpdate: any = this.users.filter((user: any) => user.email === userIdentifier)[0];
        this.users = this.users.filter(user => user !== userToUpdate);
        if (currentStatus === true) {
            userToUpdate.isActive = false;
        }

        if (currentStatus === false) {
            userToUpdate.isActive = true;
        }
        return this.serviceUser.updateUser(userIdentifier, userToUpdate)
            .toPromise()
            .then(() => {
                this.errorMessage = null;
                this.users.push(userToUpdate);
                SharedService.sort(this.users, 'email');
                this.serviceShared.passUsers(this.users);
                this.isLoading = false;
                SharedService.closeModal(this.closeAfterDeactivateButton);
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    onSelectRole(option) {
        this.userRole = option.value
    }

    createUser(): Promise<any> {
        this.showPayInField = false;
        this.showPayOutField = false;
        this.isLoading = true;
        if (!this.userRole) {
            this.userRole = false;
        }
        let newUser = this.userJson();
        newUser.email = this.email.value;
        if (!this.gender.value) {
            newUser.gender = 'M';
        }
        return this.serviceUser.addUser(newUser)
            .toPromise()
            .then(() => {
                this.errorMessage = null;
                this.users.push(newUser);
                SharedService.sort(this.users, 'email');
                this.serviceShared.passUsers(this.users);
                this.isLoading = false;
                this.resetForm();
                SharedService.closeModal(this.closeAfterCreateButton);
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    updateUser(): Promise<any> {
        this.isLoading = true;
        let userToEdit: any = this.users.filter((user: any) => user.email === this.user.email)[0];
        this.users = this.users.filter(user => user !== userToEdit);
        if (!this.userRole) {
            this.userRole = this.user.isAdmin;
        }
        let userObject = this.userJson();
        return this.serviceUser.updateUser(this.user.email, userObject)
            .toPromise()
            .then(() => {
                this.errorMessage = null;
                userToEdit.firstName = this.firstName.value;
                userToEdit.lastName = this.lastName.value;
                userToEdit.balance = userObject.balance;
                userToEdit.isAdmin = this.userRole;
                this.users.push(userToEdit);
                SharedService.sort(this.users, 'email');
                this.serviceShared.passUsers(this.users);
                this.isLoading = false;
                this.showPayInField = false;
                this.showPayOutField = false;
                SharedService.closeModal(this.closeAfterEditButton);
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    deleteUser(id): Promise<any> {
        this.isLoading = true;
        return this.serviceUser.deleteUser(id)
            .toPromise()
            .then(() => {
                this.errorMessage = null;
                let userToDelete: any = this.users.filter((user: any) => user.email === String(id))[0];
                this.users = this.users.filter(user => user !== userToDelete);
                SharedService.sort(this.users, 'email');
                this.serviceShared.passUsers(this.users);
                this.isLoading = false;
                SharedService.closeModal(this.closeAfterDeleteButton);
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    resetForm(): void {
        this.userForm.setValue({
            'email': null,
            'firstName': null,
            'lastName': null,
            'balance': null,
            'payIn': null,
            'payOut': null,
            'gender': null
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

    userJson(): any {
        let newUserBalance = this.user.balance;
        if (this.showPayInField && !this.showPayOutField) {
            if (this.payIn.value && this.payIn.value > 0) {
                newUserBalance = this.user.balance + this.payIn.value;
            }
        }

        if (!this.showPayInField && this.showPayOutField) {
            if (this.payOut.value && this.payOut.value > 0) {
                newUserBalance = this.user.balance - this.payOut.value;
            }
        }

        return {
            $class: 'org.eyes.znueni.User',
            'firstName': this.firstName.value,
            'lastName': this.lastName.value,
            'balance': newUserBalance,
            'isAdmin': this.userRole,
            'profileImage': 'no Image',
            'gender': this.gender.value
        };
    }
}
