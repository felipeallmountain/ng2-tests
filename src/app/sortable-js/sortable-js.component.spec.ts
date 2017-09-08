import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableJsComponent } from './sortable-js.component';

describe('SortableJsComponent', () => {
  let component: SortableJsComponent;
  let fixture: ComponentFixture<SortableJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortableJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
