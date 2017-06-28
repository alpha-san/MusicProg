import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordSelectorComponent } from './chord-selector.component';

describe('ChordSelectorComponent', () => {
  let component: ChordSelectorComponent;
  let fixture: ComponentFixture<ChordSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
