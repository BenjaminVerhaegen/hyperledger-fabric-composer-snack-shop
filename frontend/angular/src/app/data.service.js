"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var http_2 = require("@angular/common/http");
/**
 * rest api queries
 */
var DataService = (function () {
    /**
     *
     * @param {HttpClient} httpClient
     * @param {Configuration} _configuration
     * @param {Http} http
     */
    function DataService(httpClient, _configuration, http) {
        this.httpClient = httpClient;
        this._configuration = _configuration;
        this.http = http;
        this.resolveSuffix = '?resolve=true';
        this.actionUrl = _configuration.ServerWithApiUrl;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    /**
     *
     * @param {string} ns
     * @return {Observable<Type[]>}
     */
    DataService.prototype.getAll = function (ns) {
        console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns);
        return this.httpClient.get("" + this.actionUrl + ns, { withCredentials: true })
            .catch(this.handleError);
    };
    /**
     *
     * @param {string} ns
     * @param {string} id
     * @return {Observable<Type>}
     */
    DataService.prototype.getSingle = function (ns, id) {
        console.log('GetSingle ' + ns);
        return this.httpClient.get(this.actionUrl + ns + '/' + id + this.resolveSuffix, { withCredentials: true })
            .catch(this.handleError);
    };
    /**
     *
     * @param {string} ns
     * @param {Type} asset
     * @return {Observable<Type>}
     */
    DataService.prototype.add = function (ns, asset) {
        console.log('Entered DataService add');
        console.log('Add ' + ns);
        console.log('asset', asset);
        return this.httpClient.post(this.actionUrl + ns, asset, { withCredentials: true })
            .catch(this.handleError);
    };
    /**
     *
     * @param {string} ns
     * @param {string} id
     * @param {Type} itemToUpdate
     * @return {Observable<Type>}
     */
    DataService.prototype.update = function (ns, id, itemToUpdate) {
        console.log('Update ' + ns);
        console.log('what is the id?', id);
        console.log('what is the updated item?', itemToUpdate);
        console.log('what is the updated item?', JSON.stringify(itemToUpdate));
        return this.httpClient.put("" + this.actionUrl + ns + "/" + id, itemToUpdate, { withCredentials: true })
            .catch(this.handleError);
    };
    /**
     *
     * @param {string} ns
     * @param {string} id
     * @return {Observable<Type>}
     */
    DataService.prototype.delete = function (ns, id) {
        console.log('Delete ' + ns);
        return this.httpClient.delete(this.actionUrl + ns + '/' + id, { withCredentials: true })
            .catch(this.handleError);
    };
    /**
     *
     * @return {Promise<Object>}
     */
    DataService.prototype.getOpenShoppingList = function () {
        return this.httpClient.get('http://localhost:3000/api/queries/selectOpenShoppingList', { withCredentials: true }).toPromise();
    };
    /**
     *
     * @param error
     * @return {Observable<string>}
     */
    DataService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    /**
     * get user card
     *
     * @param {string} ns
     * @param {Type} participant
     * @return {Observable<any>}
     */
    DataService.prototype.issue = function (ns, participant) {
        return this.httpClient.post(this.actionUrl + ns, participant)
            .catch(this.handleError);
    };
    /**
     * import card to rest server
     *
     * @param file
     * @return {Promise<Object>}
     */
    DataService.prototype.importCard = function (file) {
        var formData = new FormData();
        formData.append('card', file);
        var headers = new http_2.HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        return this.httpClient.post('http://localhost:3000/api/wallet/import', formData, {
            withCredentials: true,
            headers: headers
        }).toPromise();
    };
    /**
     *
     * @return {Promise<Object>}
     */
    DataService.prototype.getCurrentUser = function () {
        var _this = this;
        return this.httpClient.get('http://localhost:3000/api/system/ping', { withCredentials: true }).toPromise()
            .then(function (data) {
            return data['participant'];
        })
            .then(function (participant) {
            var email = participant.substr(participant.lastIndexOf('#') + 1);
            return _this.httpClient.get('http://localhost:3000/api/User/' + email, { withCredentials: true }).toPromise();
        });
    };
    /**
     *
     * @return {Promise<Object>}
     */
    DataService.prototype.checkUserWallet = function () {
        return this.httpClient.get('http://localhost:3000/api/wallet', { withCredentials: true }).toPromise();
    };
    /**
     *
     * @param user
     * @return {Promise<void>}
     */
    DataService.prototype.issueUser = function (user) {
        var _this = this;
        var identity = {
            participant: 'org.eyes.znueni.User#' + user.email,
            userID: user.email,
            options: {}
        };
        return this.httpClient.post('http://localhost:3001/api/system/identities/issue', identity, { responseType: 'blob' }).toPromise()
            .then(function (cardData) {
            var file = new File([cardData], user.email + '@composer-network.card', { type: 'application/octet-stream', lastModified: Date.now() });
            var formData = new FormData();
            formData.append('card', file);
            _this.sendUserCard(user, formData);
        });
    };
    /**
     *
     * @param user
     * @param card
     */
    DataService.prototype.sendUserCard = function (user, card) {
        var headers = new http_1.Headers();
        var body = 'user=' + user;
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        this.http.post('http://localhost:3333/send-email', body, { headers: headers }).subscribe(function (data) {
            if (data.json().success) {
                console.log('Sent successfully');
            }
        });
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable()
], DataService);
exports.DataService = DataService;
