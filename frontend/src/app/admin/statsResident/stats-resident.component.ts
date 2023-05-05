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
      // Create a set of unique quiz IDs played by the user
      let quizIds = new Set<string>();
      for (let i = 0; i < results.length; i++) {
        let result = results[i];
        quizIds.add(result.quiz_id);
      }

      // For each unique quiz ID, fetch the quiz object and results associated with it
      let quizIdsArray = Array.from(quizIds);
      for (let i = 0; i < quizIdsArray.length; i++) {
        let quizId = quizIdsArray[i];
        this.quizService.getQuizById(quizId).subscribe((quiz) => {
          let quizResults = results.filter(
            (result) => result.quiz_id === quizId
          );
          this.playedQuizzes.set(quiz, quizResults);
        });
      }
    });
  }

  navigateModifyUser() {}

  //TODO: Replace this data with real data later
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
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
        data: [28, 48, 40, 19, 86, 27, 90],
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
        data: [180, 480, 770, 90, 1000, 270, 400],
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
    labels: [
      '11/2022',
      '12/2022',
      '01/2023',
      '02/2023',
      '03/2023',
      '04/2023',
      '05/2023',
    ],
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
}
