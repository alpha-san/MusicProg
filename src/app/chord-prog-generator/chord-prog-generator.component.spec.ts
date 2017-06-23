import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordProgGeneratorComponent } from './chord-prog-generator.component';

describe('ChordProgGeneratorComponent', () => {
  let component: ChordProgGeneratorComponent;
  let fixture: ComponentFixture<ChordProgGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordProgGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordProgGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
