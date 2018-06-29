import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../product.service";
import {ShoppingLocationService} from "../../shopping-location/shopping-location.service";
import {SharedService} from "../../shared.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-product-modals',
    templateUrl: './product-modals.component.html',
    styleUrls: ['./product-modals.component.css'],
    providers: [
        ProductService,
        ShoppingLocationService
    ]
})
export class ProductModalsComponent implements OnInit {

    public isLoading = false;
    public product;
    public shoppingLocations: object[];
    private errorMessage;
    private products: object[];
    public transaction = null;
    public difference = null;

    @ViewChild('closeAfterCreateButton') closeAfterCreateButton: ElementRef;
    @ViewChild('closeAfterDeleteButton') closeAfterDeleteButton: ElementRef;
    @ViewChild('closeAfterEditButton') closeAfterEditButton: ElementRef;

    productForm: FormGroup;
    name = new FormControl('', Validators.required);
    price = new FormControl('00.00', Validators.required);
    shoppingLocation = new FormControl('', Validators.required);

    constructor(private serviceShared: SharedService, private serviceProduct: ProductService, private serviceShoppingLocation: ShoppingLocationService, formBuilder: FormBuilder) {
        this.productForm = formBuilder.group({
            name: this.name,
            price: this.price,
            shoppingLocation: this.shoppingLocation
        });
    }

    ngOnInit() {
        this.serviceShared.currentProduct.subscribe(product => this.product = product);
        this.serviceShared.currentShoppingLocations.subscribe(shoppingLocations => this.shoppingLocations = shoppingLocations);
        this.serviceShared.currentProducts.subscribe(products => this.products = products);
    }

    addProduct(): Promise<any>{
        this.isLoading = true;
        let newProduct = this.productJson();
        newProduct.id = SharedService.generateRandom();
        return this.serviceProduct.addProduct(newProduct)
            .toPromise()
            .then(() => {
                this.errorMessage = null;
                newProduct.shoppingLocation = this.shoppingLocations.filter((shoppingLocation: any) => shoppingLocation.id === this.shoppingLocation.value)[0];
                this.products.push(newProduct);
                SharedService.sort(this.products, 'name');
                this.serviceShared.passProducts(this.products);
                this.resetForm();
                this.isLoading = false;
                SharedService.closeModal(this.closeAfterCreateButton);
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    updateProduct(): Promise<any> {
        this.isLoading = true;
        return this.serviceProduct.updateProduct(this.product.id, this.productJson())
            .toPromise()
            .then(() => {
                this.errorMessage = null;
                let productToEdit = this.products.filter((product: any) => product.id === this.product.id)[0];
                this.products = this.products.filter(product => product !== productToEdit);
                let product = this.productJson();
                product.shoppingLocation = this.shoppingLocations.filter((shoppingLocation: any) => shoppingLocation.id === this.shoppingLocation.value)[0];
                this.products.push(product);
                SharedService.sort(this.products, 'name');
                this.serviceShared.passProducts(this.products);
                this.isLoading = false;
                SharedService.closeModal(this.closeAfterEditButton);
            })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    deleteProduct(id): Promise<any> {
        this.isLoading = true;
        return this.serviceProduct.deleteProduct(id)
            .toPromise()
            .then(() => {
                this.errorMessage = null;
                let productToDelete: any = this.products.filter((product: any) => product.id === String(id))[0];
                this.products = this.products.filter(product => product !== productToDelete);
                SharedService.sort(this.products, 'name');
                this.serviceShared.passProducts(this.products);
                this.isLoading = false;
                SharedService.closeModal(this.closeAfterDeleteButton);
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    productJson(): any {
        return {
            $class: 'org.eyes.znueni.Product',
            'name': this.name.value,
            'price': this.price.value,
            'shoppingLocation': 'resource:org.eyes.znueni.ShoppingLocation#' + this.shoppingLocation.value
        };
    }

    resetForm(): void {
        this.productForm.setValue({
            'name': null,
            'price': null,
            'shoppingLocation': null
        });
    }
}
