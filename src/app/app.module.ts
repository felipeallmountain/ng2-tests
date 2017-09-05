import { DndModule } from 'ng2-dnd';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DndGroupChipsComponent } from './dnd-group-chips/dnd-group-chips.component';

@NgModule({
  declarations: [
    AppComponent,
    DndGroupChipsComponent
  ],
  imports: [
    BrowserModule,
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
