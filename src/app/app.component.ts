import { Component, OnInit, EventEmitter } from '@angular/core';
import { ChordProgGeneratorService } from './chord-prog-generator.service';
import { ScaleDataService } from './scale-data.service';
import { Chord } from './chord';
import { Scale } from './scale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    ChordProgGeneratorService,
    ScaleDataService
  ]
})
export class AppComponent implements OnInit {

  selectedScale: Scale;

  listOfScales: Scale[] = [];

  listOfChords: Chord[] = [];

  selectedChords: Chord[] = [];

  title = 'app works';

  constructor(private chordProgGeneratorService: ChordProgGeneratorService,
              private scaleDataService: ScaleDataService) {
  }

  public ngOnInit() {
    this.scaleDataService
      .getAllScales()
      .subscribe(
        (scales) => {
          this.listOfScales = scales;
        }
      );

/*
    if (!this.selectedScale)
      this.selectedScale = new Scale({ name: 'C', type: 'Major' });

    this.scaleDataService
      .getChordsBasedOnScaleId(this.selectedScale.id)
      .subscribe(
        (chords) => {
          this.listOfChords = chords;
        }
      );*/
  }

  playFile(fileUrl: string) {
    var audio = new Audio(fileUrl);
    audio.load();
    audio.play();
  }

  playChordProgression() {
    for (let i: number = 0; i < this.selectedChords.length; i++) {
      let chord: Chord = this.selectedChords[i];
      let timeToStartNote: number = i * 1000;

      setTimeout(function() {
        let audio = new Audio(chord.fileUrl);
        audio.load();
        audio.play();
      }, timeToStartNote);

    }
  }

  onScaleChange(scale: EventEmitter<Scale>) {
    this.scaleDataService
      .getChordsBasedOnScaleId(this.selectedScale.id)
      .subscribe(
        (chords) => {
          this.listOfChords = chords;
        }
      );
  }

  addChord(chord: Chord) {
    console.log('addChord');
    this.selectedChords.push(chord);
    this.chordProgGeneratorService.addChord(chord);
    return this;
  }

  onGenerateMidiFile() {
    console.log('onGenerateMidiFile');
    return this.chordProgGeneratorService.generateMidiFile();
  }

  removeChord(id: number) {
    console.log('remove chord id: ' + id);
    this.selectedChords = this.selectedChords.filter(
      chord => chord.id !== id
    );
  }

  playChord() {
    console.log('playChord');
    return this; 
  }
  
}
