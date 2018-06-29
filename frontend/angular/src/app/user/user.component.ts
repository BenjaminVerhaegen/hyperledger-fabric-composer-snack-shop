import {Component, OnInit} from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    host: {'class': 'content'}
})
export class UserComponent implements OnInit {

    public users: object[];
    public currentUser;

    /**
     *
     * @param {SharedService} serviceShared
     */
    constructor(private serviceShared: SharedService) {
    }

    ngOnInit(): void {
        this.serviceShared.currentLoggedInUser.subscribe(user => this.currentUser = user);
        this.serviceShared.currentUsers.subscribe(users => this.users = users);
    }

    /**
     *
     *
     * @param user
     */
    passUser(user): void {
        this.serviceShared.passUser(user);
    }
}
