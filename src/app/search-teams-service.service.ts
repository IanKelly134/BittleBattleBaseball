import { Injectable } from '@angular/core';
import { TeamSearchResultViewModel } from './team-search-result-view-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RosterSearchResultViewModel } from './roster-search-result-view-model';

@Injectable({
  providedIn: 'root'
})
export class SearchTeamsServiceService {

  constructor(private http: HttpClient) { }

  GetTeamsBySeason(season: number): Observable<TeamSearchResultViewModel[]> {
    return this.http.get<TeamSearchResultViewModel[]>("http://localhost:50438/api/Team/" + season,
      {
        responseType: "json"
      }
    );
  }

  GetRosterBySeason(season: number, teamId: number): Observable<RosterSearchResultViewModel> {
    return this.http.get<RosterSearchResultViewModel>("http://localhost:50438/api/Team/" + season + "/" + teamId,
      {
        responseType: "json"
      }
    );
  }
}
