import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/services/notification.service';
import { Notification } from 'src/models/notification.model';
import { SettingService } from 'src/services/settings.service';
import { Settings } from 'src/models/settings.model';
import { InitSettings } from 'src/models/settings.model';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
})
export class AdminNotificationComponent implements OnInit {
  settings: Settings;
  initSettings: InitSettings;

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
        this.settingService
          .getSettingsOfUser(notification.sender_id)
          .subscribe((settings) => {
            this.settings = settings;
          });
        this.settingService
          .getInitSettingsOfUser(notification.sender_id)
          .subscribe((initSettings) => {
            this.initSettings = initSettings;
          });
      });
  }
}
