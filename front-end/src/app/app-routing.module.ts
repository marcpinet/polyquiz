import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizDetailsComponent } from './quizlist/child/quiz-details.component';
import { QuizListComponent} from './quizlist/quizlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './temporaryRegister/register.component';

const routes: Routes = [
  {path: 'quizlist', component: QuizListComponent},
  {path: 'quizlist/child', component: QuizDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'tempo-register', component: RegisterComponent}, //only do this for the moment, to be implement only in admin's interface later
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
