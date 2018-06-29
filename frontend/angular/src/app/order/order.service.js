"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/Rx");
// Can be injected into a constructor
var OrderTransactionService = (function () {
    function OrderTransactionService(dataService) {
        this.dataService = dataService;
        this.NAMESPACE = 'Order';
    }
    ;
    OrderTransactionService.prototype.getAllOrders = function () {
        return this.dataService.getAll(this.NAMESPACE);
    };
    OrderTransactionService.prototype.getOrder = function (id) {
        return this.dataService.getSingle(this.NAMESPACE, id);
    };
    OrderTransactionService.prototype.addOrder = function (itemToAdd) {
        return this.dataService.add(this.NAMESPACE, itemToAdd);
    };
    return OrderTransactionService;
}());
OrderTransactionService = __decorate([
    core_1.Injectable()
], OrderTransactionService);
exports.OrderTransactionService = OrderTransactionService;
// Can be injected into a constructor
var OrderService = (function () {
    function OrderService(dataService) {
        this.dataService = dataService;
        this.NAMESPACE = 'queries/selectOpenShoppingList';
    }
    ;
    OrderService.prototype.getAllOrders = function () {
        return this.dataService.getAll(this.NAMESPACE);
    };
    OrderService.prototype.getOrder = function (id) {
        return this.dataService.getSingle(this.NAMESPACE, id);
    };
    return OrderService;
}());
OrderService = __decorate([
    core_1.Injectable()
], OrderService);
exports.OrderService = OrderService;
