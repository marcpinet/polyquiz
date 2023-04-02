import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private authService: AuthService, formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  login() {
    const user = {
      userName : this.loginForm.value.userName,
      password : this.loginForm.value.password
    } as User;
    console.log(user)
    this.authService.login(user);
  }
}
