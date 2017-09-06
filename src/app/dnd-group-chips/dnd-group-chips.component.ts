import { DummyData } from './DummyData';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';


@Component({
  selector: 'app-dnd-group-chips',
  templateUrl: './dnd-group-chips.component.html',
  styleUrls: ['./dnd-group-chips.component.scss']
})
export class DndGroupChipsComponent implements OnInit {

  dummyList = DummyData.content.audienceAttributes;

  modifiedList: any[];
  selectedChipGroups = [];

  constructor() { }

  ngOnInit() {
    this.setChipsSelectedToFalse();
  }

  setChipsSelectedToFalse() {
    this.modifiedList = _.cloneDeep(this.dummyList);
    _.forEach(this.modifiedList, (val: any) => {
      _.forEach(val.operands, (childVal: any) => {
        childVal.selected = false;
      });
    });
  }


  onItemDragSuccess($event: any) {
    console.log('modifiedList', this.modifiedList);
  }

  selectChip(selectedChip: any): void {
    const collection = selectedChip.collection;
    const collectionIndex = _.findIndex(
      this.selectedChipGroups,
      col => _.isEqual(col, collection)
    );

    if (selectedChip.selected) {
      if (collectionIndex < 0) {
        this.selectedChipGroups.push(collection);
      }
    } else {
      const areAllChipsUnselected = _.every(collection.operands, ['selected', false]);
      if (areAllChipsUnselected) {
        _.remove(this.selectedChipGroups, collection);
      }
    }
  }

  group(): void {
    // this.removeAttributesFromPlace();
    // this.clearEmptyGroups();
    // this.dummyList.unshift(
    //   this.createNewAttributesGroup()
    // );
    // this.selectedChips = [];
  }

  ungroup(): void {
  }

  selectAll(): void {
  }

  checkIfIsLastChipGroup(
    operandsLength: number,
    operandsIndex: number,
    listLength: number,
    listIndex: number
  ): boolean {
    return operandsIndex === (operandsLength - 1)
      && listIndex === (listLength - 1);
  }

}
