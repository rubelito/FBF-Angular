export class CreateEditReturnHistoryModel {
    Id: number;
    DRId: number;
    DRNumber: string;
    ProjectEngineer: string;
    Project: string;
    Address: string;
    Date: string;
    Note: string;
    CreatedBy: string;

    GoodItems: GoodItemModel[] = [];
    ScrapItems: ScraptItemModel[] = [];
}

export class GoodItemModel {
    Id: number;
    ItemId: number;
    ItemName: string;
    Qty: number;
    DateAdded: string;

    ReturnedHistoryId: number;
    DrId: number;
}

export class ScraptItemModel {
    Id: number;
    ItemId: number;
    ItemName: string;
    Qty: number;
    DateAdded: string;
    
    ReturnedHistoryId: number;
    DrId: number;
}