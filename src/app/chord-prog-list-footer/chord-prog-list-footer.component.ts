import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chord } from '../chord';

@Component({
  selector: 'app-chord-prog-list-footer',
  templateUrl: './chord-prog-list-footer.component.html',
  styleUrls: ['./chord-prog-list-footer.component.scss']
})
export class ChordProgListFooterComponent implements OnInit {

  @Input() chords: Chord[];

  @Output()
  removeChord: EventEmitter<number> = new EventEmitter();

  @Output()
  playChordProgression: EventEmitter<Chord> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onRemoveChord(id: number) {
    this.removeChord.emit(id);
  }

  onPlayChordProgression() {
    this.playChordProgression.emit();
  }

}
