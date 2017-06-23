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

  allChords: Chord[];

  getAllChords(scale: Scale): Chord[] {
    return [ 
              new Chord({ name: 'C', type: 'Major', notes: ['C3', 'E3', 'G3'], fileUrl: '/assets/audio/cmajor.wav'}), 
              new Chord({ name: 'D', type: 'Major', notes: ['D3', 'F#3', 'A3'], fileUrl: '/assets/audio/dmajor.wav'})
           ];
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

    //let note = new NoteEvent({pitch:['C4', 'E4', 'G4'], duration: '4'});
    //this.track.addEvent(note);

    let write = new Writer([this.track]);
    let data = write.dataUri();
    console.log(data);

    return data;

  } 

  changeBpm(bpm: number): ChordProgGeneratorService {
    this.bpm = bpm;
    return this;
  }
}
