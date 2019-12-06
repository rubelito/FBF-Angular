import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SupplierService } from 'src/app/service/supplier.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
    templateUrl: './selectsuppliercustomerdialog.component.html',
    styleUrls: ['../shared/link-style.css']
})
export class SelectSupplierCustomerDialogComponent implements OnInit {
    displayedColumns: string[] = ["id", "name", "address"];
    filter: string = "";
    records: any;

    constructor(public dialogRef: MatDialogRef<SelectSupplierCustomerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private supplierService: SupplierService,
        private customerService: CustomerService) {
    }

    ngOnInit(){
        this.loadRecords();
    }

    onFilterChange(){
        this.loadRecords();
    }

    loadRecords() {
        if (this.data.entity == "supplier") {
            this.supplierService.getSupplierByName(this.filter).subscribe(val => {
                this.records = val;
            });
        }
        else if (this.data.entity == "customer") {
            this.customerService.getCustomerByName(this.filter).subscribe(val => {
                this.records = val;
            });
        }
    }

    onSelect(entity: any) {
        this.dialogRef.close(entity);
    }

    onClose() {
        this.dialogRef.close();
    }
}
