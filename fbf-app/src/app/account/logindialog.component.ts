import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../service/user.service';
import { LoginModel, LoginResultModel } from '../model/user';

@Component({
    templateUrl: './logindialog.component.html',
    styleUrls: ['./logindialog.component.css',
        '../shared/form-field-margin.css',
        '../shared/dialog.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginDialogComponent {
    username: string;
    password: string
    showError: boolean;
    message: string
    isLogin: boolean;

    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
         @Inject(UserService) private userService: UserService) {
    }

    login() {
        var loginModel = new LoginModel();
        loginModel.UserName = this.username;
        loginModel.Password = this.password;

        this.userService.loginUser(loginModel).subscribe(val => {
            if (val.Success) {
                this.isLogin = true;
                this.dialogRef.close(this.isLogin);
            }
            else {
                this.showError = true;
                this.message = "Wrong username and password";
            }
        });
    }

    cancel() {
        this.dialogRef.close();
    }
}