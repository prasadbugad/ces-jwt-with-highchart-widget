import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  loggedUser: any;
  fullName: any;

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
