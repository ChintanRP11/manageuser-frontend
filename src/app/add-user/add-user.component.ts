import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent{

  user = new User();
  submitted = false;

  constructor(
    private userService: UserService,
    private location: Location
  ) { }

  // Null user object for new object creation when clicking on Add Another User.
  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  // add user adds new user into database.
  addUser() {
    this.submitted = true;
    this.save();
  }

  // go to previous page.
  goBack(): void {
    this.location.back();
  }

  // saves the user into database using userServices.
  private save(): void {
    this.userService.addUser(this.user)
        .subscribe();
  }
}
