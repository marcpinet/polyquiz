import { Component, ViewChild, ElementRef } from '@angular/core';
import { QuizCarousel } from '../../quiz/quiz-carousel/quiz-carousel.component';
import { OptionsScreenComponent } from 'src/app/settings/options-screen.component';
import { MesResultatsComponent } from 'src/app/mesResultats/mes-resultat.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './mainpage.component.html'
})
export class MainPage {
  currentTab = 'QUIZ';
  @ViewChild('resultBtn') resultBtn: ElementRef;

  ngAfterViewInit() {
    this.loadTabComponent('QUIZ');
  }

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
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach((button: any) => {
      button.style.backgroundColor = '#BAD7E9';
      button.style.color = '#2B3467';
    });
    // set the background and text color of the selected button
    const selectedButton = document.querySelector(`[data-tab=${tab}]`) as HTMLElement;
    if (selectedButton) {
      selectedButton.style.backgroundColor = '#2B3467';
    }
  }

  navigateProfile() {
    this.router.navigate(['/profile']);
  }
}