import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sortable-chip',
  templateUrl: './sortable-chip.component.html',
  styleUrls: ['./sortable-chip.component.scss']
})
export class SortableChipComponent implements OnInit {

  @Input() chipData: any;
  @Input() chipCollection: any[];
  @Input() isLast: false;
  @Input() previousChipOperator: string;
  @Input() previousGroupOperator: string;
  @Output() onSelect = new EventEmitter<any>();
  @Output() onOperatorChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  switchSelected() {
    this.chipData.selected = !this.chipData.selected;
    const chipSelected = {
      chipData: this.chipData,
      collection: this.chipCollection
    };
    this.onSelect.emit(chipSelected);
  }

  operatorChange() {
    this.onOperatorChange.emit();
  }

  isPreviousChipExcluded(): boolean {
    return this.previousChipOperator === 'ANDNOT'
      || this.previousGroupOperator === 'ANDNOT';
  }
}
