import { Component, OnInit, ViewChild } from '@angular/core';
import { Supplier } from '../../model/supplier';
import { TwoInputDialogComponent } from '../shared/twoinputdialog.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTable } from '@angular/material';
import { SupplierService } from '../../service/supplier.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { Observable, of } from 'rxjs';
import { PostResponse } from 'src/app/model/postresponse';

@Component({
    templateUrl: './customersupplier.component.html',
    styleUrls: ['./customersupplier.component.css', '../../shared/control-distance.css']
})
export class CustomerSupplierComponent implements OnInit {
    displayedColumns: string[] = ["id", "supplier", "address", "edit"];
    records: any;
    currentEntity: string = "";
    searchFilter: string = "";


    // @ViewChild(MatTable) table: MatTable<any>; For manual refreshing of table

    constructor(private router: Router, 
        private supplierService: SupplierService, 
        private customerService: CustomerService, 
        public dialog: MatDialog, 
        public snackBar: MatSnackBar) {

    }

    ngOnInit() {
        this.loadRecord();

    }

    private loadRecord() {
        if (this.router.url.includes("supplier")) {
            this.currentEntity = "Supplier"
            this.supplierService.getSupplierByName(this.searchFilter).subscribe(val => {
                this.records = val;
            });
        }
        else if (this.router.url.includes("customer")) {
            this.currentEntity = "Customer";
            this.customerService.getCustomerByName(this.searchFilter).subscribe(val => {
                this.records = val;
            });
        }

    }

    // refresh(){ for manual refreshing of table
    //    // this.table.renderRows();
    // }

    onFilterChanged() {
        this.loadRecord();
    }

    openAddDialog() {
        const dialogRef = this.dialog.open(TwoInputDialogComponent, {
            width: '300px',
            data: { operation: "Add", entity: this.currentEntity, title: "Add new " + this.currentEntity }
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
                this.addRecord(result).subscribe((res) => {
                    var message: string;
                    if (res.Success == true) {
                        message = "Record added";
                    }
                    else {
                        message = res.Message;
                    }
                    this.snackBar.open(message, "Close", {
                        duration: 5000
                    });
                    this.loadRecord();
                });
            }
        })
    }

    openEditDialog(supplier: Supplier) {
        var sToEdit = new Supplier();
        sToEdit.Id = supplier.Id;
        sToEdit.Name = supplier.Name;
        sToEdit.Address = supplier.Address;

        const dialogRef = this.dialog.open(TwoInputDialogComponent, {
            width: '300px',
            data: { operation: "Edit", entity: this.currentEntity, title: "Edit " + this.currentEntity, supplierToEdit: sToEdit }
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
                this.editRecord(result).subscribe(res => {
                    var message: string;
                    if (res.Success == true) {
                        message = "Record edited";
                    }
                    else {
                        message = res.Message;
                    }
                    this.snackBar.open(message, "Close", {
                        duration: 5000
                    });


                    this.loadRecord();
                });
            }
        })
    }

    private addRecord(record: any): Observable<PostResponse> {
        if (this.router.url.includes("supplier")) {
            return this.supplierService.addSupplier(record).pipe();
        }
        else if (this.router.url.includes("customer")){
            return this.customerService.addCustomer(record).pipe();
        }
    }

    private editRecord(record: any): Observable<PostResponse> {
        if (this.router.url.includes("supplier")) {
            return this.supplierService.editSupplier(record).pipe();
        }
        else if (this.router.url.includes("customer")){
            return this.customerService.editCustomer(record).pipe();
        }
    }
}