import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReturnHistoryListModelResult } from '../model/returnhistorylistmodelresult';
import { CreateEditReturnHistoryModel, GoodItemModel, ScraptItemModel } from '../model/createeditreturnhistorymodel';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CreateEditReturnHistoryModelResponse } from '../model/createeditreturnhistorymodelresponse';
import { ReturnItemPostResponse } from '../model/returnitempostresponse';
import { PostResponse } from '../model/postresponse';

@Injectable()
export class ReturnItemService {
    constructor(private http: HttpClient) {

    }

    search(drNumber: string, currentPage: number, pageSize: number, orderBy: number): Observable<ReturnHistoryListModelResult> {
        var param = "?drnumber=" + drNumber + "&currentpage=" + currentPage +
            "&pagesize=" + pageSize + "&orderby=" + orderBy;
        return this.http.get<ReturnHistoryListModelResult>("/returnhistory/search/" + param)
            .pipe(map(res => {
                return res;
            }));
    }

    create(returnHistory: CreateEditReturnHistoryModel): Observable<CreateEditReturnHistoryModelResponse> {
        return this.http.post<CreateEditReturnHistoryModelResponse>("/returnhistory/create", returnHistory)
            .pipe(map(res => {
                return res;
            }));
    }

    edit(returnHistory: CreateEditReturnHistoryModel): Observable<CreateEditReturnHistoryModelResponse> {
        return this.http.post<CreateEditReturnHistoryModelResponse>("/returnhistory/edit", returnHistory)
            .pipe(map(res => {
                return res;
            }));
    }

    isDRAlreadyHaveReturn(drId: number): Observable<boolean> {
        var param = "?drId=" + drId;
        return this.http.get<boolean>("/returnhistory/IsDRAlreadyHaveReturnService/" + param)
            .pipe(map(res => {
                return res;
            }))

    }

    getReturnHistoryById(id: number): Observable<CreateEditReturnHistoryModel> {
        var param = "?id=" + id;
        return this.http.get<CreateEditReturnHistoryModel>("/returnhistory/GetById/" + param)
            .pipe(map(res => {
                return res;
            }))
    }

    returnGoodItem(item: GoodItemModel): Observable<ReturnItemPostResponse> {
        return this.http.post<ReturnItemPostResponse>("/returnhistory/returnitem", item)
            .pipe(map(res => {
                return res;
            }));
    }

    scrapItem(item: ScraptItemModel): Observable<ReturnItemPostResponse> {
        return this.http.post<ReturnItemPostResponse>("/returnhistory/scrapitem", item)
            .pipe(map(res => {
                return res;
            }))
    }

    removeGoodItem(id: number): Observable<PostResponse> {
        return this.http.get<PostResponse>("/returnhistory/removegooditem/?id=" + id)
            .pipe(map(res => {
                return res;
            }));
    }

    removeScrapItem(id: number): Observable<PostResponse> {
        return this.http.get<PostResponse>("/returnhistory/removescrapitem/?id=" + id)
            .pipe(map(res => {
                return res;
            }))
    }
}