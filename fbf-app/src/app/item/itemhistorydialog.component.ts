import { Component, OnInit, Inject } from '@angular/core';
import { ItemHistoryService } from '../service/itemhistory.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HistorySearchParam } from '../model/historysearchparam';
import { Item } from '../model/Item';
import { SearchParam } from '../model/searchparam';

@Component({
    templateUrl: './itemhistorydialog.component.html',
    styleUrls: ['./itemhistorydialog.component.css']
})
export class ItemHistoryDialogComponent implements OnInit {
    displayedColumns: string[] = ["id", "receipttype", "inorout", "drorsdr",
        "beginningqty", "qty", "endingqty", "date", "note", "inoutby"];
    records: any;
    currentPage: number = 0;
    pageSize: number = 10;
    totalRecords: number;

    item: Item;

    constructor(public dialogRef: MatDialogRef<ItemHistoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(ItemHistoryService) public historyService: ItemHistoryService) {

        this.item = data.item;
    }

    ngOnInit() {
        this.loadHistories();
    }

    pageEvent(e: any) {
       this.currentPage = e.pageIndex;
       this.pageSize = e.pageSize;
        this.loadHistories();
    }

    loadHistories() {
        var param = new HistorySearchParam();
        param.CurrentPage = this.currentPage;
        param.PageSize = this.pageSize;
        param.ItemId = this.item.Id;

        this.historyService.searchHistory(param).subscribe(res => {
            this.records = res.Histories;
            this.totalRecords = res.TotalHistories;
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}