import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableChipComponent } from './sortable-chip.component';

describe('SortableChipComponent', () => {
  let component: SortableChipComponent;
  let fixture: ComponentFixture<SortableChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortableChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
