import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customer } from '../customer';

import { RestService } from '../rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public http: HttpClient, public service: RestService, public router: Router) { }
  success: boolean = false;
  user = new Customer();
  ngOnInit(): void {
    this.success = this.service.getMessage();
  }

  public register() {
    console.log("customer Registration")
    this.service.registerCustomer(this.user).subscribe(d => {
      console.log(d);
      this.router.navigate(['login'])
    }, f => console.log("Error " + f), () => console.log("Successfully registered"))
  }

}
