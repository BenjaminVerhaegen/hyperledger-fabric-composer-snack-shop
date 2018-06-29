import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

// Can be injected into a constructor
@Injectable()
export class SharedService {

    private loggedInUser = new BehaviorSubject<any>('');
    public currentLoggedInUser = this.loggedInUser.asObservable();

    private user = new BehaviorSubject<any>('');
    public currentUser = this.user.asObservable();

    private product = new BehaviorSubject<any>('');
    public currentProduct = this.product.asObservable();

    private orderedProduct = new BehaviorSubject<any>('');
    public currentOrderedProduct = this.orderedProduct.asObservable();

    private users = new BehaviorSubject<object[]>([]);
    public currentUsers = this.users.asObservable();

    private products = new BehaviorSubject<object[]>([]);
    public currentProducts = this.products.asObservable();

    private shoppingLocations = new BehaviorSubject<object[]>([]);
    public currentShoppingLocations = this.shoppingLocations.asObservable();

    private shoppingLocation = new BehaviorSubject<any>('');
    public currentShoppingLocation = this.shoppingLocation.asObservable();

    private shoppingList = new BehaviorSubject<object>({});
    public currentShoppingList = this.shoppingList.asObservable();

    private transaction = new BehaviorSubject<any>('');
    public currentTransaction = this.transaction.asObservable();

    /**
     *
     * @param currentLoggedInUser
     */
    passCurrentLoggedInUser(currentLoggedInUser) {
        return this.loggedInUser.next(currentLoggedInUser);
    }

    /**
     *
     * @param user
     */
    passUser(user) {
        return this.user.next(user);
    }

    /**
     *
     * @param shoppingLocation
     */
    passShoppingLocation(shoppingLocation) {
        return this.shoppingLocation.next(shoppingLocation)
    }

    /**
     * 
     * @param product
     */
    passProduct(product) {
        return this.product.next(product);
    }

    /**
     *
     * @param product
     */
    passOrderedProduct(product) {
        return this.orderedProduct.next(product);
    }

    /**
     *
     * @param {object[]} users
     */
    passUsers(users: object[]): void {
        return this.users.next(users);
    }

    /**
     *
     * @param {object[]} products
     */
    passProducts(products: object[]): void {
        return this.products.next(products);
    }

    /**
     *
     * @param {object[]} shoppingLocations
     */
    passShoppingLocations(shoppingLocations: object[]): void {
        return this.shoppingLocations.next(shoppingLocations)
    }

    /**
     *
     * @param {object} shoppingList
     */
    passShoppingList(shoppingList: object): void {
        return this.shoppingList.next(shoppingList)
    }

    /**
     *
     * @param transaction
     */
    passTransactionRecord(transaction: any): void {
        return this.transaction.next(transaction)
    }

    /**
     * generate random
     * @returns {string}
     */
    static generateRandom(): String {
        // current timestamp as string
        let date = String(Date.now());
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        let random1 = Math.random().toString(36).substr(2, 9);
        let random2 = Math.random().toString(36).substr(2, 9);
        return random1.concat(date.concat(random2));
    };

    /**
     *
     * @param error
     */
    static handleError(error: any): any {
        if (error == 'Server error') {
            return "Could not connect to REST server. Please check your configuration details";
        } else if (error == '404 - Not Found') {
            return "404 - Could not find API route. Please check your available APIs."
        } else {
            return error;
        }
    }

    /**
     *
     * @param {object[]} values
     * @param {string} property
     */
    static sort(values: object[], property: string): void {
        values.sort((a: any, b: any) => {
            if (a[property] < b[property]) return -1;
            else if (a[property] > b[property]) return 1;
            else return 0;
        });
    }

    /**
     *
     * @param {ElementRef} elementRef
     */
    static closeModal(elementRef: ElementRef) {
        let event = new MouseEvent('click', {bubbles: true});
        elementRef.nativeElement.dispatchEvent(event);
    }
}
