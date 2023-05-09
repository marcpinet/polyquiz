import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Theme } from 'src/models/quiz.model';

@Component({
  selector: 'app-theme-admin',
  templateUrl: './theme-admin.component.html',
})
export class ThemeAdminComponent {
  @Input() theme: Theme;

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate(['/theme', this.theme.id]);
  }
}
