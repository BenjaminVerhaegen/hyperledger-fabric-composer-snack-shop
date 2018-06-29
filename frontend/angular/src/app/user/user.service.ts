import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../org.eyes.znueni';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class UserService {

    private NAMESPACE: string = 'User';

    constructor(private dataService: DataService<User>) {
    };

    public getAll(): Observable<User[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getUser(id: any): Observable<User> {
        return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addUser(itemToAdd: any): Observable<User> {
        return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateUser(id: any, itemToUpdate: any): Observable<User> {
        return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteUser(id: any): Observable<User> {
        return this.dataService.delete(this.NAMESPACE, id);
    }

    public issue(user: any): Observable<User> {
        return this.dataService.issue('/system/identities/issue', user)
    }
}
