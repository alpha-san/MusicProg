import { Injectable } from '@angular/core';
import { Chord } from './chord';
import { Scale } from './scale';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

import tonal from 'tonal';


// TODO
// [x] Find a way to append '4' to scale notes to create MIDI
// [x] Find a way to append '4' to chord notes to create MIDI
// [x] Find a way to generate chords that are only relevant to that scale

@Injectable()
export class ScaleDataService {

  notes: string[] = [ 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

  // M = Major (triad)
  // m = minor (triad)
  // Maj7 = Major (seventh)
  // m7 = minor (seventh)
  // 7 = secondary dominate
  chordNames: string[] = [ 'M', 'm', 'Maj7', 'm7', '7' ];

  scaleNames: string[] = [ 'major', 'minor', 'lydian', 'chromatic', 'dorian', 'major blues', 'minor blues' ];

  constructor(
    private api: ApiService
  ) { }

  getScaleFromName(scaleName: String): Scale {
    let notes = tonal.scale(scaleName);
    let midiNotes = this.getMidiNotes(notes);

    let scale = new Scale({
      name: scaleName[0],
      type: scaleName[1],
      notes: midiNotes
    });

    return scale;

  }

  getAllScaleNames(): string[] {
    return this.scaleNames;
    //return tonal.scale.names();
  }

  // Simulate get /scales
  getAllScales(): Observable<Scale[]> {
    return this.api.getAllScales();
  }

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

  getChordsBasedOnScaleId(scaleId: number): Observable<Chord[]>{
    return this.api.getChordsFromScaleId(scaleId);
  }

  // C, D, E, F, G, A, B, C
  // I  ii iii IV, V, vi
  // Major: I, IV, V
  // Minor: ii, iii, vi

  // M = Major (triad)
  // m = minor (triad)
  // Maj7 = Major (seventh)
  // m7 = minor (seventh)
  // 7 = secondary dominate

  // return triads, sevenths, and secondary dominate
  getChordsBasedOnScale(scale: Scale): Array<Array<Chord>> {

    let chords: Array<Chord[]> = [];

    for (let note of scale.notes) {
      for (let name of this.chordNames) {

        // note[0] is the note without the pitch
        let properNote = note[0];
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
          default: {
            chordsIndex = 3;
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

      } // end chordNames for
    } // end notes for

    for (let theseChords of chords) {
      theseChords.sort((a, b) => Math.abs(scale.name.charCodeAt(0) - a.notes[0].charCodeAt(0)) -
                            Math.abs(scale.name.charCodeAt(0) - b.notes[0].charCodeAt(0)));
    }

    /*
    chords.sort(function(a, b) {

      let scaleBaseNote = scale.name.charCodeAt(0);
      let chordABaseNote = a.notes[0].charCodeAt(0);
      let chordBBaseNote = b.notes[0].charCodeAt(0);

      return Math.abs(scaleBaseNote - chordABaseNote) - Math.abs(scaleBaseNote - chordBBaseNote);
    });*/

    return chords;

  }

  // Examples
  // [ 'C', 'E', 'G' ] => [ 'C4', 'E4', 'G4' ]
  // [ 'A', 'C', 'E' ] => [ 'A4', 'C5', 'E5' ]

  // [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ]
  // newIndex < baseNoteIndex >= scale.length
  getMidiNotes(notes: string[]): string[] {
    let result: string[] = [];

    let baseNoteIndex = this.notes.indexOf(notes[0].toString());

    for(let note of notes) {

      let higherOctave = (this.notes.indexOf(note.toString())) < baseNoteIndex;

      result.push(note + ((!higherOctave) ? '4': '5'));
    }
    //console.log('before: ' );
    //console.log(notes);
    //console.log('after: ');
    //console.log(result);
    return result;
  }

}
