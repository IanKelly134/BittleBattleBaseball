import { TestBed } from '@angular/core/testing';

import { MLBYearByYearLeagueStatsServiceService } from './mlbyear-by-year-league-stats-service.service';

describe('MLBYearByYearLeagueStatsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MLBYearByYearLeagueStatsServiceService = TestBed.get(MLBYearByYearLeagueStatsServiceService);
    expect(service).toBeTruthy();
  });
});
