import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user = new User() ;
  submitted = false;
  message: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  // updates user's data into database by userServices.
  update(): void {
    this.submitted = true;
    this.userService.updateUser(this.user)
        .subscribe(result => this.message = 'User (' + this.user.firstname + ') Updated Successfully!');
  }

  // delete user from database by userServices.
  delete(): void {
    this.submitted = true;
    this.userService.deleteUser(this.user.id)
        .subscribe(result => this.message = 'User (' + this.user.firstname + ') Deleted Successfully!');
  }

  // go to previous page.
  goBack(): void {
    this.location.back();
  }
}
