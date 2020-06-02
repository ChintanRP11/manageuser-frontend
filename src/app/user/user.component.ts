import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent  implements OnInit {

  constructor(private userService: UserService) {}

  // these properties are used for displaying data into table.
  displayedColumns = ['id', 'firstname', 'lastname', 'email', 'dob', 'bio', 'actions'];
  dataSource = new MatTableDataSource([]);

  users: User[] = [];
  submitted = false;
  message: string;

  @ViewChild(MatSort) sort: MatSort;

  // this runs when component initialized.
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;

        // for filtering table by firstname
        this.dataSource.filterPredicate =
        (data: User, filtersJson: string) => {
            const matchFilter = [];
            const filters = JSON.parse(filtersJson);
            filters.forEach(filter => {
              const val = data[filter.id] === null ? '' : data[filter.id];
              matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
            });
            return matchFilter.every(Boolean);
          };
      },
      (error) => console.log(error)
    );
  }

  // filter table by column firstname.
  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'firstname',
      value: filterValue
    });


    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // for deleting entry from table and database.
  delete(uid): void {
    this.submitted = true;
    this.userService.deleteUser(uid)
          .subscribe(result => {
            console.log(uid);
            const itemIndex = this.users.findIndex(obj => obj.id === uid);
            this.users.splice(itemIndex, 1);
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.sort = this.sort;
            alert(`User Removed!`);
          });
  }

}


// export class UserComponent  implements OnInit {

//   constructor(private userService: UserService) {}

//   // these properties are used for displaying data into table.
//   columns = ['User Id', 'Full Name', 'Last Name', 'Email', 'Dob', 'Bio', 'Actions'];
//   index = ['id', 'firstname', 'lastname', 'email', 'dob', 'bio'];

//   users: User[] = [];
//   submitted = false;
//   message: string;

//   // this runs when component initialized.
//   ngOnInit(): void {
//     this.userService.getUsers().subscribe(
//       (response) => {
//         this.users = response;
//       },
//       (error) => console.log(error)
//     );
//   }

//   // for deleting entry from table and database.
//   delete(uid): void {
//     this.submitted = true;
//     this.userService.deleteUser(uid)
//           .subscribe(result => {
//             alert(`User Removed!`);
//             const itemIndex = this.users.findIndex(obj => obj[0] === uid);
//             this.users.splice(itemIndex, 1);
//           });
//   }

// }
