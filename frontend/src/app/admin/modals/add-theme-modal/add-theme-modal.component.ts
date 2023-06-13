import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'add-theme-modal',
  templateUrl: './add-theme-modal.component.html',
})
export class AddThemeModalComponent {
  closeDialog() {
    let dialog = document.getElementsByTagName('dialog')[1];
    dialog.close();
  }
}
