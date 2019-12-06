import { Item } from './Item';

export class SearchItemResponse {
    Success: boolean;
    Message: string;
    TotalItems: number;

    Items: Item[];

    constructor(){
        this.Items = [];
    }
}