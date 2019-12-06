import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ReturnItemService } from '../service/returnitem.service';
import { SelectDRDialogComponent } from './selectdrdialog.component';
import { CreateEditReturnHistoryModel, GoodItemModel, ScraptItemModel } from '../model/createeditreturnhistorymodel';
import { DRService } from '../service/dr.service';
import { SelectItemDialog } from '../shared/selectitemdialog.component';
import { ItemBasicModel } from '../model/itembasicmodel';
import { DRItemModel } from '../model/dritemmodel';

@Component({
    templateUrl: './returneditemdialog.component.html',
    styleUrls: ['./returneditemdialog.component.css',
        '../shared/form-field-margin.css']
})
export class ReturnedItemDialogComponent implements OnInit {
    displayedColumns = ["id", "name", "qty", "remove"];
    operation: string;
    state: string;
    disabledControls: boolean;
    showFunctionControls: boolean = true;

    id: number;
    drId: number;
    drNumber: string;
    projecteng: string;
    project: string;
    dateInput: Date;
    notes: string;
    address: string;

    goodItems: any[] = [];
    scrapItems: ScraptItemModel[] = [];

    disabledGoodScrapControls: boolean = false;

    goodItemName: string;
    goodItemId: number;
    goodCurrentStocks: number;
    goodMeasuredBy: string;
    goodQty: number = 0;

    scrapItemName: string;
    scrapItemId: number;
    scrapCurrentStocks: number;
    scrapMeasuredBy: string;
    scrapQty: number = 0;

    constructor(public dialogRef: MatDialogRef<ReturnedItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(ReturnItemService) private returnService: ReturnItemService,
        @Inject(DRService) private drService: DRService,
        private dialog: MatDialog) {
        this.operation = data.operation;
        this.enabledDisableControls();
        this.loadReturnHistoryIfEdit();
    }

    ngOnInit() {

    }

    enabledDisableControls() {
        if (this.operation == "Create") {
            this.disabledControls = false;
            this.disabledGoodScrapControls = true;
            this.state = "idle";
        }
        else if (this.operation == "Edit") {
            this.disabledControls = true;
            this.state = "idle";
        }
    }

    loadReturnHistoryIfEdit() {
        if (this.operation == "Edit") {
            this.returnService.getReturnHistoryById(this.data.id).subscribe(res => {
                this.id = this.data.id;
                this.drId = res.DRId;
                this.drNumber = res.DRNumber;
                this.projecteng = res.ProjectEngineer;
                this.project = res.Project;
                this.address = res.Address;
                this.notes = res.Note;
                this.dateInput = new Date(res.Date);

                this.goodItems = res.GoodItems;
                this.scrapItems = res.ScrapItems;
            });
        }
    }

    showDRDialog() {
        if (!this.disabledControls && this.operation == "Create") {
            const dialogRef = this.dialog.open(SelectDRDialogComponent, {
                width: "700px",
                height: "500px"
            })

            dialogRef.afterClosed().subscribe(res => {
                if (res != undefined) {
                    this.drId = res.Id;
                    this.drNumber = res.DRNumber;
                    this.project = res.Project;
                    this.address = res.Address;
                }
            });
        }
    }

    onClickCreateOrEdit() {
        if (this.operation == "Create") {
            this.create();
        }
        else if (this.operation == "Edit") {
            if (this.state == "idle") {
                this.state = "onEdit";
                this.disabledControls = false;
            }
        }
    }

    create() {
        var model = new CreateEditReturnHistoryModel();
        model.DRId = this.drId;
        model.Date = this.dateInput != undefined ? this.dateInput.toDateString() : "";
        model.Note = this.notes;
        model.ProjectEngineer = this.projecteng;

        this.returnService.create(model).subscribe(res => {
            if (res.Success) {
                this.id = res.ReturnedHistory.Id;
                this.showFunctionControls = false;
                this.disabledControls = true;
                this.disabledGoodScrapControls = false;
                alert(res.Message)
            }
            else {
                alert(res.Message);
            }
        });
    }

    onClickSave() {
        this.edit();
    }

    edit() {
        var model = new CreateEditReturnHistoryModel();
        model.Id = this.id;
        model.ProjectEngineer = this.projecteng;
        model.Date = this.dateInput != undefined ? this.dateInput.toDateString() : "";
        model.Note = this.notes;

        this.returnService.edit(model).subscribe(res => {
            if (res.Success) {
                this.state = "idle";
                this.disabledControls = true;
                alert(res.Message);
            }
            else {
                alert(res.Message);
            }
        })
    }

