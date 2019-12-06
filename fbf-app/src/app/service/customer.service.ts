import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../model/customer'
import { Observable } from 'rxjs';
import { PostResponse } from '../model/postresponse';

@Injectable()
export class CustomerService{
    constructor(private http: HttpClient){

    }

    getCustomerByName(name: string): Observable<Customer[]>{
        var cus: Customer[] = [];

        return this.http.get<any>("/maintenance/getcustomers/?name=" + name).pipe(map(value => {
            value.forEach(element => {
                var c = new Customer();
                c.Id = element.Id;
                c.Name = element.Name;
                c.Address = element.Address;

                cus.push(c);
            });

            return cus;
        }));
    }

    addCustomer(cToEdit: Customer): Observable<PostResponse>{
        return this.http.post<PostResponse>("/maintenance/addcustomer/", cToEdit).pipe(
            map(val => {
                return val;
            })
        );
    }

    editCustomer(cToEdit: Customer): Observable<PostResponse> {
        return this.http.post<PostResponse>("/maintenance/editcustomer/", cToEdit).pipe(
            map(val => {
                return val;
            })
        );
    }
}