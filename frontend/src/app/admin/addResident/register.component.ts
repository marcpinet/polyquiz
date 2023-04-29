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
  symptomes = [
    {
      name: 'Le tremblement de repos',
      value: 'tremblement',
      id: 0,
      checked: false,
    },
    { name: 'Akinésie', value: 'akinesie', id: 1, checked: false },
    { name: 'Rigidité', value: 'rigidite', id: 2, checked: false },
    { name: 'Autres', value: 'autres', id: 3, checked: false },
  ];
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.residentForm = this.formBuilder.group({
      residentNum: ['', Validators.required],
      sexe: [[], Validators.required],
      symptome: this.formBuilder.array([], Validators.required),
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
    const symptomeArray = this.symptomes
      .filter((symptome) => symptome.checked)
      .map((symptome) => symptome.value);

    const resident: Resident = {
      userId: Date.now(),
      id: this.residentForm.value.residentNum,
      sexe: this.residentForm.value.sexe,
      symptome: symptomeArray,
      dateOfBirth: this.residentForm.value.dateOfBirth,
    };
    const user: User = {
      id: resident.userId,
      userName: this.residentForm.value.userName,
      firstName: this.residentForm.value.firstName,
      lastName: this.residentForm.value.lastName,
      password: this.residentForm.value.password,
      userType: 'patient',
      avatar: '../../assets/images/defaultAvatar.png',
    };
    const avatarFile = this.residentForm.value.avatar;
    if (avatarFile) {
      user.avatar = avatarFile;
    }
    console.log(user);
    console.log(resident);
    this.userService.createResident(resident, user);
  }
  changeState(id: number) {
    this.symptomes[id].checked = !this.symptomes[id].checked;
    const symptomeArray = this.symptomes
      .filter((symptome) => symptome.checked)
      .map((symptome) => symptome.value);
    this.residentForm.setControl(
      'symptome',
      this.formBuilder.array(symptomeArray)
    );
  }
}
