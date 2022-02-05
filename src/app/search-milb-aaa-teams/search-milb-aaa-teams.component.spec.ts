import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMilbAaaTeamsComponent } from './search-milb-aaa-teams.component';

describe('SearchMilbAaaTeamsComponent', () => {
  let component: SearchMilbAaaTeamsComponent;
  let fixture: ComponentFixture<SearchMilbAaaTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMilbAaaTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMilbAaaTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
