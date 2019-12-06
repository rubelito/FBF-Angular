import { Component, OnInit } from '@angular/core';
import { User, Role } from '../../model/user';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { UserDialogComponent } from './userdialog.component';

@Component({
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    displayedColumns: string[] = ["id", "username", "role", "isactive", "edit"];
    records: User[] = [];
    roles: Role[];

    constructor(private userService: UserService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar) {

    }

    ngOnInit() {
        this.loadUser();
        this.loadRoles();
    }

    loadUser(){
        this.userService.getAllUser().subscribe((res) => {
            this.records = res;
        });
    }

    loadRoles() {
        this.userService.getAllRoles().subscribe((res) => {
            this.roles = res;
        });
    }

    openAddDialog() {
        const dialogRef = this.dialog.open(UserDialogComponent, {
            width: "270px",
            height: "420px",
            data: { operation: "add", roles: this.roles }
        });

        dialogRef.afterClosed().subscribe((res) => {
            if (res != undefined){
                this.userService.addUser(res).subscribe((res) => {
                    var message: string;
                    if (res.Success == true){
                        message = "User added";
                    }
                    else {
                        message = res.Message;
                    }
                    this.snackBar.open(message, "Close", {
                        duration: 5000
                    });
                    this.loadUser();
                });
            }
        });
    }

    openEditDialog(uToEdit: User) {
        const dialogRef = this.dialog.open(UserDialogComponent, {
            width: "270x",
            height: "420px",
            data: { operation: "edit", user: uToEdit, roles: this.roles }
        });

        dialogRef.afterClosed().subscribe((res) => {
            if (res != undefined){
                this.userService.editUser(res).subscribe((res) => {
                    var message: string;
                    if (res.Success == true){
                        message = "User edited";
                    }
                    else {
                        message = res.Message;
                    }
                    this.snackBar.open(message, "Close", {
                        duration: 5000
                    });
                    this.loadUser();
                });
            }
        });
    }
}