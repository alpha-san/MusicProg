import { Injectable } from '@angular/core';
import { Scale } from './scale';
import { Chord } from './chord';
import { MidiWriter, Track, NoteEvent, Writer, ProgramChangeEvent } from 'midi-writer-js';

/**
 * @class ChordProgGeneratorService 
 * 
 * Used to generate midi from chord progressions
 */

@Injectable()
export class ChordProgGeneratorService {

  /**
   * lastId
   * The last id of the chord that was added
   * @type {number}
   */
  lastId: number;

  /**
   * chords
   * A list of chords that make up the chord progression
   * @type {Chord[]}
   */
  chords: Chord[];

  /**
   * track
   * The track used to generate the midi
   * Since we only have 1 instrument and a simple chord progression, only 1 track is used
   * @type {Track}
   */
  track: Track;

  /**
   * bpm
   * The beats per minute defines the speed of the midi
   * The default is 120 bpm
   * @type {number} 
   */
  bpm: number;

  constructor() {
    this.bpm = 120;
    this.lastId = 0;
    this.chords = [];
  }

  /**
   * addChord
   * 
   * @param chord  The chord to be added to the current progression
   */
  addChord(chord: Chord): ChordProgGeneratorService {
    chord.setId(++this.lastId);
    this.chords.push(chord);
    return this;
  }

  /**
   * deleteChord
   * 
   * @param id  The id of the chord to be removed from the current progression
   */
  deleteChord(id: number): ChordProgGeneratorService {
    this.chords = this.chords
      .filter(chord => chord.id !== id);
    return this;
  }

  /**
   * generateMidiFile
   * 
   * Generates a midi file based on the current chords and bpm
   * 
   * @returns {string} The midi file as a datauri
   */
  generateMidiFile(): string {

    this.track = new Track();
    this.track.addEvent(new ProgramChangeEvent({instrument : 1}));
    this.track.setTempo(this.bpm);

    for (let chord of this.chords) {
      let note = new NoteEvent({pitch:chord.notes, duration: '1'});
      this.track.addEvent(note);
    }

    let write = new Writer([this.track]);
    let data = write.dataUri();

    return data;

  } 

  /**
   * changeBpm
   * 
   * @param bpm  The new bpm
   */
  changeBpm(bpm: number): ChordProgGeneratorService {
    this.bpm = bpm;
    return this;
  }

}