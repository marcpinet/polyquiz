import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { Resident } from 'src/models/resident.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public residentForm: FormGroup;
  symptomes = [
    {
      name: 'Le tremblement de repos',
      value: 'Tremblement de repos',
      id: 0,
      checked: false,
    },
    { name: 'Akinésie', value: 'Akinésie', id: 1, checked: false },
    { name: 'Rigidité', value: 'Rigidité', id: 2, checked: false },
    { name: 'Autres', value: 'Autres', id: 3, checked: false },
  ];
  public submitted = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.residentForm = this.formBuilder.group({
      sexe: [[], Validators.required],
      symptome: this.formBuilder.array([], Validators.required),
      dateOfBirth: ['', Validators.required],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.minLength(5), this.validatePasswordLength]],
      confirmPassword: [
        '',
        [Validators.minLength(5), this.passwordMatchValidator],
      ],
      userType: 'patient',
      avatar: [''],
    });
  }

  addResident() {
    this.submitted = true;

    const symptomeArray = this.symptomes
      .filter((symptome) => symptome.checked)
      .map((symptome) => symptome.value);

    const resident: Resident = {
      sexe: this.residentForm.value.sexe,
      symptome: symptomeArray,
      dateOfBirth: this.residentForm.value.dateOfBirth,
    };
    const user: User = {
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

  public validatePasswordLength(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.value;
    if (password && password.length < 5) {
      return { passwordLength: true };
    }
    return null;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password')?.value;
    const confirmPassword = control.value;
    if (password !== confirmPassword) {
      return { passwordMatch: true };
    }
    return null;
  }
}
