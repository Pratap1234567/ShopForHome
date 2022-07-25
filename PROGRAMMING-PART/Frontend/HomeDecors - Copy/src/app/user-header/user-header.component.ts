import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/_Models/customer';
import { AuthService } from 'src/_Services/auth.service';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  constructor(public Authservice: AuthService, public router: Router, public service: RestService) { }
  user: Customer = new Customer();
  ngOnInit(): void {
    this.service.getUserById(this.service.getUserdetails().id).subscribe(d => { this.user = d; console.log(this.user) }, f => console.log("error " + f));
    console.log(this.user.username + " is name at login")
  }

  public isLoggedIn() {
    return this.Authservice.isLoggedIn();
  }
  public logout() {
    alert("successFully Logged out")
    this.router.navigate(['home'])
    // this.service.setFullUserDetails(new Customer());
    return this.Authservice.clear();
  }
  dosearch(key: string) {
    console.log(`value = ${key}`);
    this.router.navigateByUrl(`/search/${key}`);
  }

}
