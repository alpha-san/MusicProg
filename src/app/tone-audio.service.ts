import { Injectable, OnInit } from '@angular/core';
import { Tone, Synth, PolySynth, Transport, Sequence, Now, Event, Part } from 'tone';

import { Scale } from './scale';
import { Chord } from './chord';
import { Song } from './song';

/**
 * @class ToneAudioService
 * 
 * ToneAudioService is used to play chords, scale notes, and chord progressions
 */
@Injectable()
export class ToneAudioService {

  /**
   * numOfVoices is used to create the PolySynth
   *   
   * @type {number}
   * @const
   */
  numOfVoices: number = 4;

 /**
  * polySynth is used to play multiple notes (i.e. chords) 
  */ 
  polySynth: PolySynth = new PolySynth(this.numOfVoices, Synth).toMaster();

  constructor() { }

  ngOnInit() {
  }

  /**
   * playChord
   * 
   * @param chord  The chord that is going to be played via tone
   */
  playChord(chord: Chord) {
    this.polySynth.triggerAttackRelease(chord.notes, "2n");
  }

  /**
   * playScale
   * 
   * @param scale  The scale that is going to be played via tone
   */
  playScale(scale: Scale) {
    /*
    Transport.stop();
    Transport.cancel(0);

    let synth = new Synth().toMaster();
    let myScale = scale.notes;
    let lastNote = myScale[0].slice(0, -1) + '5';
    myScale.push(lastNote);

    let seq: Sequence = new Sequence(function(time, note) {
      synth.triggerAttackRelease(note, "4n", time);
    }, myScale, "4n");
    seq.loop = 0;
    seq.start(0);
    seq.stop("2m");

    var tempo = 120;
    Transport.bpm.value = tempo
    synth.volume.value = -15;
    Transport.start("+0.1");*/

    let synth = new Synth().toMaster();
    let myScale = scale.notes.slice();
    let lastNote = myScale[0].slice(0, -1) + '5';
    myScale.push(lastNote);
            
    for (let i: number = 0; i < myScale.length; i++) {
      let note = myScale[i];
      let timeToStartNote: number = i * 500;

      setTimeout(function() {
        synth.triggerAttackRelease(note, "4n");
      }, timeToStartNote);

    }

  }

  playChordProgression(chords: Chord[]) {
    /*
    Transport.stop();
    Transport.cancel(0);

    let events = [];

    for(let i = 0; i < chords.length; i++) {
      events.push({time: (i * 2) + 'm', chord: chords[i]});
    }

    let synth: PolySynth = new PolySynth(4, Synth).toMaster();
    let part = new Part(function(time, chord){
	    //the notes given as the second element in the array
	    //will be passed in as the second argument
      synth.triggerAttackRelease(chord.notes, "2n");
    }, events).start(0);

    var tempo = 120;
    Transport.bpm.value = tempo
    synth.volume.value = -15;
    Transport.start("+0.1");*/

    let synth: PolySynth = new PolySynth(4, Synth).toMaster();
        
    for (let i: number = 0; i < chords.length; i++) {
      let chord: Chord = chords[i];
      let timeToStartNote: number = i * 1000;

      setTimeout(function() {
        synth.triggerAttackRelease(chord.notes, "2n");
      }, timeToStartNote);

    }

  }

}
