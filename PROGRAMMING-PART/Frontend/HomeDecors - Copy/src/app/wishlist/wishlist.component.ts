import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartList, Customer, WishList } from 'src/_Models/customer';
import { Product } from 'src/_Models/product';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(public service: RestService, private router: Router) { }
  customer = new Customer();
  Productslist: WishList[] = [];
  allProductsList: Product[] = [];
  WishListProducts: Product[] = [];

  ngOnInit(): void {

    this.service.allproducts().subscribe(d => {
      this.allProductsList = d;
      console.log(this.allProductsList.length)
      console.log(this.allProductsList)
    }, f => console.log("error " + f));
    this.service.getUserById(this.service.getUserdetails().id).subscribe(d => {
      console.log(d);
      this.customer = d
      this.Productslist = this.customer.customerWishlist;
      console.log(typeof (this.Productslist) + this.Productslist.length)
      for (let i = 0; i < this.allProductsList.length; i++) {
        for (let j = 0; j < this.Productslist.length; j++) {
          if (this.allProductsList[i].id == this.Productslist[j].productID) {
            this.WishListProducts.push(this.allProductsList[i]);
          }
        }
      }
    }, f => console.log("Error " + f)
    )
  }

  addCart(ele: Product) {
    let userid = this.service.getUserdetails().id;
    this.service.AddtoCart(userid, ele.id).subscribe(d => {
      console.log(d + "Added to cart");
      alert("SuccessFully added to cart")
      this.router.navigate(['wishlist'])
    }, f => {
      console.log("Error" + f);
      alert("Already added to the cart")
    }, () => console.log("Added to cart"))
  }

  removefromwish(ele: Product) {
    this.service.removefromwish(ele.id).subscribe(d => {
      console.log(d + "deleted from wishlist")
      alert("Removed From the wishlist")
      this.Productslist = [];
      this.WishListProducts = [];
      this.allProductsList = [];
      this.ngOnInit();


    }, f => console.log("error " + f));
  }






}



