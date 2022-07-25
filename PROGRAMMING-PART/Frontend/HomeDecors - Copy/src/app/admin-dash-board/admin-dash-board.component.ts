import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/_Models/customer';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent implements OnInit {

  constructor(public service: RestService, public router: Router) { }
  users: any[] = [];
  success: boolean = false;
  user = new Customer();
  ngOnInit(): void {
  }
  deleteUser() {
    this.service.deleteUser(this.user.email).subscribe(d => {
      console.log(`user with email ${this.user.email} has been deleted Successfully`)
      alert(`${this.user.email} deleted Successfully`)
    }, f => console.log("Error in deleting " + f), () => console.log("Success in deletion"))
  }
  updateUser() {
    this.service.updateUser(this.user.username, this.user.phone).subscribe(d => {
      alert("UpdateSuccessFul");
    }, f => { console.log("Error " + f) }, () => console.log("Successfully Updated"))

  }

  RetriveSingleUser() {
    console.log("name is " + this.user.username)
    this.service.getsingleUserDetails(this.user.username).subscribe(d => {
      console.log(d);
      this.users.push(d);
      this.service.setUserList(this.users);
      console.log(this.service.getUserslist());
      this.router.navigate(['userlist']);
    }, f => console.log("error " + f), () => console.log("Success in getting users"))
  }

  getallUsers() {
    this.service.getallUsers().subscribe(d => {
      console.log(d);
      this.service.setUserList(d);
      this.router.navigate(['userlist'])
    }, f => console.log(f));

  }

  register() {
    this.router.navigate(['register'])
  }
  addproduct() {
    this.router.navigate(['/saveproduct']);
  }

}
