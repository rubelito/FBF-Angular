import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DRSearchResponse } from '../model/drsearchresponse';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PostResponse } from '../model/postresponse';
import { DRModel } from '../model/drmodel';
import { DRItemModel } from '../model/dritemmodel';
import { CreateDRResponse } from '../model/createdrresponse';

@Injectable()
export class DRService {
    constructor(private http: HttpClient) {

    }

    searchDR(drNumber: string, currentPage: number, pageSize: number,
        receiptType: number, orderBy: number): Observable<DRSearchResponse> {
        var param = "?drNumber=" + drNumber + "&currentPage=" + currentPage +
            "&pageSize=" + pageSize + "&receiptType=" + receiptType + "&orderBy=" + orderBy;

        return this.http.get<DRSearchResponse>("/dr/searchdr/" + param)
            .pipe(map(res => {
                return res;
            }));
    }

    createDR(dr: DRModel): Observable<CreateDRResponse> {
        return this.http.post<CreateDRResponse>("/dr/createdr", dr)
            .pipe(map(res => {
                return res;
            }));
    }

    getDRById(id: number): Observable<DRModel> {
        return this.http.get<DRModel>("/dr/getdrbyid/?id=" + id)
            .pipe(map(res => {
                return res;
            }))
    }

    editDR(dr: DRModel): Observable<PostResponse> {
        return this.http.post<PostResponse>("/dr/editdr/", dr)
            .pipe(map(res => {
                return res;
            }))
    }

    getItemsInDR(id: number): Observable<DRItemModel[]> {
        return this.http.get<DRItemModel[]>("/dr/getitemsindr/?id=" + id)
            .pipe(map(res => {
                return res;
            }))
    }

    inOutItem(item: DRItemModel): Observable<PostResponse> {
        return this.http.post<PostResponse>("/dr/inoutitem", item)
            .pipe(map(res => {
                return res;
            }));
    }

    removeItem(drItem: DRItemModel): Observable<PostResponse> {
        return this.http.post<PostResponse>("/dr/removeitemtodr", drItem)
            .pipe(map(res => {
                return res;
            }))
    }

    getItemsWithinDR(drId: number): Observable<DRItemModel[]> {
        return this.http.get<DRItemModel[]>("/dr/getitemswithindr/?drid=" + drId)
            .pipe(map(res => {
                return res;
            }));
    }
}