import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/_Models/product';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  constructor(private service: RestService) { }
  product: Product = new Product();
  ngOnInit(): void {

  }
  addproduct() {
    this.service.saveproduct(this.product).subscribe(d => {
      console.log(d);
      alert("Product added SuccessFully");
      this.product.category = "";
      this.product.imageurl = "";
      this.product.name = "";
      this.product.price = 0;
      this.product.qty = 0;
    }
      , f => console.log("error " + f));
  }

}
