import { Component, OnInit, ViewChild} from '@angular/core';
import { Item } from '../model/Item';
import { ItemService } from '../service/item.service';
import { UserService } from '../service/user.service';
import { LoginResultModel } from '../model/user';
import { MatDialog, MatSnackBar } from '@angular/material';
import { InOutDialogComponent } from './inoutdialog.component';
import { ItemHistoryDialogComponent } from './itemhistorydialog.component';

@Component({
    templateUrl: './item.component.html',
    styleUrls: ['../shared/link-style.css']
})
export class ItemComponent implements OnInit{
    account: LoginResultModel;
    displayedColumns: string[] = ["id", "itemdesc", "measuredby", "stock", "threshold", "inout"];
    records: Item[] = [];
    filter: string = "";
    currentPage: number = 0;
    pageSize: number = 10;
    totalRecords: number = 0;

    criterias: string[] = ["None", "Nearly out of Stock"]
    selectedCriteria: string = "None";

    status: string[] = ["Active", "Inactive", "All"];
    selectedStatus: string = 'Active';

    orders: string[] = ["Descending", "Ascending"];
    orderBy: string = "Descending";

    constructor(private itemService: ItemService,
         private userService: UserService,
         private dialog: MatDialog,
         private snackBar: MatSnackBar){
        this.userService.getCurrentUser().subscribe(res => {
            this.account = res;
        });
    }

    ngOnInit(){
        this.loadItems(false);
    }

    search(){
        this.loadItems(true);
    }

    pageEvent(e: any){
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.loadItems(false);
    }

    loadItems(shouldGoToFirstPage: boolean){
        if (shouldGoToFirstPage == true){
            this.currentPage = 0;
        }
        this.itemService.searchItems(this.filter, this.currentPage, 
            this.pageSize, this.selectedCriteria, this.selectedStatus, this.orderBy, false).subscribe((res) => {
            this.records = res.Items;
            this.totalRecords = res.TotalItems;
        })
    }

    onClickIn(item: Item){
        this.inOutItem("In", item);
    }

    onClickOut(item: Item){
        this.inOutItem("Out", item);
    }

    inOutItem(operation: string, item: Item){
        const dialogRef = this.dialog.open(InOutDialogComponent, {
            width: "400px",
            height: "500px",
            data: {operation: operation, item: item}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined){
                this.snackBar.open(result.Message, "close", {
                    duration: 5000
                });
                this.loadItems(false);
            }
        });
    }

    viewHistory(item: Item){
        const dialogRef = this.dialog.open(ItemHistoryDialogComponent, {
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            data: {item: item}
        });

        dialogRef.afterClosed().subscribe(() => {
            
        })
    }
}