import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamSearchResultViewModel } from '../team-search-result-view-model';
import { SearchTeamsServiceService } from '../search-teams-service.service';
import { NewGameSetupViewModel } from '../new-game-setup-view-model';

@Component({
  selector: 'app-search-teams',
  templateUrl: './search-teams.component.html',
  styleUrls: ['./search-teams.component.scss']
})
export class SearchTeamsComponent implements OnInit {
  GameSetup: NewGameSetupViewModel;
  SearchableSeasons: number[] = new Array<number>();
  SearchingHomeTeams: boolean;
  SearchingAwayTeams: boolean;
  constructor(private router: Router, private searchTeamsService: SearchTeamsServiceService) {
    this.GameSetup = new NewGameSetupViewModel();
    let today = new Date();
    for (let i: number = today.getFullYear(); i > 1900; i--) {
      this.SearchableSeasons.push(i);
    }
  }

  ngOnInit() {
  }

  setupNewSinglePlayerGame() {
    this.router.navigateByUrl("searchteams");
  }

  SetLineups() {

    let newGameId = ((new Date().getTime() * 10000) + 621355968000000000);
    localStorage.setItem('game_setup_' + newGameId, JSON.stringify(this.GameSetup));

    this.router.navigateByUrl("/setlineups/" + newGameId);
  }

  HomeSearchResults: TeamSearchResultViewModel[] = new Array<TeamSearchResultViewModel>();

  AwaySearchResults: TeamSearchResultViewModel[] = new Array<TeamSearchResultViewModel>();

  SearchTeams(isHomeTeam: boolean, year: number) {
    if (isHomeTeam) {
      this.SearchingHomeTeams = true;
      this.HomeSearchResults = [];
      this.searchTeamsService.GetTeamsBySeason(year).subscribe(results => {
        this.HomeSearchResults = results;
        this.SearchingHomeTeams = false;
      });

    }
    else {
      this.SearchingAwayTeams = true;
      this.AwaySearchResults = [];
      this.searchTeamsService.GetTeamsBySeason(year).subscribe(results => {
        this.AwaySearchResults = results;
        this.SearchingAwayTeams = false;
      });
    }
  }

  SetHomeTeamSelection(selection: TeamSearchResultViewModel) {
    this.GameSetup.HomeTeamSelection = selection;
    this.scrollToTop();
  }

  SetAwayTeamSelection(selection: TeamSearchResultViewModel) {
    this.GameSetup.AwayTeamSelection = selection;
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
