import { Component, Inject, ChangeDetectorRef } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SelectSupplierCustomerDialogComponent } from '../shared/selectsuppliercustomerdialog.component';
import { SelectItemDialog } from '../shared/selectitemdialog.component';
import { DRModel } from '../model/drmodel';
import { DRService } from '../service/dr.service';
import { DRItemModel } from '../model/dritemmodel';
import { ItemBasicModel } from '../model/itembasicmodel';
import { ItemService } from '../service/item.service';

@Component({
    templateUrl: './sdrdialog.component.html',
    styleUrls: ['./sdrdialog.component.css',
        '../shared/form-field-margin.css']
})
export class SDRDialogComponent {
    displayedColumns: string[] = ["id", "itemdesc", "measuredby", "inout", "remove"];
    id: number;
    receipType: string;
    receiptTypeId: number;
    operation: string;
    state: string;
    supplierOrCustomerLabel: string;
    inOrOutColumn: string;

    shouldShowControls: boolean;
    disabledControls: boolean;
    showFunctionControls: boolean = true;
    supplierName: string;
    supplierId: number;
    records: DRModel[] = [];
    itemsInDR: DRItemModel[] = []


    controlEnabled: boolean = false;

    supplierCustomerName: string;
    supplierCustomerId: number;
    sdr: string;
    date: Date;
    project: string;
    address: string;
    notes: string;
    deliveredBy: string;
    vehicleNo: string;

    items: ItemBasicModel[] = [];
    itemId: number;
    itemName: string;
    currentStocks: number;
    measuredBy: string;
    inOrOutQty: number = 0;

    constructor(public dialogRef: MatDialogRef<SDRDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(DRService) private drService: DRService,
        @Inject(ItemService) private itemService: ItemService,
        private dialog: MatDialog) {
        this.receipType = data.receiptType;
        this.operation = data.operation
        this.enabledDisableControls();
        this.setCustomerOrSupplierLabel();
        this.loadDRIfEdit();
    }

    enabledDisableControls() {
        if (this.operation == "Create") {
            this.disabledControls = false;
            this.state = "idle";
        }
        else if (this.operation == "Edit") {
            this.disabledControls = true;
            this.state = "idle";
        }
    }

    setCustomerOrSupplierLabel() {
        if (this.receipType == "SDR") {
            this.shouldShowControls = false;
            this.supplierOrCustomerLabel = "supplier"
            this.receiptTypeId = 1;
            this.inOrOutColumn = "In";
        }
        else if (this.receipType == "DR") {
            this.shouldShowControls = true;
            this.supplierOrCustomerLabel = "customer";
            this.receiptTypeId = 2;
            this.inOrOutColumn = "Out";
        }
    }

    loadDRIfEdit() {
        if (this.operation == "Edit") {
            this.id = this.data.Id;
            this.drService.getDRById(this.id).subscribe(res => {
                this.sdr = res.DRNumber;
                this.supplierCustomerName = res.SupplierCustomerName;
                this.supplierCustomerId = res.SupplierCustomerId;
                this.date = new Date(res.Date);
                this.project = res.Project;
                this.address = res.Address;
                this.notes = res.Note;
                this.deliveredBy = res.DeliveredBy;
                this.vehicleNo = res.VehicleNo;
            });
            this.loadItemsInDR();
            this.loadItemsForSelection();
        }
    }

    loadItemsInDR() {
        this.drService.getItemsInDR(this.id).subscribe(res => {
            this.itemsInDR = res;
        });
    }

    loadItemsForSelection() {
        this.itemService.getAllActiveItems().subscribe(res => {
            this.items = res;
        });
    }

    showSupplierCustomerDialog() {
        if (!this.disabledControls) {
            const dialogRef = this.dialog.open(SelectSupplierCustomerDialogComponent, {
                width: "700px",
                height: "500px",
                data: { entity: this.supplierOrCustomerLabel }
            })

            dialogRef.afterClosed().subscribe(res => {
                if (res != undefined) {
                    this.supplierCustomerId = res.Id;
                    this.supplierCustomerName = res.Name;
                }
            })
        }
    }

    onclickCreateOrEdit() {
        if (this.operation == "Create") {
            var drToCreate = this.makeDR();
            this.drService.createDR(drToCreate).subscribe(res => {
                if (res.Success) {
                    this.id = res.DRId;
                    this.showFunctionControls = false;
                    this.disabledControls = true;
                }
                alert(res.Message);
                this.loadItemsForSelection();
            });
        }
        else if (this.operation == "Edit") {
            if (this.state == "idle") {
                this.state = "onEdit";
                this.disabledControls = false;
            }
        }
    }

    makeDR(): DRModel {
        var dr = new DRModel();
        dr.DRNumber = this.sdr;
        dr.SupplierCustomerId = this.supplierCustomerId;
        dr.ReceiptType = this.receiptTypeId;
        dr.Date = this.date.toDateString();
        dr.Note = this.notes;
        dr.Project = this.project;
        dr.Address = this.address;
        dr.DeliveredBy = this.deliveredBy;
        dr.VehicleNo = this.vehicleNo;

        return dr;
    }

    onClickSave() {
        var drToEdit = this.makeDR();
        drToEdit.Id = this.id;
        this.drService.editDR(drToEdit).subscribe(res => {
            if (res.Success) {
                this.state = "idle";
                this.disabledControls = true;
            }
            alert(res.Message);
        });
    }

    onClickCancel() {
        this.state = "idle";
        this.disabledControls = true;
    }

    onRemove(item: DRItemModel) {
        item.DRId = this.id;
        this.drService.removeItem(item).subscribe(res => {
            this.loadItemsInDR();
            alert(res.Message);
        });

    }

    showItemSelection() {
        const dialogRef = this.dialog.open(SelectItemDialog, {
            width: "750px",
            height: "500px",
            data: { items: this.items }
        })

        dialogRef.afterClosed().subscribe(res => {
            if (res != undefined) {
                if (!this.isItemAlreadyExistInList(res.Id)) {
                    this.itemId = res.Id;
                    this.itemName = res.Name;
                    this.currentStocks = res.Qty;
                    this.measuredBy = res.MeasuredBy;
                }
                else{
                    alert("Sorry, Item already exist in DR");
                }
            }
        })
    }

    isItemAlreadyExistInList(id: number): boolean {
        var exist = false;
        for (var i = 0, len = this.itemsInDR.length; i < len; i++) {
            if (this.itemsInDR[i].ItemId == id) {
                exist = true;
                break;
            }
        }

        return exist;
    }

    onInOrOut() {
        var item = this.makeDRItemModelForInOrOut();
        this.drService.inOutItem(item).subscribe(res => {
            if (res.Success) {
                this.clearInputs();
                this.loadItemsInDR();
            }
        })
    }

    makeDRItemModelForInOrOut(): DRItemModel {
        var item = new DRItemModel();
        item.DRId = this.id;
        item.ItemId = this.itemId;
        item.Qty = this.inOrOutQty;

        return item;
    }

    clearInputs() {
        this.itemId = 0;
        this.itemName = "";
        this.currentStocks = 0;
        this.measuredBy = "";
        this.inOrOutQty = 0;
    }
}