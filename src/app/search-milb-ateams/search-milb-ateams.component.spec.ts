import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMilbATeamsComponent } from './search-milb-ateams.component';

describe('SearchMilbATeamsComponent', () => {
  let component: SearchMilbATeamsComponent;
  let fixture: ComponentFixture<SearchMilbATeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMilbATeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMilbATeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
