import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/models/quiz.model';
import { ThemesService } from 'src/services/theme.service';

@Component({
  selector: 'app-modif-theme',
  templateUrl: './modif-theme.component.html',
})
export class ModifyThemeComponent {
  @Input() theme: Theme;
}
