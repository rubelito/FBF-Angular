import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { OneInputDialogComponent } from '../shared/oneinputdialog.component';
import { CategoryService } from 'src/app/service/category.service';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    displayedColumns: string[] = ["name", "edit"];
    records: Category[];

    constructor(private categoryService: CategoryService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar){
    }

    ngOnInit(){
        this.loadCategory();
    }

    private loadCategory(){
        this.categoryService.getCategories().subscribe((val) => {
            this.records = val;
        });
    }

    openAddDialog(){
        const dialogRef = this.dialog.open(OneInputDialogComponent, {
            width: '300px',
            data: {operation : "Add", title: "Add new category"}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined){
                this.categoryService.addCategory(result).subscribe((res) => {
                    var message: string;
                    if (res.Success == true) {
                        message = "Record added";
                    }
                    else {
                        message = res.Message;
                    }
                    this.snackBar.open(message, "Close", {
                        duration: 5000
                    });
                    this.loadCategory();
                });
            }
        });
    }

    openEditDialog(cat: Category){
        var cToEdit = new Category();
        cToEdit.Id = cat.Id;
        cToEdit.Name = cat.Name;

        const dialogRef = this.dialog.open(OneInputDialogComponent, {
            width: "300px",
            data: {operation: "Edit", title: "Edit category", entityToEdit: cToEdit}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined){
                this.categoryService.editCategory(result).subscribe((res) =>{
                    var message: string;
                    if (res.Success == true) {
                        message = "Record edited";
                    }
                    else {
                        message = res.Message;
                    }
                    this.snackBar.open(message, "Close", {
                        duration: 5000
                    });
                    this.loadCategory();
                })
            }
        })
    }
}