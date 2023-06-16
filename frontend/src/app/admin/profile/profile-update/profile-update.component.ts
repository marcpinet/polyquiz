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
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
})
export class AdminProfileUpdateComponent {
  public user: User;
  public profileForm: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: [this.user?.firstName || '', Validators.required],
      lastName: [this.user?.lastName || '', Validators.required],
      userName: [this.user?.userName || '', Validators.required],
    });

    this.authService.user$.subscribe((user) => {
      this.user = user;
      // Update the form values when the user data changes
      this.repatchValue();
    });
  }

  repatchValue() {
    this.profileForm.patchValue({
      firstName: this.user?.firstName || '',
      lastName: this.user?.lastName || '',
      userName: this.user?.userName || '',
    });
  }

  updateProfile() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    this.user.firstName = this.profileForm.value.firstName;
    this.user.lastName = this.profileForm.value.lastName;
    this.user.userName = this.profileForm.value.userName;
    this.userService.updateUser(this.user).subscribe((user) => {
      Swal.fire({
        title: 'Profil modifié',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      this.repatchValue();
      let dialog = document.getElementsByTagName('dialog')[2];
      dialog.close();
    });
  }
}
