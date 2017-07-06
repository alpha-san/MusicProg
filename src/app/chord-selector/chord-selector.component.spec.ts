import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordSelectorComponent } from './chord-selector.component';

describe('ChordSelectorComponent', () => {
  let component: ChordSelectorComponent;
  let fixture: ComponentFixture<ChordSelectorWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ChordSelectorComponent,
        ChordSelectorWrapper
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordSelectorWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'chord-selector-wrapper',
  template: '<chord-selector [scaleNotes]="scaleNotes"></chord-selector>'
})
class ChordSelectorWrapper {
  scaleNotes = [];
}