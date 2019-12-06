import { Component, OnInit, Inject } from '@angular/core';
import { ItemService } from '../service/item.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Item, InOutParam } from '../model/Item';

@Component({
    templateUrl: './inoutdialog.component.html',
    styleUrls: [ './inoutdialog.component.css',
        '../shared/form-field-margin.css', 
            '../shared/dialog.css']
})
export class InOutDialogComponent implements OnInit {
    operation: string;
    itemId: number;
    itemName: string;
    stocks: number;
    quantity: number;
    notes: string;
    measuredBy: string = ".pcs";

    constructor(public dialogRef: MatDialogRef<InOutDialogComponent>,
        @Inject(MatSnackBar) public snackBar: MatSnackBar,
         @Inject(MAT_DIALOG_DATA) public data: any,
         @Inject(ItemService) public itenService: ItemService){
        this.operation = data.operation;
        this.itemId = data.item.Id;
        this.itemName = data.item.Name;
        this.stocks = data.item.Qty;
        this.measuredBy = data.item.MeasuredBy;
    }

    ngOnInit(){

    }

    onInOut(){
        var param = new InOutParam();
        param.Item = new Item();
        param.Item.Id = this.itemId;
        param.Qty = this.quantity;
        param.Note = this.notes;

        if (this.operation == "In"){
            param.InOrOut = 0; //Zero means In
        }
        else if (this.operation == "Out"){
            param.InOrOut = 1; //Zero means Out
        }
         this.itenService.inOut(param).subscribe(res => {
            if (res != undefined){
                if (res.Success){
                    this.dialogRef.close(res);
                }
                else{
                    this.snackBar.open(res.Message, "close", {
                        duration: 5000
                    });
                }
            }
            else{
                this.snackBar.open("Oh sometime went wrong!", "close", {
                    duration: 5000
                });
            }
        });
    }

    onCancel(){
        this.dialogRef.close();
    }
}