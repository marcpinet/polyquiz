import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { User } from 'src/models/user.model';
import Swal from 'sweetalert2';
import { UserService } from 'src/services/user.service';
import { Resident } from 'src/models/resident.model';

@Component({
  selector: 'app-modif-general',
  templateUrl: './modif-general.component.html',
})
export class AdminModifGeneralComponent implements OnInit {
  @Input() user: User;
  @Input() resident: Resident;
  public generalForm: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.generalForm = this.formBuilder.group({
      avatar: [this.user?.avatar || ''],
      firstName: [this.user?.firstName || '', Validators.required],
      lastName: [this.user?.lastName || '', Validators.required],
      userName: [this.user?.userName || '', Validators.required],
      sexe: [this.resident?.sexe || '', Validators.required],
      dateOfBirth: [this.resident?.dateOfBirth || '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.repatchValue();
  }

  repatchValue() {
    this.generalForm.patchValue({
      avatar: this.user?.avatar || '',
      firstName: this.user?.firstName || '',
      lastName: this.user?.lastName || '',
      userName: this.user?.userName || '',
      sexe: this.resident?.sexe || '',
      dateOfBirth: this.resident?.dateOfBirth || '',
    });
  }

  updateProfile() {
    this.submitted = true;
    if (this.generalForm.invalid) {
      return;
    }
    this.user.avatar = this.generalForm.value.avatar;
    this.user.firstName = this.generalForm.value.firstName;
    this.user.lastName = this.generalForm.value.lastName;
    this.user.userName = this.generalForm.value.userName;
    this.resident.sexe = this.generalForm.value.sexe;
    this.resident.dateOfBirth = this.generalForm.value.dateOfBirth;
    this.userService.updateUser(this.user).subscribe((user) => {
      this.userService.updateResident(this.resident).subscribe((resident) => {
        Swal.fire({
          title: 'Profil modifié',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        this.repatchValue();
        let dialog = document.getElementsByTagName('dialog');
        if (dialog) {
          for (let i = 0; i < dialog.length; i++) {
            dialog[i].close();
          }
        }
      });
    });
  }
}
