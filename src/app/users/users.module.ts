import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersContainerComponent } from './users-container/users-container.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [UsersContainerComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: UsersContainerComponent
    }])
  ]
})
export class UsersModule { }
