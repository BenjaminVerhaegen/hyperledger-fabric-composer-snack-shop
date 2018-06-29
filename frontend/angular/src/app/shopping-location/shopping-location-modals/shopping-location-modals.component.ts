import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ShoppingLocationService} from "../shopping-location.service";
import {SharedService} from "../../shared.service";

@Component({
    selector: 'app-shopping-location-modals',
    templateUrl: './shopping-location-modals.component.html',
    styleUrls: ['./shopping-location-modals.component.css'],
    providers: [ShoppingLocationService]
})
export class ShoppingLocationModalsComponent implements OnInit {

    public shoppingLocation;
    public shoppingLocations;
    private errorMessage;
    public isLoading = false;

    @ViewChild('closeAfterCreateButton') closeAfterCreateButton: ElementRef;
    @ViewChild('closeAfterEditButton') closeAfterEditButton: ElementRef;

    shoppingLocationForm: FormGroup;
    name = new FormControl("", Validators.required);
    street = new FormControl("", Validators.required);
    zip = new FormControl("", Validators.required);

    /**
     *
     * @param {SharedService} serviceShared
     * @param {ShoppingLocationService} serviceShoppingLocation
     * @param {FormBuilder} formBuilder
     */
    constructor(private serviceShared: SharedService, private serviceShoppingLocation: ShoppingLocationService, formBuilder: FormBuilder) {
        this.shoppingLocationForm = formBuilder.group({
            name: this.name,
            street: this.street,
            zip: this.zip
        });
    };

    ngOnInit() {
        this.serviceShared.currentShoppingLocation.subscribe(shoppingLocation => this.shoppingLocation = shoppingLocation);
        this.serviceShared.currentShoppingLocations.subscribe(shoppingLocations => this.shoppingLocations = shoppingLocations);
    }

    /**
     *
     * @return {Promise<any>}
     */
    addShoppingLocation(): Promise<any> {
        this.isLoading = true;
        let newShoppingLocation = this.shoppingLocationJson();
        newShoppingLocation.id = SharedService.generateRandom();

        return this.serviceShoppingLocation.addShoppingLocation(newShoppingLocation)
            .toPromise()
            .then(() => {
                this.errorMessage = null;
                this.shoppingLocations.push(newShoppingLocation);
                SharedService.sort(this.shoppingLocations, 'name');
                this.serviceShared.passShoppingLocations(this.shoppingLocations);
                this.isLoading = false;
                this.resetForm();
                SharedService.closeModal(this.closeAfterCreateButton);
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    /**
     *
     * @return {Promise<any>}
     */
    updateShoppingLocation(): Promise<any> {
        this.isLoading = true;
        let shoppingLocationToEdit: any = this.shoppingLocations.filter((shoppingLocation: any) => shoppingLocation.id === this.shoppingLocation.id)[0];
        this.shoppingLocations = this.shoppingLocations.filter(shoppingLocation => shoppingLocation !== shoppingLocationToEdit);
        return this.serviceShoppingLocation.updateShoppingLocation(this.shoppingLocation.id, this.shoppingLocationJson())
            .toPromise()
            .then(() => {
                this.errorMessage = null;
                shoppingLocationToEdit.name = this.name.value;
                shoppingLocationToEdit.street = this.street.value;
                shoppingLocationToEdit.zip = this.zip.value;
                this.shoppingLocations.push(shoppingLocationToEdit)
                this.serviceShared.passShoppingLocations(this.shoppingLocations);
                this.isLoading = false;
                SharedService.closeModal(this.closeAfterEditButton);
            })
            .catch((error) => {
                this.errorMessage = SharedService.handleError(error);
            });
    }

    /**
     *
     */
    resetForm(): void {
        this.shoppingLocationForm.setValue({
            'name': null,
            'street': null,
            'zip': null
        });
    }

    shoppingLocationJson(): any {
        return {
            $class: "org.eyes.znueni.ShoppingLocation",
            'name': this.name.value,
            'street': this.street.value,
            'zip': this.zip.value
        };
    }
}
