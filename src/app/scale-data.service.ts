import { Injectable } from '@angular/core';
import { Chord } from './chord';
import { Scale } from './scale';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

import tonal from 'tonal';

@Injectable()
export class ScaleDataService {

  notes: String[] = [ 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

  constructor(
    private api: ApiService
  ) { }

  getScaleFromName(scaleName: String): Scale {

    let notes = tonal.scale(scaleName);

    for (let i = 0; i < notes.length; i++) {
      notes[i] = notes[i] + '4';
    }

    console.log(notes);

    let scale = new Scale({
      name: scaleName[0],
      type: scaleName[1],
      notes: notes
    });

    return scale;

  }

  getAllScaleNames(): String[] {
    return tonal.scale.names();
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

  getChordsBasedOnScale(scale: Scale): Chord[] {

    let chords: Chord[] = [];
    let chordNames: String[] = tonal.chord.names();

    /*
    id: number;
    name: string;
    type: string;
    length: number;
    notes: Array<string>;
    fileUrl: string;
    belongsToScaleId: Array<number>;
    */

    for (let name of chordNames) {

      let notes: String[] = tonal.chord(scale.name + ' ' + name);

      chords.push(new Chord({
        name: scale.name,
        type: name,
        notes: notes
      }));
    }

    chords.sort((a, b) => a.notes.length - b.notes.length);

    return chords;

  }

}
