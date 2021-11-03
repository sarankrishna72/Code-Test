import { UserListComponent } from './components/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children:[
      {
        path:'list',
        component: UserListComponent
      }, {
        path:'',
        redirectTo:"list",
        pathMatch:"full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
