import { SortablejsModule } from 'angular-sortablejs';

import { DndModule } from 'ng2-dnd';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DndGroupChipsComponent } from './dnd-group-chips/dnd-group-chips.component';
import { ChipComponent } from './dnd-group-chips/chip/chip.component';
import { Ng2DragDropSampleComponent } from './ng2-drag-drop-sample/ng2-drag-drop-sample.component';
import { SortableJsComponent } from './sortable-js/sortable-js.component';
import { SortableChipComponent } from './sortable-js/sortable-chip/sortable-chip.component';

@NgModule({
  declarations: [
    AppComponent,
    DndGroupChipsComponent,
    ChipComponent,
    Ng2DragDropSampleComponent,
    SortableJsComponent,
    SortableChipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DndModule.forRoot(),
    Ng2DragDropModule.forRoot(),
    SortablejsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
