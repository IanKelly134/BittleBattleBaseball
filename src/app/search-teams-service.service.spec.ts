import { TestBed } from '@angular/core/testing';

import { SearchTeamsServiceService } from './search-teams-service.service';

describe('SearchTeamsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchTeamsServiceService = TestBed.get(SearchTeamsServiceService);
    expect(service).toBeTruthy();
  });
});
