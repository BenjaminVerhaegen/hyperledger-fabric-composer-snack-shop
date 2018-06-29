import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../org.eyes.znueni';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ProductService {
    private NAMESPACE: string = 'Product';

    constructor(private dataService: DataService<Product>) {};

    public getAll(): Observable<Product[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getProduct(id: any): Observable<Product> {
        return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addProduct(itemToAdd: any): Observable<Product> {
        return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateProduct(id: any, itemToUpdate: any): Observable<Product> {
        return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteProduct(id: any): Observable<Product> {
        return this.dataService.delete(this.NAMESPACE, id);
    }
}
