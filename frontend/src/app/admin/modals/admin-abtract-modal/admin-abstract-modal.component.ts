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
export class AdminAbstractModal {
  @Input() modalNum: number;
  @Input() modalTitle: string;

  closeDialog() {
    let dialog = document.getElementsByTagName('dialog')[this.modalNum];
    dialog.close();
  }
}
