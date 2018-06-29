import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SharedService} from "./shared.service";
import {UserService} from "./user/user.service";
import {ProductService} from "./product/product.service";
import {ShoppingLocationService} from "./shopping-location/shopping-location.service";
import {OrderService} from "./order/order.service";
import {DataService} from "./data.service";
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        UserService,
        ProductService,
        ShoppingLocationService,
        OrderService,
        DataService
    ]
})
export class AppComponent implements OnInit {

    public isLoading = false;
    public currentUser = null;
    private users: object[];
    private products: object[];
    private shoppingLocations: object[];
    private shoppingList: any;
    private productsHistory = {
        add: null,
        update: null,
        remove: null
    };
    private currentPageTitle = 'Home';
    private errorMessage;
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
            title: 'Orders',
            icon: 'shopping_cart',
            requireAdminRole: false
        },
        {
            path: '/products',
            title: 'Products',
            icon: 'list',
            requireAdminRole: false
        },
        {
            path: '/shopping-list',
            title: 'Shopping list',
            icon: 'local_mall',
            requireAdminRole: true
        },
        {
            path: '/shopping-locations',
            title: 'Shopping location',
            icon: 'location_on',
            requireAdminRole: false
        },
        {
            path: '/users',
            title: 'Users',
            icon: 'people',
            requireAdminRole: true
        },
        {
            path: '/transactions',
            title: 'Transactions',
            icon: 'history',
            requireAdminRole: true
        },
        {
            path: '/settings',
            title: 'Settings',
            icon: 'settings',
            requireAdminRole: false
        }
    ];

    /**
     *
     * @param {Router} router
     * @param {SharedService} sharedService
     * @param {UserService} userService
     * @param {ProductService} productService
     * @param {ShoppingLocationService} shoppingLocationService
     * @param {OrderService} orderService
     * @param {DataService<any>} dataService
     */
    constructor(private router: Router,
                private sharedService: SharedService,
                private userService: UserService,
                private productService: ProductService,
                private shoppingLocationService: ShoppingLocationService,
                private orderService: OrderService,
                private dataService: DataService<any>) {
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
        let data = JSON.parse(localStorage.getItem('data'));
        if (data) {
            return this.userService.getUser(data.user)
                .toPromise()
                .then((user) => {
                    this.currentUser = user
                })
                .then(() => {
                    if (this.currentUser) {
                        this.sharedService.passCurrentLoggedInUser(this.currentUser);
                        this.isLoading = true;
                        // load users
                        return this.loadObjects(this.userService, this.users, 'email')
                            .then((result) => {
                                this.users = result;
                                this.sharedService.passUsers(this.users);
                            })
                            .then(() => {
                                // load products
                                this.loadObjects(this.productService, this.products, 'name')
                                    .then((result) => {
                                        this.products = result;
                                        // load shopping locations
                                        this.loadObjects(this.shoppingLocationService, this.shoppingLocations, 'name')
                                            .then((result) => {
                                                this.shoppingLocations = result;
                                                this.products.forEach((product: any) => {
                                                    let shoppingLocationRef = String(product.shoppingLocation);
                                                    let shoppingLocationId = shoppingLocationRef.substr(shoppingLocationRef.lastIndexOf('#') + 1);
                                                    product.shoppingLocation = this.shoppingLocations.filter((shoppingLocation: any) => shoppingLocation.id === shoppingLocationId)[0];
                                                });
                                            })
                                            .then(() => {
                                                this.loadProductsHistory('addProductHistory')
                                                    .then(() => {
                                                        this.loadProductsHistory('updateProductHistory')
                                                            .then(() => {
                                                                this.products.forEach((product: any) => {

                                                                    let history = [];
                                                                    history.push(this.productsHistory.add.filter((record: any) => record.resources[0].id === product.id)[0]);

                                                                    let updateHistory = this.productsHistory.update.filter((record: any) => record.resources[0].id === product.id);

                                                                    updateHistory.forEach((updateRecord) => {
                                                                        history.push(updateRecord);
                                                                    });

                                                                    history.forEach((record) => {
                                                                        this.dataService.getSingle('system/historian', record.transactionId)
                                                                            .toPromise()
                                                                            .then((result) => {
                                                                                result.participantInvoking = result.participantInvoking.substr(result.participantInvoking.lastIndexOf('#') + 1);
                                                                                record.participantInvoking = result.participantInvoking;
                                                                            })
                                                                            .then(() => {
                                                                                record.type = 'not known';
                                                                                if (record.$class === 'org.hyperledger.composer.system.AddAsset') {
                                                                                    record.type = 'Create';
                                                                                }
                                                                                if (record.$class === 'org.hyperledger.composer.system.UpdateAsset') {
                                                                                    record.type = 'Update';
                                                                                }
                                                                            });
                                                                    });

                                                                    history.sort((a: any, b: any) => {
                                                                        if (a.timestamp > b.timestamp) return -1;
                                                                        else if  (a.timestamp < b.timestamp) return 1;
                                                                        else return 0;
                                                                    });

                                                                    product.history = history;
                                                                });
                                                            })
                                                            .then(() => {
                                                                this.products.forEach((product: any) => {
                                                                    product.history.forEach((history: any, index) => {
                                                                        let difference = {
                                                                            current: {},
                                                                            previous: {}
                                                                        };
                                                                        if (index + 1 < product.history.length) {
                                                                            for (let property of Object.keys(product.history[index].resources[0])) {
                                                                                if (product.history[index].resources[0][property] !== product.history[index + 1].resources[0][property]) {
                                                                                    difference.previous[property] = product.history[index + 1].resources[0][property];
                                                                                    difference.current[property] = product.history[index].resources[0][property];
                                                                                    product.history[index].difference = difference;
                                                                                }
                                                                            }
                                                                        }
                                                                    });
                                                                });
                                                            });
                                                    });
                                            })
                                            .then(() => {
                                                this.sharedService.passProducts(this.products);
                                                this.sharedService.passShoppingLocations(this.shoppingLocations);
                                            })
                                            .then(() => {
                                                return this.loadShoppingList()
                                                    .then(() => {
                                                        if (this.shoppingList) {
                                                            this.shoppingList.totalPrice = 0;
                                                            this.shoppingList.orders.forEach((order: any) => {
                                                                let productRef = String(order.product);
                                                                let productId = productRef.substr(productRef.lastIndexOf('#') + 1);
                                                                order.product = this.products.filter((product: any) => product.id === productId)[0];
                                                                order.product.transactionId = order.transactionId;
                                                                let userRef = String(order.user);
                                                                let userId = userRef.substr(userRef.lastIndexOf('#') + 1);
                                                                order.user = this.users.filter((user: any) => user.email === userId)[0];
                                                                this.shoppingList.totalPrice += Number(order.amount * order.product.price);
                                                            });
                                                        }
                                                    })
                                                    .then(() => {
                                                        if (this.shoppingList) {
                                                            this.shoppingList.orders.sort((a: any, b: any) => {
                                                                if (a.product.name < b.product.name) return -1;
                                                                else if (a.product.name > b.product.name) return 1;
                                                                else return 0;
                                                            });
                                                        }
                                                        this.sharedService.passShoppingList(this.shoppingList);
                                                        this.isLoading = false;
                                                    })

                                            });
                                    });
                            });
                    }
                })
                .catch((error) => {
                    this.errorMessage = SharedService.handleError(error);
                    console.log(this.errorMessage);
                    localStorage.removeItem('data');
                    return this.router.navigate(['/login']);
                });
        }
    }

    /**
     *
     * @param service
     * @param {object[]} objectsArray
     * @param {string} sortProperty
     * @return {Promise<any>}
     */
    loadObjects(service: any, objectsArray: object[], sortProperty: string): Promise<any> {
        let tempList = [];
        return service.getAll()
            .toPromise()
            .then((result) => {
                this.errorMessage = null;
                result.forEach(r => {
                    tempList.push(r);
                });
                objectsArray = tempList;
            })
            .then(() => {
                SharedService.sort(objectsArray, sortProperty);
                return objectsArray;
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    /**
     *
     * @return {Promise<any>}
     */
    loadShoppingList(): Promise<any> {
        return this.dataService.getOpenShoppingList()
            .then((result) => {
                this.shoppingList = result[0];
            });
    }

    /**
     *
     * @param {string} queryName
     * @return {Promise<Object>}
     */
    loadProductsHistory(queryName: string) {
        return this.dataService.getProductsHistory(queryName)
            .then((result) => {
                if (queryName === 'addProductHistory') {
                    this.productsHistory.add = result
                } else if (queryName === 'updateProductHistory') {
                    this.productsHistory.update = result
                } else if (queryName === 'deleteProductHistory') {
                    this.productsHistory.remove = result
                } else {
                    this.productsHistory = null;
                }
            });
    }
}
