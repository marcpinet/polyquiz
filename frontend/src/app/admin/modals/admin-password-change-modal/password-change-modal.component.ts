import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'password-change-modal',
  templateUrl: './password-change-modal.component.html',
})
export class AdminPasswordChangeModal {
  closeDialog() {
    let dialog = document.getElementsByTagName('dialog')[1];
    dialog.close();
  }
}
