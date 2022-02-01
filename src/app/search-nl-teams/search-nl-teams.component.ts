import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamSearchResultViewModel } from '../team-search-result-view-model';
import { SearchNlTeamsService } from '../search-nl-teams.service'
import { NewGameSetupViewModel } from '../new-game-setup-view-model';


@Component({
  selector: 'app-search-nl-teams',
  templateUrl: './search-nl-teams.component.html',
  styleUrls: ['./search-nl-teams.component.scss']
})
export class SearchNlTeamsComponent implements OnInit {
  GameSetup: NewGameSetupViewModel;
  SearchableSeasons: number[] = new Array<number>();
  SearchingHomeTeams: boolean;
  SearchingAwayTeams: boolean;
  constructor(private router: Router, private searchNlTeamsService: SearchNlTeamsService) {
    this.GameSetup = new NewGameSetupViewModel();
    let today = new Date();
    for (let i: number = 1948; i > 1919; i--) {
      this.SearchableSeasons.push(i);
    }
  }

  ngOnInit() {
  }

  setupNewSinglePlayerGame() {
    this.router.navigateByUrl("searchnlteams");
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
      this.searchNlTeamsService.GetTeamsBySeason(year).subscribe(results => {
        this.HomeSearchResults = results;
        this.SearchingHomeTeams = false;
      });

    }
    else {
      this.SearchingAwayTeams = true;
      this.AwaySearchResults = [];
      this.searchNlTeamsService.GetTeamsBySeason(year).subscribe(results => {
        this.AwaySearchResults = results;
        this.SearchingAwayTeams = false;
      });
    }
  }

  SetHomeTeamSelection(selection: TeamSearchResultViewModel) {
    this.GameSetup.HomeTeamSelection = selection;

    if (this.GameSetup.AwayTeamSelection) {
      this.scrollToTop();
    }
  }

  SetAwayTeamSelection(selection: TeamSearchResultViewModel) {
    this.GameSetup.AwayTeamSelection = selection;
    if (this.GameSetup.HomeTeamSelection) {
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
