import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { QuizDetailsComponent } from './quiz/quiz-details/quiz-details.component';
import { QuizListComponent } from './quiz/quizlist/quizlist.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPage } from './mainpage/mainpage-main/mainpage.component';
import { ResultComponent } from './result/result.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './admin/addResident/register.component';
import { GamePageComponent } from './gameComponents/game-page/game-page.component';
import { GameQuestionComponent } from './gameComponents/game-question/game-question.component';
import { GameAnswerComponent } from './gameComponents/game-answer/game-answer.component';
import { OptionsScreenComponent } from './settings/settings_component/options-screen.component';
import { MesResultatsComponent } from './mesResultats/mes-resultat.component';
import { UserProfileComponent } from './userProfile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ThemeAdminComponent } from './admin/themes/theme-admin/theme-admin.component';
import { AdminMainPage } from './admin/admin_mainpage/admin-mainpage.component';
import { GestionQuizComponent } from './admin/gestionQuiz/gestion-quiz.component';
import { ResidentComponent } from './admin/mesResidents/resident.component';
import { ResidentListComponent } from './admin/mesResidents/residentList/resident-list.component';
import { StatsResidentComponent } from './admin/statsResident/stats-resident.component';
import { NgChartsModule } from 'ng2-charts';
import { PlayedQuizComponent } from './playedQuiz/played-quiz.component';
import { QuizDetailsStatsComponent } from './quiz/quiz-details-stats/quiz-details-stats.component';
import { QuizzesAdminComponent } from './admin/quizzes/quizzes.component';
import { ThemesComponent } from './admin/themes/themes.component';
import { ThemeListComponent } from './admin/themes/themeList/theme-list.component';
import { AddThemeComponent } from './admin/themes/addTheme/add-theme.component';
import { ModifyThemeComponent } from './admin/themes/modifTheme/modif-theme.component';
import { QuizListAdminComponent } from './admin/quizzes/quizList/quiz-list.component';
import { QuizCreateComponent } from './admin/addQuiz/quiz-create/quiz-create.component';
import { QuestionCreateComponent } from './admin/addQuiz/question-create/question-create.component';
import { AddQuizComponent } from './admin/addQuiz/add-quiz.component';
import { PlayedQuizAdminComponent } from './admin/statsResident/playedQuizAdmin/played-quiz-admin.component';
import { ModifResidentComponent } from './admin/modifResident/modif-resident.component';
import { IntlModule } from 'angular-ecmascript-intl';
import { INTL_LOCALES } from 'angular-ecmascript-intl';
import { AdminNavbarComponent } from './admin/navbar/navbar-admin.component';
import { HelpModalComponent } from './modals/help-modal/help-modal.component';
import { AdminNotificationComponent } from './admin/notification/notification.component';
import { UserOptionsScreenComponent } from './settings/user-options-screen.component';
import { QuizRecommendComponent } from './quiz/quiz-recommend/quiz-recommend.component';
import { SettingsModalComponent } from './modals/settings-modal/settings-modal.component';
import { AdminProfileComponent } from './admin/profile/admin-profile.component';
import { AdminPasswordChangeComponent } from './admin/profile/password-change/password-change.component';
import { AdminProfileUpdateComponent } from './admin/profile/profile-update/profile-update.component';
import { AdminAbstractModal } from './admin/modals/admin-abtract-modal/admin-abstract-modal.component';
import { AdminModifGeneralComponent } from './admin/modifResident/modif-general/modif-general.component';
import { AdminModifSymptomeComponent } from './admin/modifResident/modif-symptomes/modif-symptome.component';
import { AdminModifPasswordComponent } from './admin/modifResident/modif-password/modif-password.component';
@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizDetailsComponent,
    GamePageComponent,
    GameQuestionComponent,
    GameAnswerComponent,
    LoginComponent,
    RegisterComponent,
    MainPage,
    OptionsScreenComponent,
    MesResultatsComponent,
    ResultComponent,
    UserProfileComponent,
    NavbarComponent,
    ThemeAdminComponent,
    AdminMainPage,
    GestionQuizComponent,
    ResidentComponent,
    ResidentListComponent,
    StatsResidentComponent,
    PlayedQuizComponent,
    QuizDetailsStatsComponent,
    QuizzesAdminComponent,
    ThemesComponent,
    ThemeListComponent,
    AddThemeComponent,
    ModifyThemeComponent,
    QuizListAdminComponent,
    QuizCreateComponent,
    QuestionCreateComponent,
    AddQuizComponent,
    PlayedQuizAdminComponent,
    ModifResidentComponent,
    AdminNavbarComponent,
    HelpModalComponent,
    AdminNotificationComponent,
    UserOptionsScreenComponent,
    QuizRecommendComponent,
    SettingsModalComponent,
    AdminProfileComponent,
    AdminPasswordChangeComponent,
    AdminProfileUpdateComponent,
    AdminAbstractModal,
    AdminModifGeneralComponent,
    AdminModifSymptomeComponent,
    AdminModifPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    IvyCarouselModule,
    NgChartsModule,
    IntlModule,
  ],
  providers: [
    {
      provide: INTL_LOCALES,
      useValue: 'fr-FR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
