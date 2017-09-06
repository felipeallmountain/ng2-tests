import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {

  @Input() chipData: any;
  @Input() chipCollection: any[];
  @Input() isLast: false;
  @Output() onSelect = new EventEmitter<any>();
  selected = false;

  constructor() { }

  ngOnInit() {
  }

  switchSelected() {
    this.chipData.selected = !this.chipData.selected;
    const chipSelected = {
      selected: this.chipData.selected,
      collection: this.chipCollection
    };
    this.onSelect.emit(chipSelected);
  }

}
