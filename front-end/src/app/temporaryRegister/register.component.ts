import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { Resident } from 'src/models/resident.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public residentForm: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.residentForm = this.formBuilder.group({
      residentNum: ['', Validators.required],
      genre: [[], Validators.required],
      symptome: this.formBuilder.array([], Validators.required), //TODO
      dateOfBirth: ['', Validators.required],
      firstName: ['', [Validators.maxLength(20), Validators.required]],
      lastName: ['', [Validators.maxLength(20), Validators.required]],
      userName: ['', [Validators.maxLength(20), Validators.required]],
      password: [
        '',
        [
          Validators.maxLength(20),
          Validators.minLength(5),
          Validators.required,
        ],
      ],
      userType: 'patient',
      avatar: [''],
    });
  }

  ngOnInit() {}

  addResident() {
    const resident: Resident = {
      userId: Date.now(),
      residentNum: this.residentForm.value.residentNum,
      genre: this.residentForm.value.genre,
      symptome: this.residentForm.value.symptome, //TODO
      dateOfBirth: this.residentForm.value.dateOfBirth,
    };
    const user: User = {
      userId: resident.userId,
      userName: this.residentForm.value.userName,
      firstName: this.residentForm.value.firstName,
      lastName: this.residentForm.value.lastName,
      password: this.residentForm.value.password,
      userType: 'patient',
      avatar: null,
    };
    const avatarFile = this.residentForm.value.avatar;
    if (avatarFile) {
      user.avatar = avatarFile;
    }
    console.log(user);
    console.log(resident);
    this.userService.createResident(resident, user);
  }
}
