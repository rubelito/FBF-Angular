import { ItemHistory } from './Item';

export class HistoryItemSearchResponse{
    Success: boolean;
    Message: string;

    TotalHistories: number;
    Histories: ItemHistory[];
}