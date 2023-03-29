import { Component } from '@angular/core';
import { QuizCarousel } from '../../quiz/quiz-carousel/quiz-carousel.component';
import { OptionsScreenComponent } from 'src/app/settings/options-screen.component';
import { MesResultatsComponent } from 'src/app/mesResultats/mes-resultat.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './mainpage.component.html'
})
export class MainPage{
  currentTab = 'QUIZ';

  components = {
    QUIZ: QuizCarousel,
    RESULTAT: MesResultatsComponent,
    PARAMETRES: OptionsScreenComponent
  };

  constructor(public router: Router) {}
  get selectedComponent() {
    return this.components[this.currentTab] || QuizCarousel;
  }

  loadTabComponent(tab: string) {
    this.currentTab = tab;
  }

  navigateProfile(){
    this.router.navigate(['/profile']);
  }

}
