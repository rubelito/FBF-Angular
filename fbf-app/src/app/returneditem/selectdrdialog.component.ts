import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DRService } from '../service/dr.service';
import { DRListModel } from '../model/drlistmodel';
import { ReturnItemService } from '../service/returnitem.service';

@Component({
    templateUrl: './selectdrdialog.component.html',
    styleUrls: ['../shared/form-field-margin.css',
        '../shared/link-style.css']
})
export class SelectDRDialogComponent {
    displayedColumns = ["select", "id", "drnumber", "date"];
    drNumber: string = "";
    records: DRListModel[] = [];
    constructor(public dialogRef: MatDialogRef<SelectDRDialogComponent>,
        @Inject(DRService) private drService: DRService,
        @Inject(ReturnItemService) private returnService: ReturnItemService) {

    }

    searchDR() {
        this.drService.searchDR(this.drNumber, 0, 10, 2, 1).subscribe(res => {
            this.records = res.DRs;
        });
    }

    onSelect(dr: DRListModel){
        this.returnService.isDRAlreadyHaveReturn(dr.Id).subscribe(res => {
            if (res == true){
                alert("DR: " + dr.DROrSDR + " already have existing Returned History. Please use existing");
            }
            else{
                this.drService.getDRById(dr.Id).subscribe(drResult =>{
                    this.dialogRef.close(drResult);
                })
            }
        })
    }

    onClose(){
        this.dialogRef.close();
    }
}