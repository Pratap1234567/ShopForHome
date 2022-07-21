import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/_Models/customer';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(public service: RestService) { }
  users: any[] = [];
  ngOnInit(): void {
    this.users = this.service.getUserslist()
    // console.log(this.users.length)
  }

}
