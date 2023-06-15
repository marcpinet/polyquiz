import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
})
export class ThemesComponent {
  modals = [
    {
      num: 1,
      title: 'Ajouter un thème',
    },
  ];
  constructor(private router: Router) {}

  navigateAddTheme() {
    let dialog = document.getElementsByTagName('dialog')[this.modals[0].num];
    dialog.showModal();
  }
}
