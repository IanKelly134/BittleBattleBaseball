import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMilbAaTeamsComponent } from './search-milb-aa-teams.component';

describe('SearchMilbAaTeamsComponent', () => {
  let component: SearchMilbAaTeamsComponent;
  let fixture: ComponentFixture<SearchMilbAaTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMilbAaTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMilbAaTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
