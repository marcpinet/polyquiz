import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Quiz, Theme } from 'src/models/quiz.model';
import { ThemesService } from 'src/services/theme.service';
@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent {
  public theme: Theme | undefined;
  @Input()
  quiz: Quiz;

  constructor(private router: Router, private themeService: ThemesService) {
    this.quiz = {} as Quiz;
    this.themeService.setSelectedTheme(this.quiz.themeId);
    this.themeService.themeSelected$.subscribe(theme => {
      this.theme = theme;
    });
  }

  onClick(){
    this.router.navigate(['/game', this.quiz.id]);
  }



}
