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
  selector: 'app-modif-symptome',
  templateUrl: './modif-symptome.component.html',
})
export class AdminModifSymptomeComponent implements OnInit {
  @Input() resident: Resident;
  public symptomeForm: FormGroup;
  public submitted = false;
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
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.symptomeForm = this.formBuilder.group({
      symptome: this.formBuilder.array(
        this.resident?.symptome || [],
        Validators.required
      ),
    });
  }

  ngOnInit(): void {
    this.repatchValue();
  }

  repatchValue() {
    const residentSymptoms = this.resident?.symptome || [];
    this.symptomes.forEach((symptom) => {
      symptom.checked = residentSymptoms.includes(symptom.value);
    });
    const symptomeArray = this.symptomes
      .filter((symptome) => symptome.checked)
      .map((symptome) => symptome.value);
    this.symptomeForm.setControl(
      'symptome',
      this.formBuilder.array(symptomeArray, Validators.required)
    );
  }

  changeState(id: number) {
    this.symptomes[id].checked = !this.symptomes[id].checked;
    const symptomeArray = this.symptomes
      .filter((symptome) => symptome.checked)
      .map((symptome) => symptome.value);
    this.symptomeForm.setControl(
      'symptome',
      this.formBuilder.array(symptomeArray)
    );
  }

  updateProfile() {
    this.submitted = true;
    if (this.symptomeForm.invalid) {
      return;
    }
    const symptomeArray = this.symptomes
      .filter((symptome) => symptome.checked)
      .map((symptome) => symptome.value);
    this.resident.symptome = symptomeArray;
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
  }
}
