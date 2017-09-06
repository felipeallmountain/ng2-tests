import { DndModule } from 'ng2-dnd';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DndGroupChipsComponent } from './dnd-group-chips/dnd-group-chips.component';
import { ChipComponent } from './dnd-group-chips/chip/chip.component';

@NgModule({
  declarations: [
    AppComponent,
    DndGroupChipsComponent,
    ChipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
