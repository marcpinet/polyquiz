import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'settings-modal',
  templateUrl: './settings-modal.component.html',
})
export class SettingsModalComponent {
  closeDialog() {
    let dialog = document.getElementsByTagName('dialog')[1];
    dialog.close();
  }
}
