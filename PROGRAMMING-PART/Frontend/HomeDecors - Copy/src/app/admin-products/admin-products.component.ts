import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/_Models/product';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  constructor(private service: RestService, private router: Router, private route: ActivatedRoute) { }
  items: Product[] = []
  searchmode!: boolean;
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getUserbysearchname();
    })
  }

  getUserbysearchname() {
    this.searchmode = this.route.snapshot.paramMap.has('pname');
    console.log(this.searchmode)
    if (this.searchmode) {
      this.handlesearch();
    }
    else {
      this.getQtySortedProducts();
    }
  }

  getQtySortedProducts() {
    this.service.QtySortedProducts().subscribe(d => this.items = d, f => console.log("error " + f));
  }
  handlesearch() {
    const key: any = this.route.snapshot.paramMap.get('pname');
    this.service.ProductBySearchname(key).subscribe(d => this.items = d, f => console.log("Error " + f));
  }
  dosearch(ele: string) {
    console.log(`value = ${ele}`);
    this.router.navigateByUrl(`/fProduct/${ele}`);
  }
  // update the Quantity
  pupdate(pid: number, qty: string) {
    var eqty: number = +qty;
    this.service.adminupdateProductQty(pid, eqty).subscribe(d => { alert("Quantity Updated SuccesFully"); this.ngOnInit(); }, f => console.log("Error " + f));
  }

  deleteproduct(ele: Product) {
    this.service.deleteproduct(ele.id).subscribe(d => { alert(`SuccessFully Deleted ${ele.name}`); this.ngOnInit(); }, f => console.log("Error in deletion" + f));
  }

  updateprice(pid: number, price: string) {
    var p = +price;
    this.service.adminupdateProductprice(pid, p).subscribe(d => { alert("Price Updated SuccessFully"); this.ngOnInit(); }, f => { console.log("Error " + f); alert("Enter price Before Clicking Update") });
  }

  updatename(id: number, name: string) {
    this.service.adminupdateProductname(id, name).subscribe(d => { alert("name Updated SuccessFully"); this.ngOnInit(); }, f => console.log("Error " + f));
  }

}
