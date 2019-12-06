import { ReturnedHistoryListModel } from './returnhistorylistmodel';

export class ReturnHistoryListModelResult {
    Success: boolean;
    Message: string;

    TotalItems: number;
    Records: ReturnedHistoryListModel[] = [];
}