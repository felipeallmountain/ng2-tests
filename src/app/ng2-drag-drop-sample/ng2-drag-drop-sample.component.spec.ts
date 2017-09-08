import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2DragDropSampleComponent } from './ng2-drag-drop-sample.component';

describe('Ng2DragDropSampleComponent', () => {
  let component: Ng2DragDropSampleComponent;
  let fixture: ComponentFixture<Ng2DragDropSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2DragDropSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2DragDropSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
