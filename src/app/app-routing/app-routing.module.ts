import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';

// Routes to different components.
const routes: Routes = [
   {
     path: 'users',
     component: UserComponent
   },
   {
     path: 'user/add',
     component: AddUserComponent
   },
   {
     path: 'users/:id',
     component: UserDetailsComponent
   },
   {
     path: 'home',
     component: HomeComponent
   },
   {
    path: '**',
    redirectTo: 'home'
   },
   {
     path: '',
     redirectTo: 'home',
     pathMatch: 'full'
   }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
