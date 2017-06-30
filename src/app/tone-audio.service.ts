import { Injectable, OnInit } from '@angular/core';
import { Tone, Synth, PolySynth, Transport, Sequence, Now } from 'tone';

import { Scale } from './scale';
import { Chord } from './chord';
import { Song } from './song';

@Injectable()
export class ToneAudioService {

  constructor() { }

  ngOnInit() {
  }

  playChord(chord: Chord) {

    let numOfVoices: number = chord.notes.length;

    let synth: PolySynth = new PolySynth(numOfVoices, Synth).toMaster();
    synth.triggerAttackRelease(chord.notes, "2n");

    //let synth: PolySynth = new PolySynth(4, Synth).toMaster();
    //synth.triggerAttackRelease(["C4", "E4", "G4", "B4"], "2n");

  }

  playScale(scale: Scale) {

    console.log('tone-audio: playScale()');

    let synth = new Synth().toMaster();
    let myScale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];

    //let pattern = new Pattern(function (time, note) {
      //the order of the notes passed in depends on the pattern
      //synth.triggerAttackRelease(note, "4n", time);
    //}, myScale, patternName).start(0);

    let seq = new Sequence(function(time, note) {
      synth.triggerAttackRelease(note, "4n", time);
    }, myScale, "4n");
    seq.start(Now);
    seq.loop = 0;
    seq.stop(Now + 4);

    var tempo = 120;
    Transport.bpm.value = tempo
    synth.volume.value = 10;
    Transport.start("+0.1");

  }

}
