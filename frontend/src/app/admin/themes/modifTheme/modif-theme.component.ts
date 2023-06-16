import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/models/quiz.model';
import { ThemesService } from 'src/services/theme.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modif-theme',
  templateUrl: './modif-theme.component.html',
})
export class ModifyThemeComponent implements OnInit, OnChanges {
  @Input() theme: Theme;
  public themeForm: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private themeService: ThemesService
  ) {
    this.themeForm = this.formBuilder.group({
      name: [this.theme?.name || '', Validators.required],
      image: [this.theme?.image || '', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.theme);
    this.repatchValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theme'] && !changes['theme'].isFirstChange()) {
      this.repatchValue();
    }
  }

  repatchValue() {
    this.themeForm.patchValue({
      name: this.theme?.name || '',
      image: this.theme?.image || '',
    });
  }

  updateTheme() {
    this.submitted = true;
    if (this.themeForm.invalid) {
      return;
    }
    this.theme.name = this.themeForm.value.name;
    this.theme.image = this.themeForm.value.image;
    this.themeService.updateTheme(this.theme).subscribe((theme) => {
      Swal.fire({
        title: 'Thème modifié',
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
