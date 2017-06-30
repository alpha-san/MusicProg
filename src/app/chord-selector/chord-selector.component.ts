import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chord } from '../chord';

@Component({
  selector: 'app-chord-selector',
  templateUrl: './chord-selector.component.html',
  styleUrls: ['./chord-selector.component.scss']
})
export class ChordSelectorComponent implements OnInit {

  @Input() chords: Chord[];

  @Input() selectedChords: Chord[];

  @Output()
  addChord: EventEmitter<Chord> = new EventEmitter();

  @Output()
  playFile: EventEmitter<String> = new EventEmitter();

  @Output()
  removeChord: EventEmitter<number> = new EventEmitter();

  @Output()
  playChordProgression: EventEmitter<any> = new EventEmitter();

  @Output()
  chordSelectionComplete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onAddChord(chord: Chord) {
    this.addChord.emit(chord);
  }
  
  onPlayFile(fileUrl) {
    this.playFile.emit(fileUrl);
  }

  onRemoveChord(index: number) {
    this.removeChord.emit(index);
  }

  onPlayChordProgression() {
    this.playChordProgression.emit();
  }

  onChordSelectionComplete() {
    this.chordSelectionComplete.emit();
  }

}
