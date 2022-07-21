import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CssSelector } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Address } from 'src/_Models/address';
import { Customer } from 'src/_Models/customer';
import { Product } from 'src/_Models/product';
import { Report } from 'src/_Models/report';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private Authservice: AuthService) { }
  requestHeaders = new HttpHeaders(
    { "No-Auth": "True" }
  );
  user!: Customer;
  users!: Customer[]
  // login user 
  public LoginUser(cust: Customer) {
    return this.http.post("http://localhost:8181/authenticate", cust, { headers: this.requestHeaders });
  }

  public getUserByUsername(name: String) {
    return this.http.get(`http://localhost:8181/getUserbyUsername/${name}`, { headers: this.requestHeaders });
  }

  public setFullUserDetails(userdetails: Customer) {
    this.user = userdetails;
  }

  public getUserdetails(): Customer {
    return this.user;
  }
  // storing users nd getting users
  public getUserslist() {
    return this.users;
  }

  public setUserList(user: Customer[]) {
    this.users = user;
  }


  public rolematch(role: string): boolean {
    let ismatch = false;
    const userrole = this.Authservice.getroles();
    if (userrole === role) {
      ismatch = true;
      return ismatch;
    } else {
      return ismatch;
    }
  }


  public RegisterUser(user: Customer) {
    return this.http.post("http://localhost:8181/register", user)
  }

  public userfun() {
    return this.http.get("http://localhost:8181/hellouser", { responseType: "text" });
  }

  public adminfun() {
    return this.http.get("http://localhost:8181/helloadmin", { responseType: "text" });
  }

  public AddAddress(uid: number, hno: string, address: string, landmark: string, state: string, pincode: number, country: string, mobile: string) {
    return this.http.post(`http://localhost:8181/saveAddress/${uid}/${hno}/${address}/${landmark}/${state}/${pincode}/${country}/${mobile}`, { uid, hno, address, landmark, state, pincode, country, mobile });
  }

  // Admin Operations

  public deleteUser(email: string) {
    return this.http.delete(`http://localhost:8181/admin/DeleteCustomer/${email}`)
  }

  public updateUser(username: string, phone: string) {
    return this.http.put(`http://localhost:8181/admin/UpdateCustomer/${username}/${phone}`, { username, phone })
  }

  public getsingleUserDetails(username: string) {
    return this.http.get(`http://localhost:8181/admin/GetUserByUsername/${username}`);
  }

  public getallUsers(): Observable<Customer[]> {
    return this.http.get<Customer[]>("http://localhost:8181/admin/GetAllUsers");
  }

  // products
  public allproducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:8282/getallProducts")
  }

  public ProductBycname(cname: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8282/getProductbyCname/${cname}`)
  }

  public ProductBySearchname(cname: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8282/getProductbySearchname/${cname}`)
  }

  public PriceSortedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:8282/PriceSortedProducts")
  }



  public saveProducts() {
    return this.http.get("http://localhost:8282/SaveProducts");
  }

  AddtowishList(uid: number, pid: number) {
    return this.http.post(`http://localhost:8181/addingtoWishlist?uid=${uid}&pid=${pid}`, { uid, pid });
  }
  AddtoCart(uid: number, pid: number) {
    return this.http.post(`http://localhost:8181/addingtoCartList/${uid}/${pid}`, { uid, pid })
  }

  getUserById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`http://localhost:8181/getUserById/${id}`)
  }

  removefromwish(id: number) {
    return this.http.delete(`http://localhost:8181/deleteWishitem/${id}`);
  }
  removefromcart(id: number) {
    return this.http.delete(`http://localhost:8181/deletecartitem/${id}`);
  }

  deleteallCart() {
    return this.http.delete(`http://localhost:8181/DeleteCart`)
  }

  updateProductQty(pid: number, sqty: number) {
    return this.http.put(`http://localhost:8282/UpdateQty/${pid}/${sqty}`, { pid, sqty });
  }

  // sending email to the Customer 

  EmailtoCustomer(tomail: string, sub: string, body: string, attach: string) {
    return this.http.post(`
    http://localhost:8383/email?tomail=${tomail}&subject=${sub}&body=${body}&attachment=${attach}`, { tomail });
  }

  // report 

  savetoreport(category: string, productname: string, qty: number, totalprice: number, userid: number, username: string) {
    return this.http.post(`http://localhost:8484/salereport/${category}/${productname}/${qty}/${totalprice}/${userid}/${username}`, { category, productname, qty, totalprice, userid, username });
  }
}
