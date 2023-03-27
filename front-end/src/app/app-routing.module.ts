import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizDetailsComponent } from './quiz/quiz-details/quiz-details.component';
import { QuizListComponent} from './quiz/quizlist/quizlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './temporaryRegister/register.component';
// import { GamePageComponent } from './gameComponents/game-page/game-page.component';
import { MainPage } from './mainpage/mainpage.component';
import { OptionsScreenComponent } from './settings/options-screen.component';
import { QuizCreateComponent } from './quiz/quiz-create/quiz-create.component';
import { ResultComponent } from './result/result.component';
import { UserProfileComponent } from './userProfile/user-profile.component';

const routes: Routes = [
  { path: 'quizlist', component: QuizListComponent },
 // { path: 'game/:quizId', component: GamePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tempo-register', component: RegisterComponent }, //only do this for the moment, to be implement only in admin's interface later
  {path: 'tempo-quiz-create', component: QuizCreateComponent},
  { path: '', component: MainPage },
  { path: 'settings', component: OptionsScreenComponent },
  { path: 'result', component: ResultComponent },
  { path: 'userProfile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
