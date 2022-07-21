import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/_Models/customer';
import { AuthService } from 'src/_Services/auth.service';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(public service: RestService, private authsercice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  public isLoggedin() {
    return this.authsercice.isLoggedIn();
  }

  public logout() {
    this.authsercice.clear();
    this.service.setFullUserDetails(new Customer())
    alert("Successfully logged")
    this.router.navigate(['home'])
  }


}
