import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNlTeamsComponent } from './search-nl-teams.component';

describe('SearchNlTeamsComponent', () => {
  let component: SearchNlTeamsComponent;
  let fixture: ComponentFixture<SearchNlTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNlTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNlTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
