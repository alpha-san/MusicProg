import { Component, OnInit } from '@angular/core';
import { ChordProgGeneratorService } from './chord-prog-generator.service';
import { Chord } from './chord';
import { Scale } from './scale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChordProgGeneratorService]
})
export class AppComponent {

  selectedScale: Scale;

  listOfChords: Chord[];

  title = 'app works';

  constructor(private chordProgGeneratorService: ChordProgGeneratorService) {
  }

  public ngOnInit() {
    if (!this.selectedScale)
      this.selectedScale = new Scale({ name: 'C', type: 'Major' });

    this.listOfChords  = this.chordProgGeneratorService.getAllChords(this.selectedScale);
  }

  addChord(chord: Chord) {
    console.log('addChord');
    this.chordProgGeneratorService.addChord(chord);
    return this;
  }

  onGenerateMidiFile() {
    console.log('onGenerateMidiFile');
    return this.chordProgGeneratorService.generateMidiFile();
  }

  playChord() {
    console.log('playChord');
    return this; 
  }
  
}
