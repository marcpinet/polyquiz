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
import { QuizCarousel } from './quiz/quiz-carousel/quiz-carousel.component';
import { OptionsScreenComponent } from './settings/options-screen.component';
import { QuizCreateComponent } from './quiz/quiz-create/quiz-create.component';
import { MesResultatsComponent } from './mesResultats/mes-resultat.component';
import { UserProfileComponent } from './userProfile/user-profile.component';
import { QuizDetailsCarouselComponent } from './quiz/quiz-details-carousel/quiz-details-carousel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ThemeCarouselComponent } from './quiz/theme-carousel/theme-carousel.component';
import { HelpComponent } from './help/help.component';
import { AdminMainPage } from './admin/admin_mainpage/admin-mainpage.component';
import { GestionQuizComponent } from './admin/gestionQuiz/gestion-quiz.component';
import { ResidentComponent } from './admin/mesResidents/resident.component';
import { ResidentListTrComponent } from './admin/mesResidents/residentList/residentListTr/resident-list-tr.component';
import { ResidentListComponent } from './admin/mesResidents/residentList/resident-list.component';
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
    QuizCarousel,
    OptionsScreenComponent,
    QuizCreateComponent,
    MesResultatsComponent,
    ResultComponent,
    UserProfileComponent,
    QuizDetailsCarouselComponent,
    NavbarComponent,
    ThemeCarouselComponent,
    HelpComponent,
    AdminMainPage,
    GestionQuizComponent,
    ResidentComponent,
    ResidentListTrComponent,
    ResidentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    IvyCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
