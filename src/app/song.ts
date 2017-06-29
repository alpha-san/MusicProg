import { Scale } from './scale';
import { Chord } from './chord';
 
export class Song {
    
    id: number; 
    name: String;
    bpm: number;
    scale: Scale;
    chords: Chord[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
