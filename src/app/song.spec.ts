import { Song } from './song';
import { Scale } from './scale';
import { Chord } from './chord';

describe('Song', () => {
  it('should create an instance', () => {
    expect(new Song()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {

    const scale = new Scale({
      name: 'C',
      type: 'Major',
      notes: ['c', 'd', 'e', 'f', 'g', 'a', 'b', 'c'],
      fileUrl: '/assets/audio/cmajorscale.wav'
    })

    const chord = new Chord({
      id: 0,
      name: 'C',
      type: 'Major',
      notes: ['c', 'e', 'g'],
      fileUrl: '/assets/audio/cmajor.wav',
      belongsToScale: new Scale({})
    });

    const song = new Song({
      name: 'my first song',
      scale: scale,
      chords: [ chord ],
      bpm: 120
    });

    expect(song.name).toEqual('my first song');
    expect(song.chords).toEqual([chord]);
    expect(song.bpm).toEqual(120);
    expect(song.scale).toEqual(scale);

  });
});
