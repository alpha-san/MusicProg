import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleSelectorComponent } from './scale-selector.component';

describe('ScaleSelectorComponent', () => {
  let component: ScaleSelectorComponent;
  let fixture: ComponentFixture<ScaleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaleSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
