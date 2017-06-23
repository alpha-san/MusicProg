import { TestBed, inject } from '@angular/core/testing';

import { ScaleDataService } from './scale-data.service';
import { Scale } from './scale';

describe('ScaleDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScaleDataService]
    });
  });

  it('should be created', inject([ScaleDataService], (service: ScaleDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to retrieve list of scales', inject([ScaleDataService], (service: ScaleDataService) => {
    let scales: Scale[] = service.getAllScales();  
    expect(scales.length).toBeGreaterThan(0);
  }));
});
