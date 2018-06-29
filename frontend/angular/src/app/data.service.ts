import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../environments/environment";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * rest api queries
 */
@Injectable()
export class DataService<Type> {
    private resolveSuffix: string = '?resolve=true';
    private actionUrl: string;
    private options: object;
    private headers: HttpHeaders;

    /**
     *
     * @param {HttpClient} httpClient
     */
    constructor(private httpClient: HttpClient) {
        this.actionUrl = environment.ServerWithApiUrl;
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.options = {
            headers: this.headers,
            withCredentials: true
        };
    }

    /**
     *
     * @param {string} ns
     * @return {Observable<Type[]>}
     */
    public getAll(ns: string): Observable<Type[]> {
        console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns);
        return this.httpClient.get(`${this.actionUrl}${ns}`, this.options)
            .catch(this.handleError);
    }

    /**
     *
     * @param {string} ns
     * @param {string} id
     * @return {Observable<Type>}
     */
    public getSingle(ns: string, id: string): Observable<Type> {
        console.log('GetSingle ' + ns);

        return this.httpClient.get(this.actionUrl + ns + '/' + id + this.resolveSuffix, this.options)
            .catch(this.handleError);
    }

    /**
     *
     * @param {string} ns
     * @param {Type} asset
     * @return {Observable<Type>}
     */
    public add(ns: string, asset: Type): Observable<Type> {
        console.log('Entered DataService add');
        console.log('Add ' + ns);
        console.log('asset', asset);

        return this.httpClient.post(this.actionUrl + ns, asset, this.options)
            .catch(this.handleError);
    }

    /**
     *
     * @param {string} ns
     * @param {string} id
     * @param {Type} itemToUpdate
     * @return {Observable<Type>}
     */
    public update(ns: string, id: string, itemToUpdate: Type): Observable<Type> {
        console.log('Update ' + ns);
        console.log('what is the id?', id);
        console.log('what is the updated item?', itemToUpdate);
        console.log('what is the updated item?', JSON.stringify(itemToUpdate));
        return this.httpClient.put(`${this.actionUrl}${ns}/${id}`, itemToUpdate, this.options)
            .catch(this.handleError);
    }

    /**
     *
     * @param {string} ns
     * @param {string} id
     * @return {Observable<Type>}
     */
    public delete(ns: string, id: string): Observable<Type> {
        console.log('Delete ' + ns);

        return this.httpClient.delete(this.actionUrl + ns + '/' + id, this.options)
            .catch(this.handleError);
    }

    /**
     *
     * @return {Promise<Object>}
     */
    public getOpenShoppingList() {
        return this.httpClient.get(this.actionUrl + 'queries/selectOpenShoppingList', this.options).toPromise()
    }

    /**
     *
     * @param {string} queryName
     * @return {Promise<Object>}
     */
    public getProductsHistory(queryName: string) {
        return this.httpClient.get(this.actionUrl + 'queries/' + queryName, this.options).toPromise()
    }

    /**
     *
     * @param error
     * @return {Observable<string>}
     */
    private handleError(error: any): Observable<string> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    /**
     * get user card
     *
     * @param {string} ns
     * @param {Type} participant
     * @return {Observable<any>}
     */
    public issue(ns: string, participant: Type) {
        return this.httpClient.post(this.actionUrl + ns, participant)
            .catch(this.handleError);
    }

    /**
     * import card to rest server
     *
     * @param file
     * @return {Promise<Object>}
     */
    importCard(file) {
        const formData = new FormData();
        formData.append('card', file);
        this.headers.set('Content-Type', 'multipart/form-data');
        return this.httpClient.post(this.actionUrl + 'wallet/import', formData, this.options).toPromise();
    }

    /**
     *
     * @return {Promise<Object>}
     */
    getCurrentUser() {
        return this.httpClient.get(this.actionUrl + 'system/ping', this.options).toPromise()
            .then((data) => {
                return data['participant'];
            })
            .then((participant) => {
               let email = participant.substr(participant.lastIndexOf('#') + 1);
               return this.httpClient.get(this.actionUrl + 'User/' + email, this.options).toPromise()
            });
    }

    /**
     *
     * @return {Promise<Object>}
     */
    checkUserWallet() {
        return this.httpClient.get(this.actionUrl + 'wallet', this.options).toPromise()
    }

    /**
     *
     * @param user
     * @return {Promise<void>}
     */
    issueUser(user) {
        /* not needed for now
        const identity = {
            participant: 'org.eyes.znueni.User#' + user.email,
            userID: user.email,
            options: {}
        };
        return this.httpClient.post('http://localhost:3001/api/system/identities/issue', identity, {responseType: 'blob'}).toPromise()
            .then((cardData) => {
                const file = new File([cardData], user.email +'@composer-network.card', {type: 'application/octet-stream', lastModified: Date.now()});
                const formData = new FormData();
                formData.append('card', file);
                let cardPath = '/Users/waleed/projects/LAP/DEMO/znueni.4eyes.ch/Blockchain/composer/cards/waleed_rest@composer-network.card';
                this.sendUserCard(user.email, cardPath);
            });
       */
    }

    /**
     *
     * @param user
     * @param card
     */
    sendUserCard(user, card) {
        /* not needed for now
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const options = new RequestOptions({
            headers: headers,
            responseType: ResponseContentType.Json,
            withCredentials: false
        });

        let body = JSON.stringify({
            user: user,
            card: card
        });

        this.http.post('http://localhost:3333/send-email', body, options).subscribe((data) => {
            if (data.json().success) {
                console.log('Sent successfully');
            }
        })
        */
    }

}
