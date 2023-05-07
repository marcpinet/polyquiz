import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
})
export class ThemesComponent {
  constructor(private router: Router) {}

  navigateAddTheme() {
    this.router.navigate(['/admin/theme/add']);
  }
}