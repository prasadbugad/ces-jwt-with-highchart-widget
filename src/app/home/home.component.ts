import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];
    fullName: any;
    loggedUser: any;

    constructor(private userService: UserService) { 
       
    }

    ngOnInit() {
        this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
        this.fullName = this.loggedUser.firstName + " " + this.loggedUser.lastName;

        // this.loading = true;
        // this.userService.getAll().pipe(first()).subscribe(users => {
        //     this.loading = false;
        //     this.users = users;
        // });
    }
}