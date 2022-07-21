import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/_Services/auth.service';
import { RestService } from 'src/_Services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public AuthService: AuthService, public service: RestService) { }

  ngOnInit(): void {
    console.log("Userdetails here")
    console.log(this.service.getUserdetails());
  }

}
