import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizDetailsComponent } from './quiz/quiz-details/quiz-details.component';
import { QuizListComponent } from './quiz/quizlist/quizlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './admin/addResident/register.component';
import { GamePageComponent } from './gameComponents/game-page/game-page.component';
import { MainPage } from './mainpage/mainpage-main/mainpage.component';
import { OptionsScreenComponent } from './settings/options-screen.component';
import { QuizCreateComponent } from './quiz/quiz-create/quiz-create.component';
import { ResultComponent } from './result/result.component';
import { UserProfileComponent } from './userProfile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouteGuardService } from 'src/services/route-guard.service';
import { LoggedInRouteGuardService } from 'src/services/loggedin-route-guard-service';
import { HelpComponent } from './help/help.component';
import { AdminMainPage } from './admin/admin_mainpage/admin-mainpage.component';
import { RouteGuardAdminService } from 'src/services/route-guard-admin.service';
const routes: Routes = [
  {
    path: 'quizlist',
    canActivate: [RouteGuardService],
    component: QuizListComponent,
  },
  {
    path: 'game/:id',
    canActivate: [RouteGuardService],
    component: GamePageComponent,
  },
  {
    path: 'login',
    canActivate: [LoggedInRouteGuardService],
    component: LoginComponent,
  },
  { path: '', canActivate: [RouteGuardService], component: MainPage },
  {
    path: 'settings',
    canActivate: [RouteGuardService],
    component: OptionsScreenComponent,
  },
  {
    path: 'result/:id',
    canActivate: [RouteGuardService],
    component: ResultComponent,
  },
  {
    path: 'profile',
    canActivate: [RouteGuardService],
    component: UserProfileComponent,
  },
  {
    path: 'navbar',
    canActivate: [RouteGuardService],
    component: NavbarComponent,
  },
  { path: 'help', canActivate: [RouteGuardService], component: HelpComponent },

  //temporary routes for testing

  { path: 'tempo-quiz-create', component: QuizCreateComponent },

  //admin routes
  {
    path: 'admin',
    canActivate: [RouteGuardAdminService],
    component: AdminMainPage,
  },
  {
    path: 'admin/add-resident',
    canActivate: [RouteGuardAdminService],
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
