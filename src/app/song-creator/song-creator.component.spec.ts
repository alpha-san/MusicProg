import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SongCreatorComponent } from './song-creator.component';

import { Scale } from '../scale';
import { Chord } from '../chord';
import { Song } from '../song';

describe('SongCreatorComponent', () => {
  let component: SongCreatorComponent;
  let fixture: ComponentFixture<SongCreatorWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ 
        SongCreatorWrapper,
        SongCreatorComponent 
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongCreatorWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'song-creator-wrapper',
  template: '<song-creator [song]="song"></song-creator>'
})
class SongCreatorWrapper {
  song = new Song();
}
