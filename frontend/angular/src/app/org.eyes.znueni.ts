import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';

export class User extends Participant {
    email: string;
    firstName: string;
    lastName: string;
    balance: number;
    isAdmin: boolean;
    isActive: boolean;
    profileImage: string;
    gender: Gender;
}

export class Product extends Asset {
    id: string;
    name: string;
    price: number;
    shoppingLocation: ShoppingLocation;
}

export class ShoppingLocation extends Asset {
    id: string;
    name: string;
    street: string;
    zip: string;
}

export class ShoppingList extends Asset {
    id: string;
    orders: Order[];
    state: ShoppingListState;
}

export class Order extends Transaction {
    product: Product;
    user: User;
    amount: number;
}

export class FinishShopping extends Transaction {
    shoppingList: ShoppingList;
}

export class ResetShoppingList extends Transaction {
    shoppingList: ShoppingList;
}

export enum ShoppingListState {
    NEW,
    OPEN,
    CLOSED,
}

export enum Gender {
    F,
    M,
}

export class addShoppingListNotification extends Event {
    shoppingList: ShoppingList;
}
