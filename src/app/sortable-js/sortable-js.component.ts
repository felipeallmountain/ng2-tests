import { SortablejsOptions } from 'angular-sortablejs';
import { Component, OnInit } from '@angular/core';
import { DummyData } from './DummyData';
import * as _ from 'lodash';

@Component({
  selector: 'app-sortable-js',
  templateUrl: './sortable-js.component.html',
  styleUrls: ['./sortable-js.component.scss']
})
export class SortableJsComponent implements OnInit {

  sortData = [];

  parentOptions: SortablejsOptions = {
    animation: 200,
    handle: '.group-handle'
  };

  options: SortablejsOptions = {
    group: {
      name: 'group'
    },
    sort: true,
    animation: 150,
    onUpdate: this.logChanges.bind(this)
  };

  constructor() { }

  ngOnInit() {
    this.sortData = _.cloneDeep(DummyData.content.audienceAttributes);
  }

  logChanges() {
    console.log(this.sortData);
  }

}
