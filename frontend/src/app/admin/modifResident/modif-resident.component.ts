import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resident } from 'src/models/resident.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { Settings } from 'src/models/settings.model';
import { SettingService } from 'src/services/settings.service';

@Component({
  selector: 'app-modif-resident',
  templateUrl: './modif-resident.component.html',
})
export class ModifResidentComponent {
  public resident: Resident;
  public user: User;
  public settings: Settings;

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
  }
  modify(item: String) {
    switch (item) {
      case 'GENERAL':
        console.log('GENERAL');
        return;
      case 'SYMPTOMS':
        console.log('SYMPTOMS');
        return;
      case 'SETTINGS':
        console.log('SETTINGS');
        return;
      default:
        return;
    }
  }
}
