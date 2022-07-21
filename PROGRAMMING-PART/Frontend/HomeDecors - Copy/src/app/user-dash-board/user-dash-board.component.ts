import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/_Models/customer';
import { Product } from 'src/_Models/product';
import { RestService } from 'src/_Services/rest.service';


@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.css']
})
export class UserDashBoardComponent implements OnInit {

  constructor(public service: RestService, private route: ActivatedRoute) { }
  products: Product[] = [];
  Category: any = "";
  user = new Customer();
  istheir: boolean = false;
  searchmode!: boolean;
  ngOnInit(): void {
    this.saveproducts();
    console.log("Userdetails here")
    this.route.paramMap.subscribe(() => {
      this.getproductsbyCname()
    })

    console.log(this.service.getUserdetails());
    console.log("Userdetails by id");
    this.service.getUserById(this.service.getUserdetails().id).subscribe(d => { console.log(d); this.user = d }, f => console.log("Error" + f), () => console.log("User details came "))

  }
  getproductsbyCname() {
    this.searchmode = this.route.snapshot.paramMap.has('keyword');
    console.log(this.searchmode);
    if (this.searchmode) {
      // console.log("comming soon")
      this.handleSearchProducts();
    } else {
      this.handlelistProducts()
    }
  }
  handlelistProducts() {
    const hascname: boolean = this.route.snapshot.paramMap.has('name')
    console.log(hascname);

    if (hascname) {
      this.Category = this.route.snapshot.paramMap.get("name");
      console.log(this.Category);
      if (this.Category != "SortByPrice") {
        this.service.ProductBycname(this.Category).subscribe(d => {
          this.products = d;
          for (let p of this.products) {
            if (p.qty <= 10) {
              console.log(p.name + " " + p.qty);
              this.service.EmailtoCustomer("iambadrinath9@gmail.com", `ADD STOCK ${p.name}`, `PLEASE ADD THE STOCK ${p.name} OF ${p.category} HAVING ${p.qty}`, "C:/Users/User/Wipro_Project/thank-you.jpg").subscribe(d => console.log("mail sent to Admin"), f => console.log(f));
            }
          }
        }, f => console.log("Error" + f));
      } else {
        this.service.PriceSortedProducts().subscribe(d => { console.log(d); this.products = d }, f => console.log("error " + f));
      }
    }
    else {
      this.getproducts();
    }
  }

  handleSearchProducts() {
    const thekey: any = this.route.snapshot.paramMap.get('keyword');
    this.service.ProductBySearchname(thekey).subscribe(d => {
      this.products = d;
      for (let p of this.products) {
        if (p.qty <= 10) {
          console.log(p.name + " " + p.qty);
          this.service.EmailtoCustomer("iambadrinath9@gmail.com", `ADD STOCK ${p.name}`, `PLEASE ADD THE STOCK ${p.name} OF ${p.category} HAVING ${p.qty}`, "C:/Users/User/Wipro_Project/thank-you.jpg").subscribe(d => console.log("Mail sent to admin"), f => console.log(f));
        }
      }
    }, f => console.log("Error " + f));
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

    for (let i = 0; i < this.user.customerCartList.length; i++) {
      console.log(this.user.customerCartList[i].productID + "and" + ele.id)
      if (this.user.customerCartList[i].productID == ele.id) {
        console.log("inside for")
        this.istheir = true;
        break;
      }
    }
    console.log("istheir" + this.istheir)
    if (!this.istheir) {
      this.service.AddtoCart(userid, ele.id).subscribe(d => {
        console.log(d + "Added to cart");
        alert("SuccessFully added to cart")
        this.ngOnInit();

      }, f => {
        console.log("Error" + f);
        alert("Already added to the cart")
      }, () => console.log("Added to cart"))
    } else {
      alert("already in the cart");
      console.log(this.istheir)
      this.istheir = false;
    }
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



  pricesort() {
    this.products = []
  }
}
