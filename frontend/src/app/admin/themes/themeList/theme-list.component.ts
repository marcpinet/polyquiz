import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/models/quiz.model';
import { ThemesService } from 'src/services/theme.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
})
export class ThemeListComponent {
  @Output() modifyTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  public themeList: Theme[] = [];

  constructor(public router: Router, public themeService: ThemesService) {
    this.themeService.themes$.subscribe((themes) => {
      this.themeList = themes;
    });
  }

  navigateThemeModif(theme: Theme) {
    this.modifyTheme.emit(theme);
  }

  deleteTheme(theme: Theme) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce thème ?',
      text: 'Cette action est irréversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Non, annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.themeService.deleteTheme(theme);
      }
    });
  }
}
