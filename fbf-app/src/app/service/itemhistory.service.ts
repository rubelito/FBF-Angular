import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HistorySearchParam } from '../model/historysearchparam';
import { Observable, of } from 'rxjs';
import { HistoryItemSearchResponse } from '../model/historyitemresponse';

@Injectable()
export class ItemHistoryService {
    constructor(private http: HttpClient) {

    }

    searchHistory(param: HistorySearchParam): Observable<HistoryItemSearchResponse> {
        return this.http.post<HistoryItemSearchResponse>("/history/searchhistories/", param)
            .pipe(map(res => {
                return res;
            }));
    }
}