import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './admin/addResident/register.component';
import { GamePageComponent } from './gameComponents/game-page/game-page.component';
import { MainPage } from './mainpage/mainpage-main/mainpage.component';
import { UserOptionsScreenComponent } from './settings/user-options-screen.component';
import { ResultComponent } from './result/result.component';
import { UserProfileComponent } from './userProfile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouteGuardService } from 'src/services/route-guard.service';
import { LoggedInRouteGuardService } from 'src/services/loggedin-route-guard-service';
import { AdminMainPage } from './admin/admin_mainpage/admin-mainpage.component';
import { RouteGuardAdminService } from 'src/services/route-guard-admin.service';
import { StatsResidentComponent } from './admin/statsResident/stats-resident.component';
import { QuizzesAdminComponent } from './admin/quizzes/quizzes.component';
import { ThemesComponent } from './admin/themes/themes.component';
import { AddThemeComponent } from './admin/themes/addTheme/add-theme.component';
import { ModifyThemeComponent } from './admin/themes/modifTheme/modif-theme.component';
import { AddQuizComponent } from './admin/addQuiz/add-quiz.component';
import { ModifResidentComponent } from './admin/modifResident/modif-resident.component';
import { AdminNotificationComponent } from './admin/notification/notification.component';
const routes: Routes = [
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
    component: UserOptionsScreenComponent,
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
  {
    path: 'admin/stats-resident/:id',
    canActivate: [RouteGuardAdminService],
    component: StatsResidentComponent,
  },
  {
    path: 'admin/quiz',
    canActivate: [RouteGuardAdminService],
    component: QuizzesAdminComponent,
  },
  {
    path: 'admin/theme',
    canActivate: [RouteGuardAdminService],
    component: ThemesComponent,
  },
  {
    path: 'admin/theme/add',
    canActivate: [RouteGuardAdminService],
    component: AddThemeComponent,
  },
  {
    path: 'admin/theme/modif/:id',
    canActivate: [RouteGuardAdminService],
    component: ModifyThemeComponent,
  },
  {
    path: 'admin/quiz/add',
    canActivate: [RouteGuardAdminService],
    component: AddQuizComponent,
  },
  {
    path: 'admin/modif-resident/:id',
    canActivate: [RouteGuardAdminService],
    component: ModifResidentComponent,
  },
  {
    path: 'admin/notification/:id',
    canActivate: [RouteGuardAdminService],
    component: AdminNotificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
