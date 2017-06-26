import { Injectable } from '@angular/core';

import { Scale } from './scale';
import { Chord } from './chord';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ApiMockService {

  constructor() { }

  // API: GET /scales
  public getAllScales(): Observable<Scale[]> {
    return Observable.of([
      new Scale({ id: 1, name: "C", type: "Major", notes: ["C", "D", "E", "F", "G", "A", "B"]})
    ]);
  }

  // API: GET /chords/:scaleId
  public getChordsFromScaleId(scaleId: number) {
    return Observable.of([
      new Chord({ id: 1, name: "C", type: "Triad", notes: ["C3", "E3", "G3"], fileUrl: "", belongsToScale: [1]
      })
    ]);
  }

}
