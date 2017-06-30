import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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

  @Output()
  onScaleSelect: EventEmitter<any> = new EventEmitter();

  @Output()
  onChordSelect: EventEmitter<any> = new EventEmitter();

  @Output()
  onGenerateMidi: EventEmitter<Song> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  } 

  showScaleSelection() {
    this.onScaleSelect.emit();
  }

  showChordSelection() {
    this.onChordSelect.emit();
  }

  generateMidi() {
    this.onGenerateMidi.emit();
  }




}
