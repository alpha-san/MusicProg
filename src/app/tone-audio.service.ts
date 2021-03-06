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
