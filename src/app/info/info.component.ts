import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Output()
  createASong: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onCreateASong() {
    this.createASong.emit();
  }

}
