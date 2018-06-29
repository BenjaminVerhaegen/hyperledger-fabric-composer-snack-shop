import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { SharedService } from "./shared.service";
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from "./login/login.guard";
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from "./user/user.component";
import {UserModalsComponent} from "./user/user-modals/user-modals.component";
import { ProductComponent} from "./product/product.component";
import {ProductModalsComponent} from "./product/product-modals/product-modals.component";
import {ShoppingLocationComponent} from "./shopping-location/shopping-location.component";
import {ShoppingLocationModalsComponent} from "./shopping-location/shopping-location-modals/shopping-location-modals.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {SettingsComponent} from "./settings/settings.component";
import {OrderComponent} from "./order/order.component";
import {OrderModalsComponent} from "./order/order-modals/order-modals.component";
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListModalsComponent } from './shopping-list/shopping-list-modals/shopping-list-modals.component';
import { TransactionModalsComponent } from './transaction/transaction-modals/transaction-modals.component';

/**
 * impoer all component
 */
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        NavigationComponent,
        HeaderComponent,
        UserComponent,
        UserModalsComponent,
        ProductComponent,
        ProductModalsComponent,
        ShoppingLocationComponent,
        ShoppingLocationModalsComponent,
        TransactionComponent,
        SettingsComponent,
        OrderComponent,
        OrderModalsComponent,
        ShoppingListComponent,
        ShoppingListModalsComponent,
        TransactionModalsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        LoginGuard,
        DataService,
        SharedService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
