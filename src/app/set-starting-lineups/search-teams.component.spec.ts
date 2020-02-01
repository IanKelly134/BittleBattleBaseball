import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTeamsComponent } from '../search-teams/search-teams.component';

describe('SearchTeamsComponent', () => {
  let component: SearchTeamsComponent;
  let fixture: ComponentFixture<SearchTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTeamsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
