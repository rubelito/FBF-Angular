import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { LoginResultModel } from '../model/user';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../account/logindialog.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'nav-section',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent {
    account: LoginResultModel;

    constructor(private userService: UserService,
        private router: Router,
        private dialog: MatDialog) {
        this.account = new LoginResultModel();
        this.detectChangesInRoute();
    }

    private detectChangesInRoute() {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.isLogIn();
        });
    }

    logIn() {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
            width: "270px",
            height: "370px"
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
                if (result == true) {
                    this.router.navigate(['/dr']);
                }
            }
        });
    }

    logOut() {
        this.userService.logoutUser().subscribe(() => {
            this.isLogIn();
            this.router.navigate(['/account/loginuser']);
        });
    }

    isLogIn() {
        this.userService.getCurrentUser().subscribe(val => {
            this.account = val;
        });
    }
}