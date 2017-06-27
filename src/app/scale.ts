// Different types of scales
// refer to https://en.wikipedia.org/wiki/List_of_musical_scales_and_modes

export class Scale {
    id: number;
    name: string;
    type: string;
    notes: Array<string>;
    fileUrl: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
