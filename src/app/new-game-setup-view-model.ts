import { TeamSearchResultViewModel } from './team-search-result-view-model';

export class NewGameSetupViewModel {
    HomeTeamSelection: TeamSearchResultViewModel;
    AwayTeamSelection: TeamSearchResultViewModel;
    League: string;
    HomeTeamLeague: string;
    IsDesignatedHitterEnabled: boolean = true;
    HomeTeamYear: number;

    constructor() {
        this.IsDesignatedHitterEnabled = true;
    }

    SetHomeTeamSelection(selection: TeamSearchResultViewModel) {
        this.HomeTeamSelection = selection;
        this.HomeTeamLeague = selection.league;
        this.HomeTeamYear = selection.season;

        if (this.HomeTeamLeague) {
            if ((this.HomeTeamLeague.toLowerCase() == 'al' && this.HomeTeamYear >= 1973) || (this.HomeTeamLeague.toLowerCase() == 'nl' && this.HomeTeamYear >= 2022))
                this.IsDesignatedHitterEnabled = true;
            else
                this.IsDesignatedHitterEnabled = false;
        }
    }
}
