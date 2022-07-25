import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartList, Customer, WishList } from 'src/_Models/customer';
import { Product } from 'src/_Models/product';
import { RestService } from 'src/_Services/rest.service';
import { Location } from '@angular/common';
import { Address } from 'src/_Models/address';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css']
})
export class CartlistComponent implements OnInit {

  constructor(public service: RestService, private router: Router, private location: Location) {

  }
  customer = new Customer();
  Deliveryaddress: Address = new Address();
  Productslist: CartList[] = [];
  allProductsList: Product[] = [];
  WishListProducts: Product[] = [];
  totalAmount: number = 0;
  discountAmount: number = 0;
  displaytotal: number = 0;
  statement: string = "";
  showform: boolean = false;
  showbill: boolean = false;
  discount: string = ""
  checkaddress: Address = new Address();

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
    if (ele.rqty != 5 && ele.qty >= 10) {
      ele.rqty = ele.rqty + 1;
    } else {
      alert("Quantity is Less NEED ADMIN ACTION ")
    }
    console.log(ele.rqty);

  }
  dec(ele: Product) {
    if (ele.rqty != 1) {
      ele.rqty -= 1;
    }

  }


  checkout() {
    this.statement += "\tList of Products"
    for (let ele of this.WishListProducts) {
      this.totalAmount = this.totalAmount + (ele.rqty * ele.price);
      console.log(ele.name + "  price is " + (ele.price * ele.rqty));
      this.statement += `\n ${ele.name} Quantity ${ele.rqty} Price ${ele.price * ele.rqty} \n`
    }
    console.log("please pay " + this.totalAmount)
    if (this.totalAmount > 5000 && this.totalAmount <= 10000) {
      this.discount = "10% OFF";
      alert("ohoooo! you are eligible for the 10% off on shopping rupees 5000")
      this.statement += "\n ohoooo! you are eligible for the 10% off on shopping Above rupees 5000 \n"
      // this.totalAmount = this.totalAmount - (0.3 * this.totalAmount)
      this.discountAmount = this.totalAmount * 0.1;

      this.statement += "\n Total amount after discount " + this.totalAmount;
      this.statement += "\n THANKS FOR SHOPPING ";
      this.statement += "\n PLEASE VISIT AGAIN ";


    } else if (this.totalAmount > 10000 && this.totalAmount <= 20000) {
      this.discount = "30% OFF";
      alert("ohoooo! you are eligible for the 30% off on shopping Above rupees 10000")
      this.statement += "\n ohoooo! you are eligible for the 30% off on shopping Above rupees 10000 \n"
      // this.totalAmount = this.totalAmount - (0.3 * this.totalAmount)
      this.discountAmount = this.totalAmount * 0.1;

      this.statement += "\n Total amount after discount " + this.totalAmount;
      this.statement += "\n THANKS FOR SHOPPING ";
      this.statement += "\n PLEASE VISIT AGAIN ";
    } else if (this.totalAmount > 30000) {
      this.discount = "40% OFF";
      alert("ohoooo! you are eligible for the 40% off on shopping Above rupees 20000")
      this.statement += "\n ohoooo! you are eligible for the 40% off on shopping rupees 5000 \n"
      // this.totalAmount = this.totalAmount - (0.3 * this.totalAmount)
      this.discountAmount = this.totalAmount * 0.4;

      this.statement += "\n Total amount after discount " + (this.totalAmount - this.discountAmount);
      this.statement += "\n THANKS FOR SHOPPING ";
      this.statement += "\n PLEASE VISIT AGAIN ";
    }
    // alert("total is " + this.totalAmount)
    console.log(this.statement);
    console.log(`${this.customer.email}` + ` THANKS FOR SHOPPING ${this.customer.username}` + `${this.statement}` + "C:/Users/User/Wipro_Project/thank-you.jpg")
    // this.service.EmailtoCustomer(`${this.customer.email}`, ` THANKS FOR SHOPPING ${this.customer.username}`, `${this.statement.toLocaleUpperCase()} hh`, "C:/Users/User/Wipro_Project/thank-you.jpg").
    //   subscribe((d) => console.log("email sent "), f => console.log("error " + f))
    console.log(this.checkaddress.address);
    this.service.getUserById(this.service.getUserdetails().id).subscribe(d => {
      this.checkaddress = d.deliveryAddress;
      console.log(d.deliveryAddress);
      if (this.checkaddress == undefined) {
        console.log("inside if")
        this.showform = true;

      } else {
        this.showform = false;
        this.showbill = true;
      }
    }, f => console.log(f))
    console.log(this.checkaddress.address);



    console.log(this.showbill)

  }
  // checkout completed

  addaddress() {
    // console.log(this.customer.DeliveryAdderss.address);
    // console.log(this.customer.DeliveryAdderss.houseno);
    console.log(this.Deliveryaddress.address);
    this.service.AddAddress(this.service.getUserdetails().id, this.Deliveryaddress.houseno, this.Deliveryaddress.address, this.Deliveryaddress.landmark, this.Deliveryaddress.state, this.Deliveryaddress.pincode, this.Deliveryaddress.country, this.Deliveryaddress.mobile).subscribe(d => { console.log(d); this.showbill = true; }, f => console.log("Error " + f));
  }

  payment() {
    let total = 0
    for (let p of this.WishListProducts) {
      console.log("First" + p.name + " " + p.qty);
      total = p.rqty * p.price;
      this.service.savetoreport(p.category, p.name, p.rqty, total, this.customer.id, this.customer.username).subscribe(d => {
        console.log("Added to report" + d); this.service.EmailtoCustomer("iambadrinath9@gmail.com", `THANKS FOR SHOPPING ${this.customer.username}`, `THANKS FOR SHOPPING PLEASE PAY ${this.totalAmount - this.discountAmount}/- ONLY`, "C:/Users/User/Wipro_Project/thank-you.jpg").subscribe(d => console.log("mail sent to Admin"), f => console.log(f));
      }
        , f => console.log("Error " + f));
      this.service.updateProductQty(p.id, p.rqty).subscribe(d => { console.log(d); console.log(p.name + " " + p.qty); }, f => console.log(f));


    }

    this.service.deleteallCart().subscribe(d => {
      console.log("deleted SuccessFully");
    }
      , f => console.log("error " + f))
    this.Productslist = [];
    this.WishListProducts = [];
    this.allProductsList = [];
    this.ngOnInit();
    alert("THANKS FOR SHOPPING")

    this.router.navigate(['/userdash']);

  }


  removefromCart(ele: Product) {
    this.service.removefromcart(ele.id).subscribe(d => {

      console.log(d + "deleted from wishlist")
      alert("Removed From the CartList")
      this.Productslist = [];
      this.WishListProducts = [];
      this.allProductsList = [];
      this.ngOnInit();



    }, f => console.log("error " + f));

  }


}
