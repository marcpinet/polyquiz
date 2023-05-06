import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/models/quiz.model';
import { ThemesService } from 'src/services/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
})
export class ThemeListComponent {
  public themeList: Theme[] = [];

  constructor(public router: Router, public themeService: ThemesService) {
    this.themeService.themes$.subscribe((themes) => {
      this.themeList = themes;
    });
  }

  navigateThemeModif(themeId: number) {
    this.router.navigate(['/admin/theme/modif/' + themeId]);
  }
}
