import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './item.component';
import { ItemRoutingModule } from './item-routing.module';
import { ItemService } from '../service/item.service';
import { ItemHistoryService } from '../service/itemhistory.service';

import { InOutDialogComponent } from '../item/inoutdialog.component';
import { ItemHistoryDialogComponent } from '../item/itemhistorydialog.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ItemComponent,
    InOutDialogComponent,
    ItemHistoryDialogComponent
  ],
  entryComponents: [InOutDialogComponent, ItemHistoryDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    ItemRoutingModule,
    SharedModule
  ],
  providers: [ItemService, ItemHistoryService]
})
export class ItemModule { }