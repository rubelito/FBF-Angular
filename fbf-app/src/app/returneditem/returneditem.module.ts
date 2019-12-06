import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ReturnedItemComponent } from './returneditem.component';
import { ReturnedItemRoutingModule } from './returneditem-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

import { ReturnedItemDialogComponent } from './returneditemdialog.component';
import { SelectDRDialogComponent } from './selectdrdialog.component';
import { ReturnItemService } from '../service/returnitem.service';
import { DRService } from '../service/dr.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ReturnedItemComponent,
    ReturnedItemDialogComponent,
    SelectDRDialogComponent
  ],
  entryComponents: [ReturnedItemDialogComponent,
     SelectDRDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReturnedItemRoutingModule,
    SharedModule
  ],
  providers: [ReturnItemService, DRService]
})
export class ReturnedItemModule { }