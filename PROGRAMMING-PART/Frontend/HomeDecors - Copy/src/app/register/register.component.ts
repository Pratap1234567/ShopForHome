import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/_Models/customer';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service: RestService, private router: Router) { }
  success: boolean = false
  user = new Customer();
  ngOnInit(): void {
  }
  register() {
    this.service.RegisterUser(this.user).subscribe(d => {
      alert("SuccessFully registered");
      console.log(d);
      this.router.navigate(['login'])
    }, f => { console.log(f); alert("User name already exist"); this.ngOnInit() }, () => console.log("SuccessFully Registered"))
  }

}
