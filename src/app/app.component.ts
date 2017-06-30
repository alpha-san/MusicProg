import { Component, OnInit, EventEmitter } from '@angular/core';
import { ChordProgGeneratorService } from './chord-prog-generator.service';
import { ScaleDataService } from './scale-data.service';
import { Song } from './song';
import { Scale } from './scale';
import { Chord } from './chord';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    ChordProgGeneratorService,
    ScaleDataService
  ]
})
export class AppComponent implements OnInit {

  // For now use new song until we store in DB
  song: Song = new Song();

  listOfScales: Scale[] = [];

  listOfChords: Chord[] = [];

  redirectToSongComponent: boolean = false;

  redirectToScaleComponent: boolean = false;

  redirectToChordsComponent: boolean = false;

  constructor(
    private chordProgGeneratorService: ChordProgGeneratorService,
    private scaleDataService: ScaleDataService
    ) { }

  public ngOnInit() {
    this.scaleDataService
      .getAllScales()
      .subscribe(
        (scales) => {
          this.listOfScales = scales;
        }
      );
  }

  onScaleChange(scale: Scale) {
    this.song.scale = scale;

    this.scaleDataService
      .getChordsBasedOnScaleId(scale.id)
      .subscribe(
        (chords) => {
          this.listOfChords = chords;
        }
      );
  }

  addChord(chord: Chord) {
    this.song.chords.push(chord);
    this.chordProgGeneratorService.addChord(chord);
    return this;
  }

  removeChord(id: number) {
    this.song.chords = this.song.chords.filter(
      chord => chord.id !== id
    );
  }

  playFile(fileUrl: string) {
    var audio = new Audio(fileUrl);
    audio.load();
    audio.play();
  }

  playChordProgression() {
    for (let i: number = 0; i < this.song.chords.length; i++) {
      let chord: Chord = this.song.chords[i];
      let timeToStartNote: number = i * 1000;

      setTimeout(function() {
        let audio = new Audio(chord.fileUrl);
        audio.load();
        audio.play();
      }, timeToStartNote);

    }
  }

  onGenerateMidiFile() {
    return this.chordProgGeneratorService.generateMidiFile();
  }

  goToSongPage() {
    this.redirectToSongComponent = true;

    this.redirectToScaleComponent = false;
    this.redirectToChordsComponent = false;
  }

  goToScaleSelectionPage() {
    this.redirectToScaleComponent = true;

    this.redirectToSongComponent = false;
    this.redirectToChordsComponent = false;

    if (!status)
      this.song.chords = [];
  }

  goToChordsSelectionPage() {
    this.redirectToChordsComponent = true;

    this.redirectToScaleComponent = false;
    this.redirectToSongComponent = false;
  }

}
