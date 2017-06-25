import { Injectable } from '@angular/core';
import { Chord } from './chord';
import { Scale } from './scale';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScaleDataService {

  constructor(
    private api: ApiService
  ) { }

  // Simulate get /scales
  getAllScales(): Observable<Scale[]> {
    return this.api.getAllScales();
  }

  getChordsBasedOnScaleId(scaleId: number): Observable<Chord[]>{
    return this.api.getChordsFromScaleId(scaleId);
  }

}
