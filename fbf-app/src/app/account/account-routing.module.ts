import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../shared/AuthGuard';
import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component';

const accountRoutes: Routes = [
    { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'loginuser', component: LoginComponent }
]

@NgModule({
    imports: [RouterModule.forChild(accountRoutes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }