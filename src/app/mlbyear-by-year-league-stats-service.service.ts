import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MLBYearByYearBattingStatsViewModel } from './mlbyear-by-year-batting-stats-view-model';
import { MLBYearByYearPitchingStatsViewModel } from './mlbyear-by-year-pitching-stats-view-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MLBYearByYearLeagueStatsServiceService {

  constructor(private http: HttpClient) { }

  GetLeagueBattingStatsByYear(season: number): Observable<MLBYearByYearBattingStatsViewModel> {
    return this.http.get<MLBYearByYearBattingStatsViewModel>(environment.API_URL + "MLBStats/GetLeagueBattingStatsByYear/" + season,
      {
        responseType: "json"
      }
    );
  }

  GetLeaguePitchingStatsByYear(season: number): Observable<MLBYearByYearPitchingStatsViewModel> {
    return this.http.get<MLBYearByYearPitchingStatsViewModel>(environment.API_URL + "MLBStats/GetLeaguePitchingStatsByYear/" + season,
      {
        responseType: "json"
      }
    );
  }
}
