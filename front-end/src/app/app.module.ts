import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuizDetailsComponent } from './quizlist/quiz-details/quiz-details.component';
import { QuizListComponent } from './quizlist/quizlist.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './temporaryRegister/register.component';
import { GamePageComponent } from './gameComponents/game-page/game-page.component';
import { GameQuestionComponent } from './gameComponents/game-question/game-question.component';
import { GameAnswerComponent } from './gameComponents/game-answer/game-answer.component';
@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizDetailsComponent,
    GamePageComponent,
    GameQuestionComponent,
    GameAnswerComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
