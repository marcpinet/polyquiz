import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/models/quiz.model';
@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
})
export class ThemesComponent {
  @Output() modifyTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  modals = [
    {
      num: 1,
      title: 'Ajouter un thème',
    },
    {
      num: 2,
      title: 'Modifier un thème',
    },
  ];
  constructor(private router: Router) {}

  navigateAddTheme() {
    let dialog = document.getElementsByTagName('dialog')[this.modals[0].num];
    dialog.showModal();
  }

  handleModifyTheme(theme: Theme) {
    console.log(theme);
    this.modifyTheme.emit(theme);
    let dialog = document.getElementsByTagName('dialog')[this.modals[1].num];
    dialog.showModal();
  }
}
