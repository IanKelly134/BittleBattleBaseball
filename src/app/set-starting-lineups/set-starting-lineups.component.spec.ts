import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetStartingLineupsComponent } from './set-starting-lineups.component';

describe('SetStartingLineupsComponent', () => {
  let component: SetStartingLineupsComponent;
  let fixture: ComponentFixture<SetStartingLineupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetStartingLineupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetStartingLineupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
