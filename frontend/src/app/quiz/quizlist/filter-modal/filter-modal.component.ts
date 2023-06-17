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

  toggleFilter(filter: string) {
    if (this.isSelected(filter)) {
      this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
    } else {
      this.selectedFilters = [...this.selectedFilters, filter];
    }
  }

  isSelected(filter: string): boolean {
    return this.selectedFilters.includes(filter);
  }

  applyFilterAndCloseDialog() {
    let dialog = document.getElementsByTagName('dialog')[this.modalNum];
    dialog.close();
    const filters = [...this.selectedFilters];
    this.applyFilters.emit(filters);
  }

  closeDialog() {
    let dialog = document.getElementsByTagName('dialog')[this.modalNum];
    dialog.close();
  }
}
