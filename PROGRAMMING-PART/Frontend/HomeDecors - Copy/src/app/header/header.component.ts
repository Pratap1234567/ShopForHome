import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Customer } from 'src/_Models/customer';
import { AuthService } from 'src/_Services/auth.service';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public Authservice: AuthService, public router: Router, public service: RestService) { }

  ngOnInit(): void {
  }

  public isLoggedin() {
    return this.Authservice.isLoggedIn();
  }

  public logout() {
    alert("LoggedOut SuccessFully")
    this.router.navigate(['home'])
    this.service.setFullUserDetails(new Customer());
    return this.Authservice.clear();
  }


}
