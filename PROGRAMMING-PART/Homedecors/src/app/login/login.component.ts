import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public http: HttpClient, public service: RestService, public router: Router) { }
  success: boolean = false;
  ngOnInit(): void {
    this.success = this.service.getMessage();
  }
  user = new Customer();
  login() {
    this.service.generateToken(this.user).subscribe(d => {
      console.log(d)
      this.service.setMessage(true);
      this.router.navigate(['products'])
    }, f => console.log("Error  " + f), () => console.log("Token Generated SuccessFully"));
  }

}
