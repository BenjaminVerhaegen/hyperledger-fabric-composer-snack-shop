import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from "../data.service";
import {environment} from "../../environments/environment";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    host: {class: 'layout_vhcenter'}
})
export class LoginComponent implements OnInit {

    public isUserAuthenticated = false;
    public isUserLoggedIn = false;
    public authenticationUrl;
    public loginInProgress = false;
    public isLoading = false;
    private errorMessage;


    @ViewChild('home') home: ElementRef;

    constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private dataService: DataService<any>) {
        this.authenticationUrl = this.sanitizer.bypassSecurityTrustUrl(environment.Server + '/auth/google');
    }

    ngOnInit() {
        if (localStorage.getItem('data')) {
            localStorage.removeItem('data');
        }

        this.route.queryParams.subscribe((queryParams) => {
            if (queryParams['authenticated']) {
                this.isUserAuthenticated = true;
                return this.router.navigate(['/login'])
                    .then(() => {
                        return this.checkUserWallet();
                    }).catch((error) => {
                        this.handleError(error);
                    });
            }
        })
    }

    /**
     *
     * @return {Promise<void>}
     */
    checkUserWallet() {
        return this.dataService.checkUserWallet()
            .then((results) => {
                if (results['length'] > 0) {
                    this.isLoading = true;
                    return this.getCurrentUser()
                        .then(() => {
                            this.isUserLoggedIn = true;
                            this.goToHome();
                            this.isLoading = false;
                        })
                        .catch((error) => {
                            this.handleError(error);
                        });
                }
            })
    }

    /**
     *
     * @param event
     */
    importCard(event) {
        this.loginInProgress = true;
        let fileList: FileList = event.target.elements[0].files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1);
            if (fileExtension === 'card') {
                this.dataService.importCard(file)
                    .then(() => {
                        this.isLoading = true;
                        return this.getCurrentUser()
                            .then(() => {
                                this.isUserLoggedIn = true;
                                this.goToHome();
                                this.isLoading = false;
                            })
                            .catch((error) => {
                                this.handleError(error);
                            });
                    })
                    .then(() => {
                        this.loginInProgress = false;
                    })
                    .catch((error) => {
                        this.handleError(error);
                    });
            } else {
                this.loginInProgress = false;
                this.errorMessage = 'Bitte laden Sie eine gültige Datei hoch. Format: (.card)';
            }

        } else {
            this.loginInProgress = false;
            this.errorMessage = 'Bitte laden Sie eine card hoch. Format: (.card)';
        }
    }

    /**
     *
     * @return {Promise<void>}
     */
    getCurrentUser() {
        return this.dataService.getCurrentUser()
            .then((user) => {
                let data = {
                    user: user.email
                };
                localStorage.setItem('data', JSON.stringify(data));
            });
    }
    
    showLoginInProgress() {
        this.loginInProgress = true;
    }

    /**
     *
     * @param error
     */
    handleError(error: any): any {
        this.errorMessage = 'Ein Fehler ist aufgetreten. Bitte Kontaktieren Sie den Adminstrator';
        console.log(error);
    }

    goToHome() {
        let event = new MouseEvent('click', {bubbles: true});
        this.home.nativeElement.dispatchEvent(event);
    }
}
