import { Injectable } from '@angular/core';
import { SearchItemResponse } from '../model/searchitemresponse';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, MeasuredBy, InOutParam } from '../model/Item';
import { PostResponse } from '../model/postresponse';
import { ItemBasicModel } from '../model/itembasicmodel';

@Injectable()
export class ItemService {
    constructor(private http: HttpClient) {

    }

    searchItems(search: string, currentPage: number, pageSize: number, criteria: string,
        status: string, orderBy: string, withRelation: boolean): Observable<SearchItemResponse> {
        var param = "?search=" + search + "&currentPage=" + currentPage
            + "&pageSize=" + pageSize + "&status=" + status + "&criteria=" + criteria +
            "&orderBy=" + orderBy + "&withRelation=" + withRelation;
        return this.http.get<SearchItemResponse>("/maintenance/searchitem/" + param)
            .pipe(
                map((val) => {
                    return val;
                })
            );
    }

    getAllActiveItems(): Observable<ItemBasicModel[]> {
        return this.http.get<ItemBasicModel[]>("/item/getallactiveitems/")
            .pipe(map(res => {
                return res;
            }))
    }

    addItem(iToAdd: Item): Observable<PostResponse> {
        return this.http.post<PostResponse>("/maintenance/additem/", iToAdd).pipe(
            map(res => {
                return res;
            })
        );
    }

    editItem(iToEdit: Item): Observable<PostResponse> {
        return this.http.post<PostResponse>("/maintenance/edititem/", iToEdit).pipe(
            map(res => {
                return res;
            })
        );
    }

    inOut(param: InOutParam): Observable<PostResponse> {
        return this.http.post<PostResponse>("/item/inout/", param).pipe(
            map(res => {
                return res;
            })
        )
    }

    getMeasuredBy(): MeasuredBy[] {
        var ms: MeasuredBy[] = [];
        var m1 = new MeasuredBy();
        m1.Id = 0;
        m1.Name = ".pcs";

        var m2 = new MeasuredBy();
        m2.Id = 1;
        m2.Name = "Meters";

        var m3 = new MeasuredBy();
        m3.Id = 2;
        m3.Name = "Feet";

        ms.push(m1);
        ms.push(m2);
        ms.push(m3);

        return ms;
    }
}