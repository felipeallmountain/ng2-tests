import { DummyData } from './DummyData';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';


@Component({
  selector: 'app-dnd-group-chips',
  templateUrl: './dnd-group-chips.component.html',
  styleUrls: ['./dnd-group-chips.component.scss']
})
export class DndGroupChipsComponent implements OnInit {

  modifiedList: any[];
  selectedChipGroups: any[] = [];
  selectedChipItems: any[] = [];
  selectedGroupIndex: number = -1;

  constructor() { }

  ngOnInit() {
    this.modifiedList = _.cloneDeep(
      DummyData.content.audienceAttributes
    );
    this.setChipsSelectedToFalse();
  }

  setChipsSelectedToFalse() {
    _.forEach(this.modifiedList, (val: any) => {
      _.forEach(val.operands, (childVal: any) => {
        childVal.selected = false;
      });
    });
  }

  unselectAll(): void {
    this.selectedChipGroups = [];
    this.selectedChipItems = [];
    this.setChipsSelectedToFalse();
    this.selectedGroupIndex = -1;
  }

  onItemDragSuccess(evt) {
    console.log('onItemDragSuccess', evt);
    this.arrangeGroupOperands();
  }

  arrangeGroupOperands() {
    _.forEach(this.modifiedList, (val: any) => {
      const groupIndex = val.operands.length - 1;
      val.logicalOperator = val.operands[groupIndex].logicalOperator;
    });
  }

  onDropSuccess(evt) {
    console.log('onDropSuccess', evt);
  }

  selectChip(chipSelected: any): void {
    const collection = chipSelected.collection;
    const chip = chipSelected.chipData;

    if (chip.selected) {
      this.selectChipGroups(collection);
      this.selectChipItems(chip);
    } else {
      this.unselectChipGroups(collection);
      this.unselectChipItems(chip);
    }
  }

  selectChipGroups(collection): void {
    const collectionIndex = _.findIndex(
      this.selectedChipGroups,
      col => _.isEqual(col, collection)
    );
    if (collectionIndex < 0) {
      this.selectedChipGroups.push(collection);
      this.selectedGroupIndex = this.getFirstIndexFromSelected();
    }
  }

  unselectChipGroups(collection): void {
    const areAllChipsUnselected = _.every(
      collection.operands,
      ['selected', false]
    );
    if (areAllChipsUnselected) {
      _.remove(this.selectedChipGroups, collection);
    }
  }

  selectChipItems(chip): void {
    this.selectedChipItems.push(chip);
  }

  unselectChipItems(chip): void {
    _.remove(this.selectedChipItems, chip);
  }

  getFirstIndexFromSelected(): number {
    const firstElem = this.selectedChipGroups[0];
    const listIndex = this.modifiedList.indexOf(firstElem);
    return this.selectedGroupIndex < 0 ?
      listIndex : listIndex < this.selectedGroupIndex
        ? listIndex : this.selectedGroupIndex;
  }

  group(): void {
    const mergedGroup = this.getMergedSelectedGroups();
    this.removeSelectedGroups();
    this.addNewGroup(mergedGroup);
    this.unselectAll();
    this.arrangeGroupOperands();
  }

  getMergedSelectedGroups(): any {
    const firstElem = _.cloneDeep(this.selectedChipGroups[0]);
    _.forEach(this.selectedChipGroups, (val: any, index: number) => {
      if (index > 0) {
        firstElem.operands = [
          ...firstElem.operands, ...val.operands
        ];
      }
    });
    return firstElem;
  }

  removeSelectedGroups(): void {
    _.forEach(this.selectedChipGroups, val => {
      _.remove(this.modifiedList, val);
    });
  }

  addNewGroup(newGroup: any) {
    this.modifiedList.splice(this.selectedGroupIndex, 0, newGroup);
  }

  ungroup(): void {
    if (!this.selectedChipItems.length) {
      return;
    }
    const unselectedGroups = this.getNewUnselectedGroups();
    this.removeItemsFromSelectedGroups();
    this.addNewUnselectedGroups(unselectedGroups);
    this.unselectAll();
    this.arrangeGroupOperands();
  }

  removeItemsFromSelectedGroups() {
    _.forEach(this.modifiedList, (val: any) => {
      if (val) {
        _.forEach(this.selectedChipItems, chip => {
          _.remove(val.operands, chip);
          if (!val.operands.length) {
            _.remove(this.modifiedList, val);
          }
        });
      }
    });
  }

  getNewUnselectedGroups() {
    return _.map(
      this.selectedChipItems,
      val => this.createNewGroup(_.cloneDeep(val))
    );
  }

  createNewGroup(chip) {
    return {
      logicalOperator: chip.logicalOperator,
      notSignPresent: false,
      operands: [chip]
    };
  }

  addNewUnselectedGroups(unselectedGroups) {
    this.modifiedList.splice(this.selectedGroupIndex, 0, ...unselectedGroups);
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
