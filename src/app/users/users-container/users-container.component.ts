import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'aptm-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss']
})
export class UsersContainerComponent implements OnInit {

  users;
  cloneUsers;
  nameFilter = '';
  ageFilter = {minValue: 10, maxValue: 120};

  constructor(private http: HttpClient) {
    this.users = [{firstName: 'Ankit', lastName: 'Kaushik', age: 24}, {firstName: 'Altruist', lastName: 'akki', age: 19},
      {firstName: 'Vicky', lastName: 'Kaushal', age: 31}];
    this.cloneUsers = JSON.parse(JSON.stringify(this.users));
  }

  ngOnInit() {
    this.getUsers().subscribe();
  }

  getUsers(): Observable<any> {
    return this.http.get('$rootUrl/api/users').pipe(tap(users => this.users = users));
  }

  filterByName(name) {
    this.nameFilter = name.trim();
    this.users = this.cloneUsers.filter(user => {
      return `${user.firstName} ${user.lastName}`.toLowerCase().includes(name.toLowerCase()) &&
        user.age >= this.ageFilter.minValue && user.age <= this.ageFilter.maxValue;
    });
  }

  filterByAge(event: {minValue: number, maxValue: number}) {
    this.ageFilter = event;
    this.users = this.cloneUsers.filter(user => {
      return user.age >= event.minValue && user.age <= event.maxValue &&
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(this.nameFilter.toLowerCase());
    });
  }

}
