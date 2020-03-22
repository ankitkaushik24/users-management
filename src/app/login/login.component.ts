import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'aptm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm() {
    return this.fb.group({
      accountId: [null, Validators.required],
      pswd: [null, Validators.required]
    });
  }

  login() {
    this.authService.loginUser(this.loginForm.value).subscribe(token => {
      sessionStorage.setItem('userToken', token);
      this.router.navigate([this.authService.urlRedirect]);
    });
  }

}
