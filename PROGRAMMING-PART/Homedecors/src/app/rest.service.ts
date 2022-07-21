import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  operate: boolean = false;
  constructor(public http: HttpClient) { }

  getMessage(): boolean {
    return this.operate;
  }
  setMessage(success: boolean) {
    this.operate = success;
  }

  registerCustomer(Cust: Customer) {
    return this.http.post("http://localhost:8181/register", Cust);
  }

  generateToken(cust: Customer) {
    return this.http.post("http://localhost:8181/authenticate", cust, { responseType: 'text' as 'json' });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:8282/getallProducts");
  }




}
