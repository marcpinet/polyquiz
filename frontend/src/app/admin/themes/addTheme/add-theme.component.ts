import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/models/quiz.model';
import { ThemesService } from 'src/services/theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
})
export class AddThemeComponent {
  public theme: Theme;
  public themeForm: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private themeService: ThemesService,
    private router: Router
  ) {
    this.themeForm = this.formBuilder.group({
      themeName: ['', Validators.required],
      themeImage: ['', Validators.required],
    });
  }

  addTheme() {
    this.submitted = true;

    if (this.themeForm.invalid) {
      return;
    }

    const theme: Theme = {
      name: this.themeForm.value.themeName,
      image: this.themeForm.value.themeImage,
    };

    this.themeService.addTheme(theme).subscribe(
      () => {
        //Swal fire in 1.5s
        Swal.fire({
          icon: 'success',
          title: 'Thème ajouté',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Une erreur est survenue lors de l'ajout du thème",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
}
