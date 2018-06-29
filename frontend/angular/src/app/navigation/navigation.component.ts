import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    public currentUser;
    private currentPageTitle = 'Home';
    private userPages = [];
    private pages = [
        {
            path: '/home',
            title: 'Home',
            icon: 'home',
            requireAdminRole: false
        },
        {
            path: '/orders',
            title: 'Bestellungen',
            icon: 'shopping_cart',
            requireAdminRole: false
        },
        {
            path: '/products',
            title: 'Produkte',
            icon: 'list',
            requireAdminRole: false
        },
        {
            path: '/shopping-list',
            title: 'Einkaufsliste',
            icon: 'local_mall',
            requireAdminRole: true
        },
        {
            path: '/shopping-locations',
            title: 'Einkaufsorte',
            icon: 'location_on',
            requireAdminRole: false
        },
        {
            path: '/users',
            title: 'Benutzer',
            icon: 'people',
            requireAdminRole: true
        },
        {
            path: '/transactions',
            title: 'Transaktionen',
            icon: 'history',
            requireAdminRole: true
        },
        {
            path: '/settings',
            title: 'Einstellungen',
            icon: 'settings',
            requireAdminRole: false
        }
    ];

    /**
     *
     * @param {Router} router
     */
    constructor(private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                let currentUrl = event.url;
                this.pages.forEach((page) => {
                    if (currentUrl === page.path) {
                        if (page.title) {
                            this.currentPageTitle = page.title;
                            return true;
                        }
                        return false;
                    }
                });
            }
        });
    }

    ngOnInit() {
        this.pages.forEach((page) => {
            if (!page.requireAdminRole) {
                this.userPages.push(page);
            }
        });
    }

}
