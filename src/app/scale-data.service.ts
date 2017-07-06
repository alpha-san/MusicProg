import { Injectable } from '@angular/core';
import { Chord } from './chord';
import { Scale } from './scale';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

import tonal from 'tonal';

/**
 * @class ScaleDataService 
 * 
 * Retrieves information pertaining to scales and chords
 */

@Injectable()
export class ScaleDataService {

  /**
   * Notes
   * @type {string[]}
   * 
   * Notes is used primarily for reference to generate notes that are identifiable in midi form.
   * The list contains common notes and uncommon notation of notes (i.e. double flats).
   */
  notes: string[] = [ 'C', 'C#', 'Db', 'D', 'Eb', 'E', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B', 'B#', 'Bbb'];

  /**
   * Chord Names
   * @type {string[]}
   * 
   * These are the most common chords used. These chord names are retrieved from tone.js
   * The most common chords are:
   * - M = Major (triad)
   * - m = minor (triad)
   * - Maj7 = Major (seventh)
   * - m7 = minor (seventh)
   * - 7 = secondary dominate
   * - 7sus4 = suspended
   * 
   * Ex: C Major scale notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
   *               Intervals:   I   ii    iii  IV   V    vi  
   * Major: I, IV, V
   * Minor: ii, iii, vi
   */
  chordNames: string[] = [ 'M', 'm', 'Maj7', 'm7', '7', 'o', '7sus4' ];

  /**
   * Scale Names 
   * @type {string[]}
   * 
   * These scales are the most common scales used in popular music.
   * These scales include:
   * - Major
   * - Minor
   * - Lyndian
   * - Chromatic
   * - Dorian
   * - Major Blues
   * - Minor Blues
   */
  scaleNames: string[] = [ 'major', 'minor', 'lydian', 'chromatic', 'dorian', 'major blues', 'minor blues' ];

  constructor(
    private api: ApiService
  ) { }

  /**
   * GetScaleFromName 
   * 
   * @param scaleName The name of the scale
   * @type {string}
   * 
   * @returns {Scale} A scale object that contains the name, type, and associated notes
   */
  getScaleFromName(scaleName: string): Scale {

    let scaleParts = scaleName.split(' ');
    let notes = tonal.scale(scaleName);
    let midiNotes = this.getMidiNotes(notes);

    let scale = new Scale({
      name: scaleParts[0],
      type: scaleParts[1],
      notes: midiNotes
    });

    return scale;

  }

  /**
   * GetAllScaleNames 
   * 
   * @returns {this.scaleNames} A list of the most common scales in a string format
   * @type {string[]}
   */
  getAllScaleNames(): string[] {
    return this.scaleNames;
  }

  /**
   * GetAllScales 
   * 
   * Uses the API to retrieve the scales. 
   * This method is deprecated and no longer used.
   * 
   * @returns {Scale[]} A list of scales of in the form of an array
   * 
   * @deprecated 
   */
  getAllScales(): Observable<Scale[]> {
    return this.api.getAllScales();
  }

/**
 * GetAllScalesNew
 * 
 * Uses tonal.js to dynamically generate a list of scales
 * 
 * @returns {Scale[]} 
 */
  getAllScalesNew(): Scale[] {

    let scales: Scale[] = [];

    let scaleNames: String[] = tonal.scale.names();

    for (let s of scaleNames) {
      for (let note of this.notes) {

        let thisScaleName = note + ' ' + s;
        let scaleNotes: String[] = tonal.scale(thisScaleName);

        scales.push(new Scale({
          name: note,
          type: s,
          notes: scaleNotes
        }));
      }
    }

    return scales;

  }

  /**
   * GetChordsBasedOnScaleId
   * 
   * @param scaleId  The id of the scale that is related to the list of chords being retrieved
   * @returns {Chord[]}
   * 
   * @deprecated
   */
  getChordsBasedOnScaleId(scaleId: number): Observable<Chord[]>{
    return this.api.getChordsFromScaleId(scaleId);
  }



  /**
   * GetChordsBasedOnScale
   * 
   * @param scale The scale used to get chords
   * 
   * @returns {Array<Array<Chords>>}
   */
  getChordsBasedOnScale(scale: Scale): Array<Array<Chord>> {

    let chords: Array<Chord[]> = [];

    for (let note of scale.notes) {
      for (let name of this.chordNames) {

        // note.slice(0, -1) is the note without the pitch
        let properNote = note.slice(0, -1);
        let notes: string[] = tonal.chord(properNote+ ' ' + name);
        let midiNotes = this.getMidiNotes(notes);

        let chordsIndex = 0;

        switch (name) {
          case 'M':
          case 'm': {
            chordsIndex = 0;
            break;
          }
          case 'Maj7':
          case 'm7': {
            chordsIndex = 1;
            break;
          }
          case '7': {
            chordsIndex = 2;
            break;
          }
          case '7sus4': {
            chordsIndex = 3;
            break;
          }
          case 'o': {
            chordsIndex = 4;
            break;
          }
          default: {
            chordsIndex = 5;
            break;
          }
        }

        if (chords[chordsIndex] == null) {
          chords[chordsIndex] = [];
        }

        chords[chordsIndex].push(new Chord({
          name: properNote,
          type: name,
          notes: midiNotes
        }));

      } 
    } 

    // sort chords based on their relation to the base note
    for (let theseChords of chords) {
      theseChords.sort((a, b) => Math.abs(scale.name.charCodeAt(0) - a.notes[0].charCodeAt(0)) -
                            Math.abs(scale.name.charCodeAt(0) - b.notes[0].charCodeAt(0)));
    }

    return chords;

  }

  /**
   * GetMidiNotes
   *
   * Returns a list of notes that contain octaves. Used for midi. 
   * Ex: 
   * - [ 'C', 'E', 'G' ] => [ 'C4', 'E4', 'G4' ]
   * - [ 'A', 'C', 'E' ] => [ 'A4', 'C5', 'E5' ]
   * 
   * @param notes A list of notes without the octave notation 
   * @returns {string[]} A list of notes with octave notation
   */
  getMidiNotes(notes: string[]): string[] {
    let result: string[] = [];

    let baseNoteIndex = this.notes.indexOf(notes[0].toString());

    for(let note of notes) {

      //let simplifiedNote = tonal.note.simplify(note);
      let simplifiedNote = note;
      let higherOctave = (this.notes.indexOf(simplifiedNote) < baseNoteIndex);

      result.push(simplifiedNote + ((!higherOctave) ? '4': '5'));
    }
    return result;
  }

}
