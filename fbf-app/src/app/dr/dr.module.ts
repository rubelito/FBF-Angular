import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { DRComponent } from './dr.component';
import { SupplierService } from '../service/supplier.service';
import { CustomerService } from '../service/customer.service';
import { DRService } from '../service/dr.service';
import { ItemService } from '../service/item.service';

import { SDRDialogComponent } from './sdrdialog.component';

import { DRRoutingModule } from './dr-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DRComponent,
    SDRDialogComponent
  ],
  entryComponents: [SDRDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatDividerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    DRRoutingModule,
    SharedModule
  ],
  providers: [SupplierService, CustomerService, DRService, ItemService]
})
export class DRModule { }