    onClickCancel() {
        this.state = "idle";
        this.disabledControls = true;
    }

    showItemSelection(type: string) {
        if (!this.disabledGoodScrapControls) {
            this.drService.getItemsWithinDR(this.drId).subscribe(res => {
                var itemsInDr = res;

                const dialogRef = this.dialog.open(SelectItemDialog, {
                    width: "750px",
                    height: "500px",
                    data: { items: itemsInDr }
                })

                dialogRef.afterClosed().subscribe(itemResult => {
                    if (itemResult != undefined) {
                        this.putSelectedItemToCorrespondingControls(itemResult, type);
                    }
                })
            })
        }
    }

    putSelectedItemToCorrespondingControls(item: DRItemModel, type: string) {
        if (type == "good") {
            this.goodItemId = item.ItemId;
            this.goodItemName = item.ItemName;
            this.goodCurrentStocks = item.Qty;
            this.goodQty = 0;
            this.goodMeasuredBy = item.MeasuredBy;
        }
        else if (type == "scrap") {
            this.scrapItemId = item.ItemId;
            this.scrapItemName = item.ItemName;
            this.scrapCurrentStocks = item.Qty;
            this.scrapQty = 0;
            this.scrapMeasuredBy = item.MeasuredBy;
        }
    }

    onClickReturn() {
        if (this.isItemAlreadyExistInList(this.goodItemId, this.goodItems)) {
            alert("Item already in the good list!");
            return;
        }
        else if (this.isInputIsGreaterThanCurrentQty(this.goodQty, this.goodCurrentStocks)) {
            alert("In should not be greated than DR stocks!");
            return;
        }

        var goodItemModel = this.makeGoodItem();

        this.returnService.returnGoodItem(goodItemModel).subscribe(res => {
            if (res.Success == true) {
                goodItemModel.Id = res.NewlyCreatedGoodItemId;
                goodItemModel.ItemName = this.goodItemName;
                this.goodItems.push(goodItemModel);
                this.goodItems = this.goodItems.slice();//To trigger the Angular change detection to update table
            }
        });

    }

    makeGoodItem(): GoodItemModel {
        var model = new GoodItemModel();
        model.ReturnedHistoryId = this.id;
        model.ItemId = this.goodItemId;
        model.Qty = this.goodQty;
        model.DrId = this.drId;

        return model;
    }

    onClickScrapItem() {
        if (this.isItemAlreadyExistInList(this.scrapItemId, this.scrapItems)) {
            alert("Item already in the scrap list!");
        }
        else if (this.isInputIsGreaterThanCurrentQty(this.scrapQty, this.scrapCurrentStocks)) {
            alert("In should not be greated than DR stocks!");
        }

        var scrapItemModel = this.makeScrapItem();

        this.returnService.scrapItem(scrapItemModel).subscribe(res => {
            if (res.Success == true) {
                scrapItemModel.Id = res.NewlyCreatedScrapItemId;
                scrapItemModel.ItemName = this.scrapItemName;
                this.scrapItems.push(scrapItemModel);
                this.scrapItems = this.scrapItems.slice();
            }
        })
    }

    makeScrapItem(): ScraptItemModel {
        var model = new ScraptItemModel();
        model.ReturnedHistoryId = this.id;
        model.ItemId = this.scrapItemId;
        model.Qty = this.scrapQty;
        model.DrId = this.drId;

        return model;
    }

    isInputIsGreaterThanCurrentQty(qty: number, currentStock: number) {
        return qty > currentStock;
    }

    isItemAlreadyExistInList(id: number, itemList: any[]): boolean {
        var exist = false;
        for (var i = 0, len = itemList.length; i < len; i++) {
            if (itemList[i].ItemId == id) {
                exist = true;
                break;
            }
        }

        return exist;
    }

    onRemoveGoodItem(item: GoodItemModel) {
        this.returnService.removeGoodItem(item.Id).subscribe(res => {
            if (res.Success == true) {
                this.goodItems = this.goodItems.filter(obj => obj.Id != item.Id);
                alert(res.Message);
            }
        });
    }

    onRemoveScrapItem(item: ScraptItemModel) {
        this.returnService.removeScrapItem(item.Id).subscribe(res => {
            if (res.Success == true) {
                this.scrapItems = this.scrapItems.filter(obj => obj.Id != item.Id);
                alert(res.Message);
            }
        })
    }
}