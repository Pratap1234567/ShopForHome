import { Component, OnInit } from '@angular/core';
import { Product } from 'src/_Models/product';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.css']
})
export class UserDashBoardComponent implements OnInit {

  constructor(public service: RestService) { }
  products: Product[] = [];
  ngOnInit(): void {
    this.saveproducts();
    console.log("Userdetails here")
    console.log(this.service.getUserdetails());
    console.log("Userdetails by id");
    this.service.getUserById(this.service.getUserdetails().id).subscribe(d => console.log(d), f => console.log("Error" + f), () => console.log("User details came "))


    this.getproducts()
  }
  userfun() {
    this.service.userfun().subscribe(d => console.log(d), f => console.log("error " + f), () => console.log("User fun came"))

  }
  adminfun() {
    this.service.adminfun().subscribe(d => console.log(d), f => console.log("error " + f), () => console.log("User fun came"))
  }

  getproducts() {
    this.service.allproducts().subscribe(d => {
      console.log(d);
      this.products = d
    }, f => console.log("failed to load Products " + f), () => console.log("SuccessFully retrived all products"))
  }
  saveproducts() {
    this.service.saveProducts().subscribe(d => console.log(d), f => console.log("error" + f), () => console.log("Saved SuccessFully"))
  }

  addCart(ele: Product) {
    let userid = this.service.getUserdetails().id;
    this.service.AddtoCart(userid, ele.id).subscribe(d => {
      console.log(d + "Added to cart");
      alert("SuccessFully added to cart")
    }, f => {
      console.log("Error" + f);
      alert("Already added to the cart")
    }, () => console.log("Added to cart"))
  }

  addtoWishList(ele: Product) {
    let userid = this.service.getUserdetails().id;
    this.service.AddtowishList(userid, ele.id).subscribe(d => {
      console.log(d + "Added to wishlist");
      alert("SuccessFully added to Wishlist")
    }, f => {
      console.log("Error" + f);
      alert("Already added to the Wishlist")
    }, () => console.log("Added to Wishlist"))
  }
}
