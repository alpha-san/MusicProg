import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generate-midi',
  templateUrl: './generate-midi.component.html',
  styleUrls: ['./generate-midi.component.scss']
})
export class GenerateMidiComponent implements OnInit {

  @Output()
  generateMidi: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onGenerateMidiFile() {
    this.generateMidi.emit();
  }

}
