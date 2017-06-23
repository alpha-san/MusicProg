import { TestBed, inject } from '@angular/core/testing';

import { ChordProgGeneratorService } from './chord-prog-generator.service';
import { Chord } from './chord';

describe('ChordProgGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChordProgGeneratorService]
    });
  });

  it('should be created', inject([ChordProgGeneratorService], (service: ChordProgGeneratorService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to add chords', inject([ChordProgGeneratorService], (service: ChordProgGeneratorService) => {
    expect(service.chords.length).toEqual(0);
    service.addChord(new Chord({ name: 'D', type: 'Major', notes: ['D3', 'F#3', 'A3'], fileUrl: '/assets/audio/dmajor.wav'}));
    expect(service.chords.length).toEqual(1);
    service.addChord(new Chord({ name: 'D', type: 'Major', notes: ['D3', 'F#3', 'A3'], fileUrl: '/assets/audio/dmajor.wav'}));
    expect(service.chords.length).toEqual(2);
  }));

  it('should be able to remove chords', inject([ChordProgGeneratorService], (service: ChordProgGeneratorService) => {
    // delete chords
    service.addChord(new Chord({ name: 'D', type: 'Major', notes: ['D3', 'F#3', 'A3'], fileUrl: '/assets/audio/dmajor.wav'}));
    service.addChord(new Chord({ name: 'D', type: 'Major', notes: ['D3', 'F#3', 'A3'], fileUrl: '/assets/audio/dmajor.wav'}));
    expect(service.chords.length).toEqual(2);
    service.deleteChord(1);
    expect(service.chords.length).toEqual(1);
    service.deleteChord(2);
    expect(service.chords.length).toEqual(0);

    // delete in different order
    service.addChord(new Chord({ name: 'D', type: 'Major', notes: ['D3', 'F#3', 'A3'], fileUrl: '/assets/audio/dmajor.wav'}));
    service.addChord(new Chord({ name: 'D', type: 'Major', notes: ['D3', 'F#3', 'A3'], fileUrl: '/assets/audio/dmajor.wav'}));
    service.deleteChord(4);
    expect(service.chords.length).toEqual(1);
  }));

  it('should be able to change the bpm', inject([ChordProgGeneratorService], (service: ChordProgGeneratorService) => {
    expect(service.bpm).toEqual(120);
    service.changeBpm(60);
    expect(service.bpm).toEqual(60);
  }));

  it('should be able to generate a midi file', inject([ChordProgGeneratorService], (service: ChordProgGeneratorService) => {

  }));
});
