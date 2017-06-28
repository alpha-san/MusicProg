import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Output()
  getStarted: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onGetStarted() {
    this.getStarted.emit();
  }

}
