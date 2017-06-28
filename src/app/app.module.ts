import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChordProgGeneratorService } from './chord-prog-generator.service';
import { ApiService } from './api.service';
import { ScaleSelectorComponent } from './scale-selector/scale-selector.component';
import { ChordSelectorComponent } from './chord-selector/chord-selector.component';
import { GenerateMidiComponent } from './generate-midi/generate-midi.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    ScaleSelectorComponent,
    ChordSelectorComponent,
    GenerateMidiComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ChordProgGeneratorService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
