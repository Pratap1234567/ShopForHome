import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';

import { RestService } from '../rest.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public service: RestService, public router: Router) { }
  success: boolean = false
  productslist: Product[] = [];
  ngOnInit(): void {
    this.success = this.service.getMessage();
    this.service.getProducts().subscribe((d) => {
      console.log(d);
      this.productslist = d;
    }, f => console.log("Failed"), () => console.log("sorry Products not loaded"))
  }
  wishList(ele: Product) {

  }
  cartList(ele: Product) {

  }



}
