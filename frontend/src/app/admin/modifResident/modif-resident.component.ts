import { Component, OnInit } from '@angular/core';
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
export class ModifResidentComponent implements OnInit {
  public resident: Resident;
  public user: User;
  public settings: Settings;
  public initSettings: InitSettings;
  modals = [
    {
      num: 1,
      title: 'Modifier informations générales du résident ',
    },
    {
      num: 2,
      title: 'Modifier les symptômes du résident ',
    },
    {
      num: 3,
      title: 'Modifier les paramètres du résident ',
    },
    {
      num: 4,
      title: 'Modifier le mot de passe du résident ',
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

  ngOnInit(): void {
    for (let i = 0; i < this.modals.length; i++) {
      this.modals[i].title += this.user.firstName + ' ' + this.user.lastName;
    }
  }

  modify(item: String) {
    let dialog;
    switch (item) {
      case 'GENERAL':
        dialog = document.getElementsByTagName('dialog')[this.modals[0].num];
        break;
      case 'SYMPTOMS':
        dialog = document.getElementsByTagName('dialog')[this.modals[1].num];
        break;
      case 'SETTINGS':
        dialog = document.getElementsByTagName('dialog')[this.modals[2].num];
        break;
      case 'PASSWORD':
        dialog = document.getElementsByTagName('dialog')[this.modals[3].num];
        break;
      default:
        return;
    }
    dialog.showModal();
  }
}
