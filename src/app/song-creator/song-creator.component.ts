import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { Scale } from '../scale';
import { Chord } from '../chord';

@Component({
  selector: 'app-song-creator',
  templateUrl: './song-creator.component.html',
  styleUrls: ['./song-creator.component.scss']
})
export class SongCreatorComponent implements OnInit {

  song: Song = new Song();

  constructor() { }

  ngOnInit() {
  } 

  showScaleSelection() {
    console.log('showScaleSelection');
  }

  showChordSelection() {
    console.log('showChordSelection');
  }

  generateMidi() {
    console.log('generateMidi');
  }

}
