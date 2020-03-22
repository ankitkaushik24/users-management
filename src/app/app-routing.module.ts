import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'users',
  canLoad: [AuthGuard],
  loadChildren: './users/users.module#UsersModule'
}, {
  path: '',
  redirectTo: 'users',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
