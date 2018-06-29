import {Component, OnInit} from '@angular/core';
import {HeaderService} from './header.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [HeaderService]
})
export class HeaderComponent implements OnInit {

    public currentUser;

    constructor(private headerService: HeaderService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {}

}
