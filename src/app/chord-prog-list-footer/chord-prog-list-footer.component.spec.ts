import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordProgListFooterComponent } from './chord-prog-list-footer.component';

describe('ChordProgListFooterComponent', () => {
  let component: ChordProgListFooterComponent;
  let fixture: ComponentFixture<ChordProgListFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordProgListFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordProgListFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
