import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuizDetailsComponent } from './quizlist/child/child.component';
import { QuizListComponent } from './quizlist/quizlist.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
