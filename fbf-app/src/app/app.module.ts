import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import { LoginDialogComponent } from './account/logindialog.component';
import { UserService } from './service/user.service';

import { AuthGuard } from './shared/AuthGuard';
import { SelectSupplierCustomerDialogComponent } from './shared/selectsuppliercustomerdialog.component';
import { SelectItemDialog } from './shared/selectitemdialog.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginDialogComponent,
    SelectSupplierCustomerDialogComponent,
    SelectItemDialog
  ],
  entryComponents: [LoginDialogComponent,
    SelectSupplierCustomerDialogComponent,
    SelectItemDialog],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    AppRoutingModule
  ],

  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
