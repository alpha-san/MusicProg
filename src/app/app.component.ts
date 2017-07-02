import { Component, OnInit, EventEmitter } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { ChordProgGeneratorService } from './chord-prog-generator.service';
import { ScaleDataService } from './scale-data.service';
import { ToneAudioService } from './tone-audio.service';
import { Song } from './song';
import { Scale } from './scale';
import { Chord } from './chord';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    ChordProgGeneratorService,
    ScaleDataService,
    ToneAudioService
  ]
})
export class AppComponent implements OnInit {

  midiFile: SafeUrl;

  // For now use new song until we store in DB
  // default bpm is 120
  song: Song = new Song({ bpm: 120 });

  listOfNotes: string[] = [ 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

  listOfScaleTypes: string[];

  listOfChords: Array<Chord[]> = [];

  redirectToSongComponent: boolean = false;

  redirectToScaleComponent: boolean = false;

  redirectToChordsComponent: boolean = false;

  constructor(
    private chordProgGeneratorService: ChordProgGeneratorService,
    private scaleDataService: ScaleDataService,
    private toneAudioService: ToneAudioService,
    private sanitizer: DomSanitizer
    ) { }

  public ngOnInit() {

    this.listOfScaleTypes = this.scaleDataService.getAllScaleNames();

    /*this.scaleDataService
      .getAllScales()
      .subscribe(
        (scales) => {
          this.listOfScales = scales;
        }
      );*/
  }

  onScaleChange(scaleName: String) {
    this.song.scale = this.scaleDataService.getScaleFromName(scaleName);

    this.listOfChords = this.scaleDataService.getChordsBasedOnScale(this.song.scale);

    /*(this.scaleDataService
      .getChordsBasedOnScaleId(scale.id)
      .subscribe(
        (chords) => {
          this.listOfChords = chords;
        }
      );*/
  }

  addChord(chord: Chord) {
    this.song.chords.push(chord);
    this.chordProgGeneratorService.addChord(chord);
    return this;
  }

  removeChord(index: number) {
    if (index !== -1)
      this.song.chords.splice(index, 1);
  }

  playScale(scaleName: string) {
    this.toneAudioService.playScale(this.song.scale);
  }

  playChord(chord: Chord) {
    this.toneAudioService.playChord(chord);
  }

  playFile(fileUrl: string) {
    this.toneAudioService.playScale(new Scale());
  }

  playChordProgression() {
    this.toneAudioService.playChordProgression(this.song.chords);
  }

  onGenerateMidiFile() {
    this.midiFile = this.sanitize(this.chordProgGeneratorService.generateMidiFile());
  }

  sanitize(url:string){
    //return this.sanitizer.bypassSecurityTrustUrl(url);

    // XSS risks
    console.log(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    console.log(this.sanitizer.bypassSecurityTrustUrl(url));
    console.log(this.sanitizer.bypassSecurityTrustStyle(url));

    return this.sanitizer.bypassSecurityTrustUrl(url);
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
