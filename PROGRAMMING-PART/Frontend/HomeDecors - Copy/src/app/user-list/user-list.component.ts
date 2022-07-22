import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Customer } from 'src/_Models/customer';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(public service: RestService, private route: ActivatedRoute, private router: Router) { }
  users: any[] = [];
  searchmode!: boolean;
  // user = new Customer();
  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
      this.getUserbysearchname();
    })
    // console.log(this.users.length)
  }

  getUserbysearchname() {
    this.searchmode = this.route.snapshot.paramMap.has('name');
    console.log(this.searchmode)
    if (this.searchmode) {
      this.handlesearch();
    }
    else {
      this.getallUsers();
    }
  }

  handlesearch() {
    const key: any = this.route.snapshot.paramMap.get('name');
    this.service.getUserbySearch(key).subscribe(d => {
      this.users = d;
    }, f => console.log("error " + f));

  }

  dosearch(key: string) {
    console.log(`value = ${key}`);
    this.router.navigateByUrl(`/find/${key}`);
  }


  getallUsers() {
    this.service.getallUsers().subscribe(d => { console.log(d); this.users = d }, f => console.log("Error " + f));
  }

  updateuserphone(name: string, num: string) {
    this.service.updateUser(name, num).subscribe(d => {
      console.log("Updated SuccessFully " + d);
      alert(`successFully Updated ${name}'s phone Number`)
      this.ngOnInit();
    }, f => console.log("error " + f));
  }

  deleteUser(user: Customer) {
    this.service.deleteUser(user.email).subscribe(d => {
      console.log(`user with email ${user.email} has been deleted Successfully`)
      alert(`${user.email} deleted Successfully`)
      this.ngOnInit();
    }, f => console.log("Error in deleting " + f), () => console.log("Success in deletion"))
  }

}
