import { Component, OnInit } from '@angular/core';
import { ReturnedHistoryListModel } from '../model/returnhistorylistmodel';
import { ReturnedItemDialogComponent } from './returneditemdialog.component';
import { ReturnItemService } from '../service/returnitem.service';
import { MatDialog } from '@angular/material';

@Component({
    templateUrl: './returneditem.component.html',
    styleUrls: ['../shared/control-distance.css',
        '../shared/form-field-margin.css']
})
export class ReturnedItemComponent implements OnInit {
    displayedColumns: string[] = ["id", "drnumber", "customer", "project",
        "projectengineer", "date", "createdby", "edit"];
    orders: any = [{ id: 0, name: "Ascending" }, { id: 1, name: "Descending" }];
    orderBy = this.orders[1].id;

    records: ReturnedHistoryListModel[] = [];
    currentPage: number = 0;
    pageSize: number = 10;
    totalRecords: number = 0;

    drNumberFilter: string = "";

    constructor(private returnService: ReturnItemService,
         private dialog: MatDialog) {

    }

    ngOnInit() {
        this.search();
    }

    pageEvent(e: any){
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.search();
    }

    search(){
        this.returnService.search(this.drNumberFilter, this.currentPage, this.pageSize, this.orderBy).subscribe(res => {
            this.records = res.Records;
            this.totalRecords = res.TotalItems;
        });
    }

    addReturnDialog(){
        const dialogRef = this.dialog.open(ReturnedItemDialogComponent, {
            width: "95%",
            height: "95%",
            data: {operation: "Create"}
        })

        dialogRef.afterClosed().subscribe(res => {
            
        });
    }

    editReturnDialog(returnedDr: ReturnedHistoryListModel){
        const dialogRef = this.dialog.open(ReturnedItemDialogComponent, {
            width: "95%",
            height: "95%",
            data: {operation: "Edit", id: returnedDr.Id}
        })

        dialogRef.afterClosed().subscribe(res => {
            
        });
    }
}