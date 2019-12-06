export class Item {
    Id: number;
    Name: string;
    MeasuredById: number;
    MeasuredBy: string;
    Threshold: string;
    Cost: number;
    Qty: number;
    IsPhaseOut: boolean = false;

    CategoryId: number;
    Category: string;
    SupplierId: number;
    Supplier: string;
}

export class MeasuredBy {
    Id: number;
    Name: string;
}

export class InOutParam {
    Item: Item;
    InOrOut: number;
    Qty: number;
    Note: string;
}

export class ItemHistory {
    Id: number;
    ReceiptType: string;
    InOrOut: string;
    DRorSDR: string;
    BeginningQty: number;
    Qty: number;
    EndingQty: number;
    Date: string;
    Note: string;
    InOutBy: string;
    ForRowClass: string;
}