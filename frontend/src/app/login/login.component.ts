import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    const user = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password,
    } as User;
    console.log(user);
    if (this.userService.userExists(user.userName)) {
      this.authService.login(user);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Mauvais identifiant',
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: '<span>Retour</span>', // add non-breaking spaces between span tags to create more space between buttons
      }).then((result) => {});
    }
  }
}
