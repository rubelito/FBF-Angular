import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        //similar to islogin
        return this.userService.getCurrentUser().pipe(map(us => {
            if (us.Success)
            {
                return true;
            }
            else{
                this.router.navigate(['account/loginuser']);
                return false;
            }
        }))

        // var user = localStorage.getItem('currentUser');
        // if (localStorage.getItem('currentUser')) {
        //     // logged in so return true
        //     return true;
        // }
        

        // not logged in so redirect to login page with the return url
        //this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        // this.router.navigate(['account/loginuser']);
        // return false;
    }
}