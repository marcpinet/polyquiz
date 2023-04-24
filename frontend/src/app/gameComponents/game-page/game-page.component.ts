import { asNativeElements, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ResultService } from 'src/services/result.service';
import { Result } from 'src/models/result-quiz.model';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  quiz: Quiz;
  score = 0;
  compteur = 0;
  answerSelected = false;
  selectedAnswer: string;
  answerGood = false;
  startTime: Date;
  goodAnswer: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private resultService: ResultService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.quizService.quizSelected$.subscribe((quiz) => (this.quiz = quiz));
    console.log(this.quiz);
    this.startTime = new Date();
    console.log(this.score);
  }

  ngOnInit(): void {}

  updateGoodAnswer() {
    this.goodAnswer = this.quiz.questions[this.compteur].answers.find(
      (answer) => answer.isCorrect
    ).answer_text;
  }

  checkAnswer(answer: number) {
    this.answerSelected = true;
    this.selectedAnswer =
      this.quiz.questions[this.compteur].answers[answer].answer_text;
    this.answerGood =
      this.quiz.questions[this.compteur].answers[answer].isCorrect;
    this.updateGoodAnswer();
    this.nextQuestion();
  }

  updateScore() {
    if (this.answerGood) {
      this.score++;
    }
  }

  nextQuestion() {
    this.updateScore();
    console.log(this.score);
    this.answerSelected = false;
    this.selectedAnswer = '';
    this.answerGood = false;
    this.compteur++;
    if (this.isLastQuestion()) {
      this.endGame();
    }
  }

  isLastQuestion() {
    return (
      this.quiz !== undefined &&
      this.quiz.questions !== undefined &&
      this.compteur === this.quiz.questions.length
    );
  }

  endGame() {
    //add Result and get the id of the result and navigate to /result
    const result: Result = {
      id: this.resultService.resultId,
      quiz_id: this.quiz.id,
      date: new Date(),
      user_id: 1,
      right_answers: this.score,
      wrong_answers: this.quiz.questions.length - this.score,
      play_time: this.getElapsedTimeInSeconds(),
      time_per_question:
        this.getElapsedTimeInSeconds() / this.quiz.questions.length,
    };

    this.resultService.addResult(result).subscribe((result) => {
      this.router.navigate(['/result', result.id]);
    });
    console.log('End of the game');
  }

  getElapsedTimeInSeconds(): number {
    const currentTime = new Date();
    const elapsedSeconds =
      (currentTime.getTime() - this.startTime.getTime()) / 1000;
    return Math.floor(elapsedSeconds);
  }
}
