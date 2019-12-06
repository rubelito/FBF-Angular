import { Component } from "@angular/core";
import { UserService } from '../service/user.service';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    constructor(private userService: UserService){

    }
}