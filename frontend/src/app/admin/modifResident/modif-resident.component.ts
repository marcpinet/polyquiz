import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resident } from 'src/models/resident.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { Settings } from 'src/models/settings.model';
import { SettingService } from 'src/services/settings.service';
import { InitSettings } from 'src/models/settings.model';

@Component({
  selector: 'app-modif-resident',
  templateUrl: './modif-resident.component.html',
})
export class ModifResidentComponent {
  public resident: Resident;
  public user: User;
  public settings: Settings;
  public initSettings: InitSettings;
  modals = [
    {
      num: 1,
      title: 'Modifier informations générales',
    },
    {
      num: 2,
      title: 'Modifier les symptômes',
    },
    {
      num: 3,
      title: 'Modifier les paramètres',
    },
  ];

  constructor(
    public router: Router,
    public userService: UserService,
    private route: ActivatedRoute,
    private settingService: SettingService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.resident = this.userService.getResidentById(parseInt(id));
    this.user = this.userService.getUserFromResident(this.resident);
    this.settingService
      .getSettingsOfUser(this.user.id)
      .subscribe((settings) => {
        this.settings = settings;
      });
    this.settingService
      .getInitSettingsOfUser(this.user.id)
      .subscribe((initSettings) => {
        this.initSettings = initSettings;
      });
  }
  modify(item: String) {
    let dialog;
    switch (item) {
      case 'GENERAL':
        console.log('GENERAL');
        break;
      case 'SYMPTOMS':
        console.log('SYMPTOMS');
        break;
      case 'SETTINGS':
        dialog = document.getElementsByTagName('dialog')[this.modals[2].num];
        break;
      default:
        return;
    }
    dialog.showModal();
  }
}
