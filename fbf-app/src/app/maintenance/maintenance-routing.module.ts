import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { MaintenanceComponent } from './maintenance.component';
import { CustomerSupplierComponent } from './customersupplier/customersupplier.component';
import { CategoryComponent } from  './category/category.component';
import { ItemComponent } from './item/item.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { UserComponent } from './user/user.component';

const maintenanceRoutes: Routes = [
    {path: '', component: MaintenanceComponent},
    {path: 'supplier', component: CustomerSupplierComponent},
    {path: 'customer', component: CustomerSupplierComponent},
    {path: 'category', component: CategoryComponent},
    {path: 'item', component: ItemComponent},
    {path: 'changepassword', component: ChangePasswordComponent},
    {path: 'user', component: UserComponent}
]

@NgModule({
    imports: [RouterModule.forChild(maintenanceRoutes)],
    exports: [RouterModule]
})
export class MaintenanceRoutingModule {}