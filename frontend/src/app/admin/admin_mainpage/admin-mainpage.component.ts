import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
import { QuizListComponent } from 'src/app/quiz/quizlist/quizlist.component';
import { GestionQuizComponent } from '../gestionQuiz/gestion-quiz.component';
import { ResidentComponent } from '../mesResidents/resident.component';
import { Notification } from 'src/models/notification.model';
import { NotificationService } from 'src/services/notification.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-mainpage.component.html',
})
export class AdminMainPage {
  user: User;
  notifications: Map<User, Notification> = new Map<User, Notification>();

  currentTab = 'RESIDENT';
  @ViewChild('resultBtn') resultBtn: ElementRef;
  showNotifications = false;
  components = {
    GESTION_QUIZ: GestionQuizComponent,
    RESIDENT: ResidentComponent,
  };

  constructor(
    public router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private userService: UserService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.notificationService
      .getNotificationsOfUser(this.user.id)
      .subscribe((notifications) => {
        const notif = notifications;
        for (const element of notif) {
          let notification = element;
          let user = this.userService.getUserById(notification.sender_id);

          //only get one notif per resident, with the lastest time
          let existingUser = Array.from(this.notifications.keys()).find(
            (key) => key.id === user.id
          );

          if (existingUser) {
            let existingNotification = this.notifications.get(existingUser);
            existingNotification.message = notification.message;
            existingNotification.date = notification.date;
          } else {
            this.notifications.set(user, notification);
          }
        }
        console.log(this.notifications);
      });
  }

  get selectedComponent() {
    return this.components[this.currentTab] || QuizListComponent;
  }

  ngAfterViewInit() {
    this.loadTabComponent('RESIDENT');
  }

  loadTabComponent(tab: string) {
    this.currentTab = tab;
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach((button: any) => {
      button.style.backgroundColor = '#BAD7E9';
      button.style.color = '#2B3467';
    });
    // set the background and text color of the selected button
    const selectedButton = document.querySelector(
      `[data-tab=${tab}]`
    ) as HTMLElement;
    if (selectedButton) {
      selectedButton.style.backgroundColor = '#2B3467';
    }
  }

  navigateProfile() {
    this.router.navigate(['/profile']);
  }

  helpPopup() {
    let dialog = document.getElementsByTagName('dialog')[0];
    dialog.showModal();
  }

  switchNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
