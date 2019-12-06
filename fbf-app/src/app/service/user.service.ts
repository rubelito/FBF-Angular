import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Role, AddUserModel, EditUserModel, ChangePasswordModel, LoginModel, LoginResultModel } from '../model/user';
import { PostResponse } from '../model/postresponse';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {

    }

    getAllUser(): Observable<User[]> {
        return this.http.get<User[]>("/maintenance/getalluser/").pipe(
            map(value => {
                return value;
            }));
    }

    getAllRoles(): Observable<Role[]> {
        return this.http.get<Role[]>("/maintenance/getallroles/").pipe(
            map(value => {
                return value;
            })
        )
    }

    addUser(utoAdd: AddUserModel): Observable<PostResponse> {
        return this.http.post<PostResponse>("/maintenance/adduser/", utoAdd).pipe(
            map(value => {
                return value;
            })
        )
    }

    editUser(uToEdit: EditUserModel): Observable<PostResponse> {
        return this.http.post<PostResponse>("/maintenance/edituser/", uToEdit).pipe(
            map(value => {
                return value;
            })
        )
    }

    changePassword(password: ChangePasswordModel): Observable<PostResponse> {
        return this.http.post<PostResponse>("/account/changepassword/", password).pipe(
            map(value => {
                return value;
            })
        )
    }

    loginUser(login: LoginModel): Observable<LoginResultModel> {
        // var r = new LoginResultModel();
        // if (login.UserName == "rubelitoi" && login.Password == "rubs") {
        //     r.UserName = "rubelitoi";
        //     r.Success = true;
        //     r.Message = "login success";
        //     localStorage.setItem('currentUser', JSON.stringify(r));

        // }
        // else {
        //     r.Success = false;
        //     r.Message = "login failed";
        // }
        return this.http.post<LoginResultModel>("/account/login/", login).pipe(
            map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            })
        )
    }

    logoutUser() {
        return this.http.get("/account/logout/").pipe(
            map(value => {
                localStorage.removeItem('currentUser');
                return value;
            })
        )
        // localStorage.removeItem('currentUser');
        // return of(true);
    }

    getCurrentUser(): Observable<LoginResultModel> {
        return this.http.get<LoginResultModel>("/account/islogin").pipe(
            map(value =>{
                return value;
            })
        )
        // var res = new LoginResultModel();
        // if (localStorage.getItem("currentUser")) {
        //     res = JSON.parse(localStorage.getItem("currentUser")) as LoginResultModel;
        // }
        // else {
        //     res.Success = false;
        // }
        //return of(res);
    }
}