"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var org_hyperledger_composer_system_1 = require("./org.hyperledger.composer.system");
var org_hyperledger_composer_system_2 = require("./org.hyperledger.composer.system");
var org_hyperledger_composer_system_3 = require("./org.hyperledger.composer.system");
var org_hyperledger_composer_system_4 = require("./org.hyperledger.composer.system");
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(org_hyperledger_composer_system_2.Participant));
exports.User = User;
var Product = (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Product;
}(org_hyperledger_composer_system_1.Asset));
exports.Product = Product;
var ShoppingLocation = (function (_super) {
    __extends(ShoppingLocation, _super);
    function ShoppingLocation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ShoppingLocation;
}(org_hyperledger_composer_system_1.Asset));
exports.ShoppingLocation = ShoppingLocation;
var ShoppingList = (function (_super) {
    __extends(ShoppingList, _super);
    function ShoppingList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ShoppingList;
}(org_hyperledger_composer_system_1.Asset));
exports.ShoppingList = ShoppingList;
var Order = (function (_super) {
    __extends(Order, _super);
    function Order() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Order;
}(org_hyperledger_composer_system_3.Transaction));
exports.Order = Order;
var FinishShopping = (function (_super) {
    __extends(FinishShopping, _super);
    function FinishShopping() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FinishShopping;
}(org_hyperledger_composer_system_3.Transaction));
exports.FinishShopping = FinishShopping;
var ResetShoppingList = (function (_super) {
    __extends(ResetShoppingList, _super);
    function ResetShoppingList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResetShoppingList;
}(org_hyperledger_composer_system_3.Transaction));
exports.ResetShoppingList = ResetShoppingList;
var ShoppingListState;
(function (ShoppingListState) {
    ShoppingListState[ShoppingListState["NEW"] = 0] = "NEW";
    ShoppingListState[ShoppingListState["OPEN"] = 1] = "OPEN";
    ShoppingListState[ShoppingListState["CLOSED"] = 2] = "CLOSED";
})(ShoppingListState = exports.ShoppingListState || (exports.ShoppingListState = {}));
var Gender;
(function (Gender) {
    Gender[Gender["F"] = 0] = "F";
    Gender[Gender["M"] = 1] = "M";
})(Gender = exports.Gender || (exports.Gender = {}));
var addShoppingListNotification = (function (_super) {
    __extends(addShoppingListNotification, _super);
    function addShoppingListNotification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return addShoppingListNotification;
}(org_hyperledger_composer_system_4.Event));
exports.addShoppingListNotification = addShoppingListNotification;
