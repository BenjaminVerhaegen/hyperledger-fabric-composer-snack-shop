"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
// Can be injected into a constructor
var SharedService = (function () {
    function SharedService() {
        this.user = new BehaviorSubject_1.BehaviorSubject('');
        this.currentUser = this.user.asObservable();
        this.shoppingLocation = new BehaviorSubject_1.BehaviorSubject('');
        this.currentShoppingLocation = this.shoppingLocation.asObservable();
        this.product = new BehaviorSubject_1.BehaviorSubject('');
        this.currentProduct = this.product.asObservable();
        this.orderedProduct = new BehaviorSubject_1.BehaviorSubject('');
        this.currentOrderedProduct = this.orderedProduct.asObservable();
        this.shoppingLocations = new BehaviorSubject_1.BehaviorSubject('');
        this.currentShoppingLocations = this.product.asObservable();
    }
    /**
     *
     * @param user
     */
    SharedService.prototype.passUser = function (user) {
        return this.user.next(user);
    };
    /**
     *
     * @param shoppingLocation
     */
    SharedService.prototype.passShoppingLocation = function (shoppingLocation) {
        return this.shoppingLocation.next(shoppingLocation);
    };
    /**
     *
     * @param shoppingLocations
     */
    SharedService.prototype.passShoppingLocations = function (shoppingLocations) {
        return this.shoppingLocations.next(shoppingLocations);
    };
    /**
     *
     * @param product
     */
    SharedService.prototype.passProduct = function (product) {
        return this.product.next(product);
    };
    /**
     *
     * @param product
     */
    SharedService.prototype.passOrderedProduct = function (product) {
        return this.orderedProduct.next(product);
    };
    /**
     * generate random
     * @returns {string}
     */
    SharedService.generateRandom = function () {
        // current timestamp as string
        var date = String(Date.now());
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        var random1 = Math.random().toString(36).substr(2, 9);
        var random2 = Math.random().toString(36).substr(2, 9);
        return random1.concat(date.concat(random2));
    };
    ;
    /**
     *
     * @param error
     */
    SharedService.handleError = function (error) {
        if (error == 'Server error') {
            return "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
            return "404 - Could not find API route. Please check your available APIs.";
        }
        else {
            return error;
        }
    };
    return SharedService;
}());
SharedService = __decorate([
    core_1.Injectable()
], SharedService);
exports.SharedService = SharedService;
