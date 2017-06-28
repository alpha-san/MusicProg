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

  listOfScales: Scale[] = [];

  listOfChords: Chord[] = [];

  selectedChords: Chord[] = [];

  scaleSelectionComplete = false;

  chordSelectionComplete = false;

  constructor(
    private chordProgGeneratorService: ChordProgGeneratorService,
    private scaleDataService: ScaleDataService
    ) { }

  public ngOnInit() {
  }

  getAllScales() {
    this.scaleDataService
      .getAllScales()
      .subscribe(
        (scales) => {
          this.listOfScales = scales;
        }
      );
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

  onScaleChange(scale: Scale) {
    this.scaleDataService
      .getChordsBasedOnScaleId(scale.id)
      .subscribe(
        (chords) => {
          this.listOfChords = chords;
        }
      );
  }

  addChord(chord: Chord) {
    this.selectedChords.push(chord);
    this.chordProgGeneratorService.addChord(chord);
    return this;
  }

  onGenerateMidiFile() {
    return this.chordProgGeneratorService.generateMidiFile();
  }

  removeChord(id: number) {
    this.selectedChords = this.selectedChords.filter(
      chord => chord.id !== id
    );
  }

  onScaleSelectionComplete(status: boolean) {
    this.scaleSelectionComplete = status;

    if (!status)
      this.selectedChords = [];
  }

  onChordSelectionComplete(status: boolean) {
    this.chordSelectionComplete = status;
  }

}
