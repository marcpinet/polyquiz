import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/services/notification.service';
import { Notification } from 'src/models/notification.model';
import { SettingService } from 'src/services/settings.service';
import { Settings } from 'src/models/settings.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
})
export class AdminNotificationComponent implements OnInit {
  notification: Notification;
  settings: Settings;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private settingService: SettingService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.notificationService
      .getNotificationById(parseInt(id))
      .subscribe((notification) => {
        this.notification = notification;
      });
    this.settingService
      .getSettingsOfUser(this.notification.sender_id)
      .subscribe((settings) => {
        this.settings = settings;
      });
  }
}
