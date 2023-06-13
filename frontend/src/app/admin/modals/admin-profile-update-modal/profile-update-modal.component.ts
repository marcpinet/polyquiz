import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'profile-update-modal',
  templateUrl: './profile-update-modal.component.html',
})
export class AdminProfileUpdateModal {
  closeDialog() {
    let dialog = document.getElementsByTagName('dialog')[2];
    dialog.close();
  }
}
