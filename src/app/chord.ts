export class Chord {
    id: number;
    name: string;
    type: string;
    notes: Array<string>;
    fileUrl: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    setId(id: number) {
        this.id = id;
    }

    // TODO
    // Add Scale ref
}
