import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { Resident } from 'src/models/resident.model';
import { UserService } from 'src/services/user.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { Quiz } from 'src/models/quiz.model';
import { Result } from 'src/models/result-quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ResultService } from 'src/services/result.service';

@Component({
  selector: 'app-mes-stats-residents',
  templateUrl: './stats-resident.component.html',
})
export class StatsResidentComponent {
  private newLabel? = 'New label';
  resident: Resident;
  user: User;
  symptomes: string[];
  playedQuizzes: Map<Quiz, Result[]> = new Map<Quiz, Result[]>();
  timePerQuestionData = [];
  wrongClicksData = [];
  playedQuizzesData = [];
  playedQuizzesTotal: number = 0;
  wrongClicksTotal: number = 0;
  wrongClicksPerQuestion: number = 0;
  totalQuestionWithConfirmation: number = 0;
  constructor(
    public router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private resultService: ResultService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.resident = this.userService.getResidentById(parseInt(id));
    this.symptomes = this.resident.symptome;
    this.user = this.userService.getUserFromResident(this.resident);
    Chart.register(Annotation);
    this.resultService.getResultsByUser(this.user).subscribe((results) => {
      let quizIds = new Set<string>();

      for (let result of results) {
        quizIds.add(result.quiz_id);
      }

      let quizIdsArray = Array.from(quizIds);

      for (let quizId of quizIdsArray) {
        this.quizService.getQuizById(quizId).subscribe((quiz) => {
          let totalTime = 0;
          let quizResults = results.filter(
            (result) => result.quiz_id === quizId
          );
          this.playedQuizzes.set(quiz, quizResults);
          this.playedQuizzesTotal += quizResults.length;
          let i = 0;
          for (let result of quizResults) {
            totalTime += result.time_per_question;
            if (result.click_error != -1) {
              //if activates confirmer avant valider
              this.wrongClicksTotal += result.click_error;
              this.totalQuestionWithConfirmation +=
                result.right_answers + result.wrong_answers;
            }
            this.wrongClicksPerQuestion = Number(
              (
                this.wrongClicksTotal / this.totalQuestionWithConfirmation
              ).toFixed(2)
            );
            i++;
          }
          this.playedQuizzesData.push(quizResults.length);
          this.timePerQuestionData.push(totalTime / i);
        });
      }

      const { dateLabels, quizzesPlayed, timePerQuestion, clickErrors } =
        this.generateStats(results);
      this.lineChartData.labels = dateLabels;
      this.lineChartData.datasets[0].data = timePerQuestion;
      this.lineChartData.datasets[1].data = clickErrors;
      this.lineChartData.datasets[2].data = quizzesPlayed;

      if (this.chart) {
        this.chart.update();
      }
    });
  }

  navigateModifyUser() {}

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Temps par question',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Clics erronés',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Nombre de quiz joués',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
    },
  };

  generateStats(results: Result[]): {
    dateLabels: string[];
    quizzesPlayed: number[];
    timePerQuestion: number[];
    clickErrors: number[];
  } {
    const dateLabels: string[] = [];
    const quizzesPlayed: number[] = [];
    const clickErrors: number[] = [];
    const timePerQuestion: number[] = [];
    const allQuestionTime = [];
    const quizCountByMonth: { [key: string]: number } = {};

    const sortedResults = results.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const firstDate = new Date(sortedResults[0].date);
    const lastDate = new Date(sortedResults[sortedResults.length - 1].date);

    let currentDate = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth(),
      1
    );

    while (currentDate <= lastDate) {
      const monthYearLabel = `${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`;

      if (!quizCountByMonth[monthYearLabel]) {
        quizCountByMonth[monthYearLabel] = 0;
      }

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    let t = -1;

    for (const result of results) {
      const date = new Date(result.date);
      const monthYearLabel = `${date.getMonth() + 1}/${date.getFullYear()}`;

      // For allQuestionTime, each array inside this array corresponds to a month
      if (!allQuestionTime[monthYearLabel]) {
        allQuestionTime[monthYearLabel] = [];
        if (t !== -1) clickErrors.push(t);
        t = 0;
      }

      allQuestionTime[monthYearLabel].push(result.time_per_question);

      quizCountByMonth[monthYearLabel]++;

      if (result.click_error > 0) t += result.click_error;
    }
    clickErrors.push(t);

    for (const [monthYearLabel, count] of Object.entries(quizCountByMonth)) {
      dateLabels.push(monthYearLabel);
      quizzesPlayed.push(count);
    }

    for (const [monthYearLabel, times] of Object.entries(allQuestionTime)) {
      timePerQuestion.push(this.med(times));
    }

    return { dateLabels, quizzesPlayed, timePerQuestion, clickErrors };
  }

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  med(array: any[]) {
    if (array.length === 0) {
      return 0;
    }
    let sum = 0;
    for (const element of array) {
      sum += element;
    }

    return Number((sum / array.length).toFixed(2));
  }
}
