import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SelectSupplierCustomerDialogComponent } from '../../shared/selectsuppliercustomerdialog.component'
import { Item } from 'src/app/model/Item';

@Component({
    templateUrl: './itemdialog.component.html',
    styleUrls: ['./itemdialog.component.css', 
                '../../shared/form-field-margin.css']
})
export class ItemDialogComponent implements OnInit {
    item: Item;
    selectedMeasuredbyId: number;
    selectedCategoryId: number;
    supplierId: number;
    supplier: string;

    measuredbys: any;
    categories: any;

    constructor(public dialogRef: MatDialogRef<ItemDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) public data:any, private dialog: MatDialog)
    {
        this.measuredbys = data.measuredBys
        this.categories = data.categories;
    }

    ngOnInit(){
        if (this.data.operation == "add"){
            this.item = new Item();
            this.selectedMeasuredbyId = 0;
            this.selectedCategoryId = 1;
        }
        else if (this.data.operation == "edit"){
            this.item = this.data.item;
            this.supplierId = this.item.SupplierId;
            this.supplier = this.item.Supplier;
            this.selectedCategoryId = this.item.CategoryId;
            this.selectedMeasuredbyId = this.item.MeasuredById;
        }
    }

    showSupplierDialog(){
        const dialogRef = this.dialog.open(SelectSupplierCustomerDialogComponent , {
            width: "700px",
            height: "500px",
            data: {entity: "supplier"}
        });

        dialogRef.afterClosed().subscribe(res => {
            if (res != undefined){
                this.supplierId = res.Id;
                this.supplier = res.Name;
            }
        });
    }

    onSave(formValue){
        this.item.SupplierId = formValue.supplierId;
        this.item.CategoryId = formValue.selectedCategoryId;
        this.item.MeasuredById = formValue.selectedMeasuredbyId;

        this.dialogRef.close(this.item);
    }

    onClickCancel(){
        this.dialogRef.close();
    }
}
