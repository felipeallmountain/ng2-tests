import { SortablejsOptions } from 'angular-sortablejs';
import { Component, OnInit } from '@angular/core';
import { DummyData } from './DummyData';
import * as _ from 'lodash';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-sortable-js',
  templateUrl: './sortable-js.component.html',
  styleUrls: ['./sortable-js.component.scss']
})
export class SortableJsComponent implements OnInit {

  modifiedList = [];
  displayList = [];
  parentOptions: SortablejsOptions;
  options: SortablejsOptions;

  selectedChipGroups: any[] = [];
  selectedChipItems: any[] = [];
  selectedGroupIndex: number = -1;

  constructor() { }

  ngOnInit() {
    this.modifiedList = _.cloneDeep(DummyData.content.audienceAttributes);

    this.parentOptions = {
      animation: 200,
      handle: '.group-handle',
      onUpdate: (evt) => {
        console.log('onUpdate', this.modifiedList);
        this.unselectAll();
      }
    };
    this.options = {
      group: {
        name: 'group'
      },
      animation: 150,
      onEnd: (evt) => {
        this.removeEmptyGroups();
        this.unselectAll();
      }
    };
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

  arrangeGroupOperands() {
    _.forEach(this.modifiedList, (val: any) => {
      const lastIndex = val.operands.length - 1;
      const lastVal = val.operands[lastIndex];
      if (lastVal) {
        val.logicalOperator = lastVal.logicalOperator;
      }
    });
  }

  selectChip(chipSelected: any): void {
    const collection = chipSelected.collection;
    const chip = chipSelected.chipData;

    if (chip.selected) {
      this.selectChipGroups(collection);
      this.selectChipItems(chip);
    } else {
      this.removeUnselectChipGroups(collection);
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

  removeUnselectChipGroups(collection): void {
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
    this.removeEmptyGroups();
    this.unselectAll();
    this.arrangeGroupOperands();
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

  removeItemsFromSelectedGroups() {
    _.forEach(this.modifiedList, (val: any) => {
      _.forEach(this.selectedChipItems, chip => {
        _.remove(val.operands, chip);
      });
    });
  }
  addNewUnselectedGroups(unselectedGroups) {
    this.modifiedList.splice(
      this.selectedGroupIndex,
      0,
      ...unselectedGroups
    );
  }

  removeEmptyGroups() {
    this.modifiedList = _.filter(
      this.modifiedList,
      val => val.operands.length > 0
    );
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
