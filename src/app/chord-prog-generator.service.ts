import { Injectable } from '@angular/core';
import { Scale } from './scale';
import { Chord } from './chord';
import { MidiWriter, Track, NoteEvent, Writer, ProgramChangeEvent } from 'midi-writer-js';

@Injectable()
export class ChordProgGeneratorService {

  lastId: number;

  chords: Chord[];

  track: Track;

  bpm: number;

  constructor() {
    this.bpm = 120;
    this.lastId = 0;
    this.chords = [];
  }

  addChord(chord: Chord): ChordProgGeneratorService {
    chord.setId(++this.lastId);
    this.chords.push(chord);
    return this;
  }

  deleteChord(id: number): ChordProgGeneratorService {
    this.chords = this.chords
      .filter(chord => chord.id !== id);
    return this;
  }

  generateMidiFile(): string {

    this.track = new Track();
    this.track.addEvent(new ProgramChangeEvent({instrument : 1}));
    this.track.setTempo(this.bpm);

    for (let chord of this.chords) {
      let note = new NoteEvent({pitch:chord.notes, duration: '4'});
      this.track.addEvent(note);
    }

    let write = new Writer([this.track]);
    let data = write.dataUri();

    return data;

  } 

  changeBpm(bpm: number): ChordProgGeneratorService {
    this.bpm = bpm;
    return this;
  }

}