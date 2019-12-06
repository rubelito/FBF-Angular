import { Component} from '@angular/core';
import { LoginResultModel } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent{
    account: LoginResultModel = new LoginResultModel();

    constructor(private userService: UserService){
        this.userService.getCurrentUser().subscribe(res => {
            this.account = res;
        });
    }
}