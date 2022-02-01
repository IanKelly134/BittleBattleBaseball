import { TestBed } from '@angular/core/testing';

import { SearchNlTeamsService } from './search-nl-teams.service';

describe('SearchNlTeamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchNlTeamsService = TestBed.get(SearchNlTeamsService);
    expect(service).toBeTruthy();
  });
});
