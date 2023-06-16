import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/models/quiz.model';
import { ThemesService } from 'src/services/theme.service';

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
}
