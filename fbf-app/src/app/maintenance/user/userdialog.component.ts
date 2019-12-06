import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User, Role, AddUserModel, EditUserModel } from '../../model/user';

@Component({
    templateUrl: './userdialog.component.html',
    styleUrls: ['../../shared/form-field-margin.css']
})
export class UserDialogComponent {
    title: string;
    user: User;
    roleId: number = 2;
    roles: Role[];
    isActive: boolean
    password: string;
    operation: string = "";

    constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.roles = data.roles;
        this.operation = data.operation;
        if (this.operation == "edit") {
            this.user = data.user;
            this.roleId = this.user.RoleId;
            this.isActive = this.user.IsActive;
            this.title = "edit user";
        }
        else {
            this.user = new User();
            this.isActive = true;
            this.title = "add new user."
        }
    }

    onSave(userForm) {
        if (this.operation == "add") {
            var addUserModel = new AddUserModel();
            addUserModel.UserName = this.user.UserName;
            addUserModel.Password = userForm.password;
            addUserModel.IsActive = this.isActive;
            addUserModel.RoleId = this.roleId
            this.dialogRef.close(addUserModel);
        }
        else {
            var editUserModel = new EditUserModel();
            editUserModel.Id = this.user.Id;
            editUserModel.RoleId = this.roleId
            editUserModel.IsActive = this.isActive;
            this.dialogRef.close(editUserModel);
        }
    }

    onCancel() {
        this.dialogRef.close();
    }
}