// Different types of scales
// refer to https://en.wikipedia.org/wiki/List_of_musical_scales_and_modes

export class Scale {
    name: string;
    type: string;
    notes: Array<string>;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
