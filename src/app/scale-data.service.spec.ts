import { TestBed, inject } from '@angular/core/testing';

import { ScaleDataService } from './scale-data.service';
import { Scale } from './scale';
import { Chord } from './chord';

import { ApiService } from './api.service';
import { ApiMockService } from './api-mock.service';

describe('ScaleDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        ScaleDataService ,
        {
          provide: ApiService,
          useClass: ApiMockService
        }
      ]
    });
  });

  it('should be created', inject([ScaleDataService], (service: ScaleDataService) => {
    expect(service).toBeTruthy();
  }));

});
