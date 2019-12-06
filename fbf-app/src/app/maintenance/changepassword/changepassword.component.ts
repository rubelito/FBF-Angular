import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ChangePasswordModel, LoginModel } from 'src/app/model/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.css',
        '../../shared/form-field-margin.css']
})
export class ChangePasswordComponent implements OnInit {
    password: ChangePasswordModel = new ChangePasswordModel();

    constructor(private userService: UserService, 
        private router: Router, 
        private snackBar: MatSnackBar) {
    }

    ngOnInit() {

    }

    loginUser() {

    }

    onSave() {
        this.userService.changePassword(this.password).subscribe(res => {
            var message: string;
            if (res.Success == true){
                message = "Password successfully changed."
            }
            else{
                message = res.Message;
            }

            this.snackBar.open(message, "Close", {
                duration: 5000
            });
        })

    }

    onCancel() {
        this.router.navigate(['/maintenance']);
    }
}