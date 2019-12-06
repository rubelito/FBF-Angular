import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AuthGuard } from '../shared/AuthGuard';

import { AccountRoutingModule} from './account-routing.module';
import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component'
import { UserService } from '../service/user.service';

@NgModule({
    declarations: [
      ProfileComponent,
      LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        AccountRoutingModule
    ],
    providers: [ UserService, AuthGuard]
  })
  export class AccountModule { }