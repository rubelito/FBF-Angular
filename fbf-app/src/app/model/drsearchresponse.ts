import { DRListModel } from './drlistmodel';

export class DRSearchResponse {
    Success: boolean;
    Message: string;

    TotalDr: number;
    DRs: DRListModel[];

    constructor(){
        this.DRs = [];
    }
}