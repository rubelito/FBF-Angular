export class User {
    Id: number;
    UserName: string;
    IsActive: boolean;

    RoleId: number;
    Role: string;
}

export class AddUserModel extends User {
    Password: string;
}

export class ChangePasswordModel {
    OldPassword: string;
    NewPassword: string;
}

export class EditUserModel {
    Id: number;
    RoleId: number;
    IsActive: boolean;
}

export class Role {
    Id: number;
    Name: string;
}

export class LoginModel {
    UserName: string;
    Password: string;
    RememberMe: boolean;
    ReturnUrl: string;
}

export class LoginResultModel {
    Success: boolean;
    Message: string;
    
    UserName: string;
    Role: string;
    ReturnUrl: string;
}

export class AccountDetail {
    UserName: string;
    Name: string;
}