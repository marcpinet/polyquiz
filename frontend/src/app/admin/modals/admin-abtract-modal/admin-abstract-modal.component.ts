import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  Input,
  Type,
} from '@angular/core';
import { AdminPasswordChangeComponent } from '../../profile/password-change/password-change.component';
import { AdminProfileUpdateComponent } from '../../profile/profile-update/profile-update.component';
import { AddThemeComponent } from '../../themes/addTheme/add-theme.component';
@Component({
  selector: 'admin-abstract-modal',
  templateUrl: './admin-abstract-modal.component.html',
})
export class AdminAbstractModal implements OnInit {
  @Input() modalTitle: string;
  @Input() modalNum: number;
  @Input() modalComponent: string;
  currentTab = '';
  components = {
    ADMIN_PASSWORD_CHANGE: AdminPasswordChangeComponent,
    ADMIN_PROFILE_UPDATE: AdminProfileUpdateComponent,
    ADD_THEME: AddThemeComponent,
  };

  constructor() {}

  ngOnInit(): void {
    if (this.modalComponent == 'ADMIN_PASSWORD_CHANGE') {
      this.currentTab = 'ADMIN_PASSWORD_CHANGE';
    } else if (this.modalComponent == 'ADMIN_PROFILE_UPDATE') {
      this.currentTab = 'ADMIN_PROFILE_UPDATE';
    } else if (this.modalComponent == 'ADD_THEME') {
      this.currentTab = 'ADD_THEME';
    }
  }
  closeDialog() {
    let dialog = document.getElementsByTagName('dialog')[this.modalNum];
    dialog.close();
  }
  get selectedComponent() {
    return this.components[this.currentTab];
  }
}
