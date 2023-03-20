import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuizDetailsComponent } from './quizlist/child/quiz-details.component';
import { QuizListComponent } from './quizlist/quizlist.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainPage } from './mainpage/mainpage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './temporaryRegister/register.component';
@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizDetailsComponent,
    LoginComponent,
    RegisterComponent,
    MainPage
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
