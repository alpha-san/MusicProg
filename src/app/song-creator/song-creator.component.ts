import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Song } from '../song';
import { Scale } from '../scale';
import { Chord } from '../chord';

@Component({
  selector: 'app-song-creator',
  templateUrl: './song-creator.component.html',
  styleUrls: ['./song-creator.component.scss']
})
export class SongCreatorComponent implements OnInit {

  // TODO
  // when loading songs from DB
  //@Input: song: Song;

  redirectToSongComponent: boolean;

  redirectToScaleComponent: boolean;

  redirectToChordsComponent: boolean;

  @Input() song: Song;

  @Input() midiFileUrl: string;

  @Output()
  onScaleSelect: EventEmitter<any> = new EventEmitter();

  @Output()
  onChordSelect: EventEmitter<any> = new EventEmitter();

  @Output()
  onGenerateMidi: EventEmitter<Song> = new EventEmitter();

  @Output()
  onPlayChordProgression: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
  }

  /*
  ngAfterViewInit() {
    var div = this.elRef.nativeElement.querySelector('.songFooter');
    console.log(div);
  }
  ngAfterContentInit() {
    var div = this.elRef.nativeElement.querySelector('.songFooter');
    console.log(div);
  }*/

  showScaleSelection() {
    this.onScaleSelect.emit();
  }

  showChordSelection() {
    this.onChordSelect.emit();
  }

  generateMidi() {
    this.onGenerateMidi.emit();
    this.elRef.nativeElement.querySelector('#song-footer-generate-midi-button-hidden').click();
  }

  playChordProgression() {
    this.onPlayChordProgression.emit();
  }




}
