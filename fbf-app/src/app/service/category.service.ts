import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostResponse } from '../model/postresponse';

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) {

    }

    getCategories(): Observable<Category[]> {
        var cats: Category[] = [];

        return this.http.get<any>("/maintenance/getcategories")
            .pipe(map(val => {
                val.forEach(element => {
                    var c = new Category();
                    c.Id = element.Id;
                    c.Name = element.Name;

                    cats.push(c);
                });

                return cats;
            }));
    }

    addCategory(cToAdd: Category): Observable<PostResponse> {
        return this.http.post<PostResponse>("/maintenance/addcategory/", cToAdd).pipe(
            map(val => {
                return val;
            })
        );
    }

    editCategory(cToEdit: Category): Observable<PostResponse> {
        return this.http.post<PostResponse>("/maintenance/editcategory/", cToEdit).pipe(
            map(val => {
                return val;
            })
        );
    }
}