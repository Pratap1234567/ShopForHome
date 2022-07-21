import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CartList, Customer, WishList } from 'src/_Models/customer';
import { Product } from 'src/_Models/product';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css']
})
export class CartlistComponent implements OnInit {

  constructor(public service: RestService) { }
  customer = new Customer();
  Productslist: CartList[] = [];
  allProductsList: Product[] = [];
  WishListProducts: Product[] = [];
  totalAmount: number = 0;
  displaytotal: number = 0;
  statement: string = ""

  product = new Product();
  ngOnInit(): void {
    console.log(this.product.rqty)
    this.service.allproducts().subscribe(d => {
      this.allProductsList = d;
      console.log(this.allProductsList.length)
      console.log(this.allProductsList)
    }, f => console.log("error " + f));

    this.service.getUserById(this.service.getUserdetails().id).subscribe(d => {
      console.log(d);
      this.customer = d
      this.Productslist = this.customer.customerCartList;
      console.log(typeof (this.Productslist) + this.Productslist.length)
      for (let i = 0; i < this.allProductsList.length; i++) {
        for (let j = 0; j < this.Productslist.length; j++) {
          if (this.allProductsList[i].id == this.Productslist[j].productID) {
            this.WishListProducts.push(this.allProductsList[i]);
          }
        }
      }
    }, f => console.log("Error " + f)
    );

  }

  inc(ele: Product) {

    console.log(ele.rqty);
    if (ele.rqty != 5) {
      ele.rqty = ele.rqty + 1;
    }
    console.log(ele.rqty);

  }
  dec(ele: Product) {
    if (ele.rqty != 1) {
      ele.rqty -= 1;
    }

  }


  checkout() {
    this.statement += "List of Products"
    for (let ele of this.WishListProducts) {
      this.totalAmount = this.totalAmount + (ele.rqty * ele.price);
      console.log(ele.name + "  price is " + (ele.price * ele.rqty));
      this.statement += `\n ${ele.name} Quantity ${ele.rqty} Price ${ele.totalprice} \n`
    }
    console.log("please pay " + this.totalAmount)
    if (this.totalAmount > 5000) {
      alert("ohoooo! you are eligible for the 30% off on shopping rupees 5000")
      this.statement += "\n ohoooo! you are eligible for the 30% off on shopping rupees 5000 \n"
      this.totalAmount = this.totalAmount - (0.3 * this.totalAmount)
      console.log("after discount " + this.totalAmount)
      this.statement += "\n Total amount after discount " + this.totalAmount;
    }
    alert("total is " + this.totalAmount)
    this.totalAmount = 0;
    console.log(this.statement);
  }

  removefromCart(ele: Product) {
    this.service.removefromcart(ele.id).subscribe(d => {
      console.log(d + "deleted from wishlist")
      alert("Removed From the wishlist")
    }, f => console.log("error " + f));

  }


}
