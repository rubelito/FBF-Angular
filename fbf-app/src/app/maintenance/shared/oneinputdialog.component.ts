import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './oneinputdialog.component.html'
})
export class OneInputDialogComponent {
    public dataEntity: any;

    constructor(public dialogRef: MatDialogRef<OneInputDialogComponent>,
         @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data.operation == "Edit") {
            this.dataEntity = data.entityToEdit;
        }
        else {
            this.dataEntity = {Id: 0, Name: ""};
        }
    }

    onSave(value){
        this.dataEntity.Name = value["dataEntity.Name"];
        this.dialogRef.close(this.dataEntity);
    }

    onCancel() {
        this.dialogRef.close();
    }
}
