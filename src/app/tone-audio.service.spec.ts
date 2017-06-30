import { TestBed, inject } from '@angular/core/testing';

import { ToneAudioService } from './tone-audio.service';

describe('ToneAudioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToneAudioService]
    });
  });

  it('should be created', inject([ToneAudioService], (service: ToneAudioService) => {
    expect(service).toBeTruthy();
  }));
});
