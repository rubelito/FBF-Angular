import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/Item';
import { ItemService } from 'src/app/service/item.service';
import { ItemDialogComponent } from './itemdialog.component'
import { MatDialog, MatSnackBar } from '@angular/material';
import { CategoryService } from 'src/app/service/category.service';

@Component({
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css',
     '../../shared/control-distance.css']
})
export class ItemComponent implements OnInit {
    displayedColumns: string[] = ["id", "itemdesc", "measuredby", "stocks", "edit"];
    records: Item[] = [];
    filter: string = "";
    currentPage:number = 0;
    pageSize:number = 10;
    totalRecords: number = 0;
    measuredBys: any;
    categories: any;

    constructor(private itemService: ItemService, 
        private categoryService: CategoryService, 
        private dialog: MatDialog,
        private snackBar: MatSnackBar){
    }

    ngOnInit(){
        this.loadItems();
        this.measuredBys = this.itemService.getMeasuredBy();
        this.categoryService.getCategories().subscribe(res => {
            this.categories = res;
        });
    }

    onFilter(){
        this.loadItems();
    }

    pageEvent(e: any){
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.loadItems();
    }

    loadItems(){
        this.itemService.searchItems(this.filter, this.currentPage, 
            this.pageSize, "", "", "", true).subscribe((res) => 
        {
            this.records = res.Items;
            this.totalRecords = res.TotalItems;
        });
    }

    onClickAdd(){
        const dialogRef = this.dialog.open(ItemDialogComponent, {
            width: "800px",
            height: "500px",
            data: {operation: "add", measuredBys: this.measuredBys, categories: this.categories}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined){
                this.itemService.addItem(result).subscribe((res) => {
                    var message : string;
                    if (res.Success == true){
                        message = "Item added";
                    }
                    else{
                        message = res.Message;
                    }

                    this.snackBar.open(message, "Close", {
                        duration: 5000
                    });
                    this.loadItems();
                });
            }
        });
    }

    openEditDialog(eToEdit: Item){
        const dialogRef = this.dialog.open(ItemDialogComponent , {
            width: "800px",
            height: "500px",
            data: {operation: "edit", measuredBys: this.measuredBys, categories: this.categories, item: eToEdit}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined){
                this.itemService.editItem(result).subscribe((res) =>{
                    var message : string;
                    if (res.Success == true){
                        message = "Item edited";
                    }
                    else{
                        message = res.Message;
                    }

                    this.snackBar.open(message, "Close", {
                        duration: 5000
                    });
                    this.loadItems();
                })
            }
        });
    }
}