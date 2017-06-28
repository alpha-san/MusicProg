import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Scale } from '../scale';

@Component({
  selector: 'app-scale-selector',
  templateUrl: './scale-selector.component.html',
  styleUrls: ['./scale-selector.component.scss']
})
export class ScaleSelectorComponent implements OnInit {

  selectedScale: Scale;

  @Input() scales: Scale[];

  @Output()
  selectScale: EventEmitter<Scale> = new EventEmitter();

  @Output()
  playFile: EventEmitter<String> = new EventEmitter();

  @Output()
  scaleSelectionComplete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onScaleChange(scale: EventEmitter<Scale>) {
    this.selectScale.emit(this.selectedScale);
  }

  onPlayFile(fileUrl: String) {
    console.log(fileUrl);
    this.playFile.emit(fileUrl);
  }

  onScaleSelectionComplete(status: boolean) {
    this.scaleSelectionComplete.emit(status);
  }

}
