import {Scale} from './scale';

describe('Scale', () => {
  it('should create an instance', () => {
    expect(new Scale()).toBeTruthy();
  });

  
  it('should accept values in the constructor', () => {
    const scale = new Scale({
      name: 'C',
      type: 'Major',
      notes: ['c', 'e', 'g']
    });

    expect(scale.name).toEqual('C');
    expect(scale.type).toEqual('Major');
    expect(scale.notes).toEqual(['c', 'e', 'g']);

  });

});
