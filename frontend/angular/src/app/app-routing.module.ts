import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LoginGuard} from "./login/login.guard";
import {HomeComponent} from './home/home.component';
import {UserComponent} from "./user/user.component";
import {ProductComponent} from "./product/product.component";
import {ShoppingLocationComponent} from "./shopping-location/shopping-location.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {SettingsComponent} from "./settings/settings.component";
import {OrderComponent} from "./order/order.component";
import {ShoppingListComponent} from './shopping-list/shopping-list.component';

/**
 *
 * @type {({path: string; component: HomeComponent; canActivate: LoginGuard[]} | {path: string; component: UserComponent; canActivate: LoginGuard[]} | {path: string; component: ProductComponent; canActivate: LoginGuard[]} | {path: string; component: ShoppingLocationComponent; canActivate: LoginGuard[]} | {path: string; component: TransactionComponent; canActivate: LoginGuard[]} | {path: string; component: SettingsComponent; canActivate: LoginGuard[]} | {path: string; component: OrderComponent; canActivate: LoginGuard[]} | {path: string; component: ShoppingListComponent; canActivate: LoginGuard[]} | {path: string; component: LoginComponent} | {path: string; redirectTo: string})[]}
 */
const routes: Routes = [
    {path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
    {path: 'users', component: UserComponent, canActivate: [LoginGuard]},
    {path: 'products', component: ProductComponent, canActivate: [LoginGuard]},
    {path: 'shopping-locations', component: ShoppingLocationComponent, canActivate: [LoginGuard]},
    {path: 'transactions', component: TransactionComponent, canActivate: [LoginGuard]},
    {path: 'settings', component: SettingsComponent, canActivate: [LoginGuard]},
    {path: 'orders', component: OrderComponent, canActivate: [LoginGuard]},
    {path: 'shopping-list', component: ShoppingListComponent, canActivate: [LoginGuard]},
    {path: 'login', component: LoginComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
