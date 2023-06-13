import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
})
export class AdminPasswordChangeComponent {
  public user: User;
  public passwordForm: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  updatePassword() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    this.userService
      .updatePassword(
        this.user.id,
        this.passwordForm.value.oldPassword,
        this.passwordForm.value.newPassword
      )
      .subscribe(
        (user) => {
          Swal.fire({
            title: 'Mot de passe modifié',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.passwordForm.reset();
          let dialog = document.getElementsByTagName('dialog')[1];
          dialog.close();
        },
        (error) => {
          console.log('Wrong password');
          this.passwordForm.setErrors({ wrongPassword: true });
        }
      );
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }
}
