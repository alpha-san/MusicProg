import { Injectable } from '@angular/core';
import { Chord } from './chord';
import { Scale } from './scale';

@Injectable()
export class ScaleDataService {

  constructor() { }

  // Simulate get /scales
  getAllScales(): Scale[] {

    // TODO
    // fetch from server
    return [
      new Scale({ name: 'C', type: 'Major' }),
      new Scale({ name: 'C', type: 'Minor' }),
      new Scale({ name: 'D', type: 'Major' }),
      new Scale({ name: 'D', type: 'Minor' }),
      new Scale({ name: 'E', type: 'Major' }),
      new Scale({ name: 'E', type: 'Minor' }),
      new Scale({ name: 'F', type: 'Major' }),
      new Scale({ name: 'F', type: 'Minor' }),
      new Scale({ name: 'G', type: 'Major' }),
      new Scale({ name: 'G', type: 'Minor' }),
      new Scale({ name: 'A', type: 'Major' }),
      new Scale({ name: 'A', type: 'Minor' }),
      new Scale({ name: 'B', type: 'Major' }),
      new Scale({ name: 'Bb', type: 'Minor' }),
      new Scale({ name: 'Bb', type: 'Major' }),
    ];
  }

}
