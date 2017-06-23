import { Chord } from './chord';
import { Scale } from './scale';

describe('Chord', () => {
  it('should create an instance', () => {
    expect(new Chord()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {

    const chord = new Chord({
      id: 0,
      name: 'C',
      type: 'Major',
      notes: ['c', 'e', 'g'],
      fileUrl: '/assets/audio/cmajor.wav',
      belongsToScale: new Scale({})
    });

    expect(chord.id).toEqual(0);
    expect(chord.name).toEqual('C');
    expect(chord.type).toEqual('Major');
    expect(chord.notes).toEqual(['c', 'e', 'g']);
    expect(chord.fileUrl).toEqual('/assets/audio/cmajor.wav');

  });

});


