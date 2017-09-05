import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DndGroupChipsComponent } from './dnd-group-chips.component';

describe('DndGroupChipsComponent', () => {
  let component: DndGroupChipsComponent;
  let fixture: ComponentFixture<DndGroupChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DndGroupChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DndGroupChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
