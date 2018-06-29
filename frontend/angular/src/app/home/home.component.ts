import {Component, OnInit} from '@angular/core';
import {SharedService} from "../shared.service";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    host: {'class': 'content'}
})

export class HomeComponent implements OnInit {

    public currentUser;

    constructor(private sharedService: SharedService) {
    }

    ngOnInit() {
        this.sharedService.currentLoggedInUser.subscribe(user => this.currentUser = user);
    }
}
