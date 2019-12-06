import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';

import { OneInputDialogComponent } from './shared/oneinputdialog.component';
import { TwoInputDialogComponent } from './shared/twoinputdialog.component'
import { ItemDialogComponent } from './item/itemdialog.component';
import { UserDialogComponent } from './user/userdialog.component';

import { SupplierService } from '../service/supplier.service';
import { CustomerService } from '../service/customer.service';
import { CategoryService } from '../service/category.service';
import { ItemService } from '../service/item.service';
import { UserService } from '../service/user.service';

import { CustomerSupplierComponent } from './customersupplier/customersupplier.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { UserComponent } from './user/user.component';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        MaintenanceComponent,
        CustomerSupplierComponent,
        OneInputDialogComponent,
        TwoInputDialogComponent,
        ItemDialogComponent,
        UserDialogComponent,
        CategoryComponent,
        ItemComponent,
        ChangePasswordComponent,
        UserComponent
    ],
    entryComponents: [OneInputDialogComponent,
        TwoInputDialogComponent,
        ItemDialogComponent,
        UserDialogComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        MatCardModule,
        MatInputModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSelectModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MaintenanceRoutingModule,
        SharedModule
    ],
    providers: [
        SupplierService,
        CustomerService,
        CategoryService,
        ItemService,
        UserService,
    ]
})
export class MaintenanceModule { }