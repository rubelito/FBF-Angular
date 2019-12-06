import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './twoinputdialog.component.html'
})
export class TwoInputDialogComponent {
    public dataEntity: any;
    nameLabel: string;

    constructor(public dialogRef: MatDialogRef<TwoInputDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.nameLabel = data.entity + " Name";
        if (data.operation == "Edit") {
            this.dataEntity = data.supplierToEdit;
        }
        else {
            this.dataEntity = {Id: 0, Name: "", Address: ""};
        }
    }

    onSave(value){
        this.dataEntity.Name = value["dataEntity.Name"];
        this.dataEntity.Address =  value["dataEntity.Address"];
        this.dialogRef.close(this.dataEntity);
    }

    onCancel() {
        this.dialogRef.close();
    }
}
