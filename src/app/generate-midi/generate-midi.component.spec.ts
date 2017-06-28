import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMidiComponent } from './generate-midi.component';

describe('GenerateMidiComponent', () => {
  let component: GenerateMidiComponent;
  let fixture: ComponentFixture<GenerateMidiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateMidiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateMidiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
