import { Component, ViewEncapsulation } from "@angular/core";
import { UserService } from '../service/user.service';
import { LoginModel } from '../model/user';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css',
        './logindialog.component.css',
        '../shared/form-field-margin.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
    username: string;
    password: string;
    message: string;
    showError: boolean;

    constructor(private userService: UserService, private router: Router) {

    }

    logIn() {
        var model = new LoginModel();
        model.UserName = this.username;
        model.Password = this.password

        this.userService.loginUser(model).subscribe(res => {
            if (res.Success == true) {
                this.router.navigate(['/dr']);
            }
            else {
                this.showError = true;
                this.message = "Username or password is incorrect.";
            }
        });
    }
}