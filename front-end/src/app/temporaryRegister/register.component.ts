import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { Resident } from 'src/models/resident.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public residentForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.maxLength(20), Validators.required]],
    lastName: ['', [Validators.maxLength(20), Validators.required]],
    password: ['', [Validators.maxLength(20), Validators.minLength(5), Validators.required]],
    userType: 'patient',
    avatar: ['']
  });
  // assistanceArray = [
  //   {name: 'Visuelle', value: 'visuelle', id: 0, checked: false},
  //   {name: 'Motrice', value: 'motrice', id: 1, checked: false}
  // ];
  constructor(private userService: UserService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {
  }

  addResident(){
    let resident: Resident = this.residentForm.getRawValue() as Resident;
    let user : User = this.residentForm.getRawValue() as User;
    user.userId= Date.now();
    resident.userId = user.userId;
    

  }


}
