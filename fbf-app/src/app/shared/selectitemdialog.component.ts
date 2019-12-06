import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemBasicModel } from '../model/itembasicmodel';

@Component({
    templateUrl: './selectitemdialog.component.html',
    styleUrls: ['../shared/link-style.css']
})
export class SelectItemDialog implements OnInit {
    displayedColumns: string[] = ["select", "name", "measuredby", "qty"];
    filter: string = "";
    records: any[] = [];
    filteredRecords: Array<any[]>;

    constructor(public dialogRef: MatDialogRef<SelectItemDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.records = data.items;
    }

    ngOnInit() {
        this.filterRecords();
    }

    onFilterChange() {
        this.filterRecords();
    }

    filterRecords() {
        this.filteredRecords = this.records
            .filter(r => r.ItemName.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()));
    }

    onSelect(selectedItem: any) {
        this.dialogRef.close(selectedItem);
    }

    onClose() {
        this.dialogRef.close();
    }
}
