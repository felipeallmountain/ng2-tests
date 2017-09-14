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
        this.arrangeGroupOperands();
        this.unselectAll();
      },
      chosenClass: 'chip-chosen',
      onStart: (evt) => {
        const chipGroup = evt.target.parentElement;
        const parentGroup = chipGroup.parentElement;
        const groupChildrenNum = evt.target.children.length - 1;
        const groupIndex = Array.from(
          parentGroup.children
        ).indexOf(chipGroup);

        this.createEmptyPlaceholders(groupChildrenNum, groupIndex);
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

  createEmptyPlaceholders(groupChildren: number, groupIndex: number) {
    if (groupChildren > 1) {
      this.createInbetweenPlaceholders();
    } else {
      this.createCustomIndexPlaceholders(groupIndex);
    }
  }

  createInbetweenPlaceholders(): void {
    const listLength = (this.modifiedList.length + 1) * 2;
    for (let index = 0; index < listLength; index++) {
      this.createPlaceholders(index);
    }
  }

  createCustomIndexPlaceholders(groupIndex: number): void {
    switch (groupIndex) {
      case 0:
        this.createBeginningPlaceholders();
      break;
      case this.modifiedList.length - 1:
        this.createEndingPlaceholders();
      break;
      default:
        this.createCustomInbetweens(groupIndex);
    }
  }

  createBeginningPlaceholders(): void {
    const listLength = (this.modifiedList.length + 1) * 2;
    const placeholdersLength = listLength - 2;
    for (let index = 2; index < placeholdersLength; index++) {
      this.createPlaceholders(index);
    }
  }

  createEndingPlaceholders(): void {
    const listLength = (this.modifiedList.length - 1) * 2;
    for (let index = 0; index < listLength; index++) {
      this.createPlaceholders(index);
    }
  }

  createCustomInbetweens(index: number): void {
    const selectedGroup = this.modifiedList[index];
    this.createInbetweenPlaceholders();
    const selectedGroupIndex = this.modifiedList.indexOf(selectedGroup);
    const prevGroupIndex = selectedGroupIndex - 1;
    const nextGroupIndex = selectedGroupIndex + 1;
    this.modifiedList.splice(nextGroupIndex, 1);
    this.modifiedList.splice(prevGroupIndex, 1);
  }

  createPlaceholders(index: number) {
    if (index % 2 === 0) {
      this.modifiedList.splice(index, 0, this.createNewGroup(null, true));
    }
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

  createNewGroup(chip, isEmpty = false): any {
    return {
      logicalOperator: isEmpty ? 'AND' : chip.logicalOperator,
      notSignPresent: false,
      operands: isEmpty ? [] : [chip]
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

  checkPreviousChipOperator(chip: any, groupOperands: any[]): string {
    const prevChipIndex = groupOperands.indexOf(chip) - 1;
    return prevChipIndex > -1
      ? groupOperands[prevChipIndex].logicalOperator
      : 'AND';
  }

  checkPreviousGroupOperator(group: any): string {
    const prevGroupIndex = this.modifiedList.indexOf(group) - 1;
    return prevGroupIndex > -1
      ? this.modifiedList[prevGroupIndex].logicalOperator
      : 'AND';
  }
}
