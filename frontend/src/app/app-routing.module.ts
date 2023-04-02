import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizDetailsComponent } from './quiz/quiz-details/quiz-details.component';
import { QuizListComponent } from './quiz/quizlist/quizlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './temporaryRegister/register.component';
import { GamePageComponent } from './gameComponents/game-page/game-page.component';
import { MainPage } from './mainpage/mainpage-main/mainpage.component';
import { OptionsScreenComponent } from './settings/options-screen.component';
import { QuizCreateComponent } from './quiz/quiz-create/quiz-create.component';
import { ResultComponent } from './result/result.component';
import { UserProfileComponent } from './userProfile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouteGuardService } from 'src/services/route-guard.service';
const routes: Routes = [
  { path: 'quizlist',canActivate: [RouteGuardService], component: QuizListComponent },
  { path: 'game/:id',canActivate: [RouteGuardService], component: GamePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tempo-register', component: RegisterComponent }, //only do this for the moment, to be implement only in admin's interface later
  { path: 'tempo-quiz-create', component: QuizCreateComponent },
  { path: '', component: MainPage },
  { path: 'settings',canActivate: [RouteGuardService], component: OptionsScreenComponent },
  { path: 'result/:id',canActivate: [RouteGuardService], component: ResultComponent },
  { path: 'profile',canActivate: [RouteGuardService], component: UserProfileComponent },
  { path: 'navbar',canActivate: [RouteGuardService], component: NavbarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
