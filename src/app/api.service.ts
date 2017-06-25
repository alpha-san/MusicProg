import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Scale } from './scale';
import { Chord } from './chord';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  // API: GET /scales
  public getAllScales(): Observable<Scale[]> {
    return this.http
      .get(API_URL + '/scales')
      .map(response => {
        const scales = response.json();
        return scales.map((scale) => new Scale(scale));
      })
      .catch(this.handleError);
  }

  // API: GET /chords/:scaleId
  public getChordsFromScaleId(scaleId: number) {
    return this.http
      .get(API_URL + '/chords?[belongsToScaleId]=' + scaleId)
      .map(response => {
        const chords = response.json();
        return chords.map((chord) => new Chord(chord));
      })
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
