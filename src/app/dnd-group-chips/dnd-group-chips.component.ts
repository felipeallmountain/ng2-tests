import { DummyData } from './DummyData';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dnd-group-chips',
  templateUrl: './dnd-group-chips.component.html',
  styleUrls: ['./dnd-group-chips.component.scss']
})
export class DndGroupChipsComponent implements OnInit {

  dummyList = DummyData.content.audienceAttributes;

  constructor() { }

  ngOnInit() {
  }

  onItemDragSuccess($event: any) {
    console.log('dummyList', this.dummyList);
  }

  checkTaxonomyName(elem: any): string {
    return elem.attributeDetails ?
      elem.attributeDetails.taxonomyNodeName : '';
  }

}
