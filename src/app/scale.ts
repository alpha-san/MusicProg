export class Scale {
    name: string;
    type: string;
    notes: Array<string>;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    // TODO
    // Add Chord ref
}
