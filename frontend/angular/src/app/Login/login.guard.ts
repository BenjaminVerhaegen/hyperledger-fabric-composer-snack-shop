import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router) {
    }

    /**
     *
     * @param {ActivatedRouteSnapshot} next
     * @param {RouterStateSnapshot} state
     * @return {boolean}
     */
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('data')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}