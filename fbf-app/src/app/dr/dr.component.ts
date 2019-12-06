import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { LoginResultModel } from '../model/user';
import { MatDialog } from '@angular/material';
import { SDRDialogComponent } from '../dr/sdrdialog.component';
import { DRService } from '../service/dr.service';
import { DRListModel } from '../model/drlistmodel';

@Component({
    templateUrl: './dr.component.html',
    styleUrls: ['../shared/control-distance.css']
})
export class DRComponent implements OnInit {
    account: LoginResultModel = new LoginResultModel();
    records: any;
    displayedColumns: string[] = ["id", "sdr", "suppliercustomer", "type", "date", "returnhistory", "createdby", "edit"];

    drNumberSearch: string = "";
    currentPage: number = 0;
    pageSize: number = 10;
    totalRecords: number = 0;

    receiptTypes: any = [{id: 0, name: "Nothing"}, {id: 1, name: "SDR"}, {id: 2, name:"DR"}];
    selectedReceipt = this.receiptTypes[0].id;

    orders:any = [ {"name": "Descending", "id": 1}, {"name": "Ascending", "id": 0}];
    orderBy = this.orders[0].id;


    constructor(private userService: UserService,
        private drService: DRService,
        private dialog: MatDialog) {
        this.userService.getCurrentUser().subscribe(res => {
            this.account = res;
        });
    }

    ngOnInit() {
        this.loadDrs();
    }

    drSearch(){
        this.currentPage = 0;
        this.loadDrs();
    }

    pageEvent(e: any){
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.loadDrs();
    }

    loadDrs(){
        this.drService.searchDR(this.drNumberSearch, this.currentPage, 
            this.pageSize, this.selectedReceipt, this.orderBy).subscribe(res => {
            this.records = res.DRs;
            this.totalRecords = res.TotalDr;
        });
    }

    onSave(formValues) {
        alert(formValues.strSearch);
    }

    onClickSDR() {
        const dialogRef = this.dialog.open(SDRDialogComponent, {
            width: "90%",
            height: "95%",
            data: { receiptType: "SDR", operation: "Create"}
        });

        dialogRef.afterClosed().subscribe(() => {

        });
    }

    onClickDR(){
        const dialogRef = this.dialog.open(SDRDialogComponent, {
            width: "90%",
            height: "95%",
            data: { receiptType: "DR", operation: "Create"}
        });

        dialogRef.afterClosed().subscribe(() => {

        });
    }

    onEdit(dr: DRListModel) {
        const dialogRef = this.dialog.open(SDRDialogComponent, {
            width: "90%",
            height: "95%",
            data: { receiptType: dr.Type, operation: "Edit", Id: dr.Id}
        });

        dialogRef.afterClosed().subscribe(() => {

        });
    }
}