import { Scale } from './scale';

export class Chord {

    // Used to keep track of chord in order to remove it
    id: number;
    name: string;
    type: string;
    length: number;
    notes: Array<string>;
    fileUrl: string;
    belongsToScaleId: Array<number>;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    // Id is set before chord is added to progression
    setId(id: number) {
        this.id = id;
    }

}
