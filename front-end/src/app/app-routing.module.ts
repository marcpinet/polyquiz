import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizDetailsComponent } from './quizlist/child/quiz-details.component';
import { QuizListComponent} from './quizlist/quizlist.component';

const routes: Routes = [{ path: 'quizlist', component: QuizListComponent},
                        { path: 'quizlist/child', component: QuizDetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
