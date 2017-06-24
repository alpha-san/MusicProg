import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ChordProgGeneratorService } from './chord-prog-generator.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    ChordProgGeneratorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
