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

@Component({
  selector: 'filter-modal',
  templateUrl: './filter-modal.component.html',
})
export class FilterModal {
  @Input() modalNum: number;
  @Input() modalTitle: string;
  @Input() filterList: string[];
  @Input() selectedFilters: string[];
  @Output() applyFilters: EventEmitter<string[]> = new EventEmitter<string[]>();

  closeDialog() {
    let dialog = document.getElementsByTagName('dialog')[this.modalNum];
    dialog.close();
  }

  applyFilterAndCloseDialog() {
    let dialog = document.getElementsByTagName('dialog')[this.modalNum];
    dialog.close();
    const filters: string[] = [];
    this.applyFilters.emit(filters);
  }
}
