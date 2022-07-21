import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(public service: RestService) { }
  success: boolean = false;
  ngOnInit(): void {
    this.success = this.service.getMessage();
  }

}
