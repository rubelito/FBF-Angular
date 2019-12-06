import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Supplier } from '../model/supplier';
import { Observable } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { PostResponse } from '../model/postresponse';

@Injectable()
export class SupplierService {
    constructor(private http: HttpClient) {

    }

    getSupplierByName(name: string): Observable<Supplier[]> {
        var sups: Supplier[] = [];

        return this.http.get<any>("/maintenance/getsuppliers/?name=" + name).pipe(map(value => {
            value.forEach(element => {
                var c = new Supplier();
                c.Id = element.Id;
                c.Name = element.Name;
                c.Address = element.Address;

                sups.push(c);
            });

            return sups;
        }));
    }

    getSupplierbyId(id: number) {

    }

    addSupplier(sToAdd: Supplier): Observable<PostResponse>{
        return this.http.post<PostResponse>("/maintenance/addsupplier/", sToAdd).pipe(
            map(val => {
                return val;
            })
        );
    }

    editSupplier(eToEdit: Supplier): Observable<PostResponse> {
        return this.http.post<PostResponse>("/maintenance/editsupplier/", eToEdit).pipe(
            map(val => {
                return val;
            })
        );
    }
}
