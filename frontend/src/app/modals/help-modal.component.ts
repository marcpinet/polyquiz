import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'help-modal',
  templateUrl: './help-modal.component.html',
})
export class HelpModalComponent {
  closeModal() {
    let dialog = document.getElementsByTagName('dialog')[0];
    dialog.close();
  }
}
