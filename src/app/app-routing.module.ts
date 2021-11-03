import { LoginComponent } from './core/components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  } from './core/auth/login.router.guard';
import { IsLoggedinGuard, LoginRouterGuard } from './core/auth';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRouterGuard],
    pathMatch: "full"
  },
  { 
    path: 'user', 
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [IsLoggedinGuard],
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginRouterGuard],
    pathMatch: 'full',
  },
  {
    path: '**',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
