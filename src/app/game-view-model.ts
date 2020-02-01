import { GameTeamViewModel } from './game-team-view-model';
import { GamePlayerViewModel } from './game-player-view-model';
import { GameInningViewModel } from './game-inning-view-model';
import { TeamSearchResultViewModel } from './team-search-result-view-model';
import { GameAtBatViewModel } from './game-at-bat-view-model';

export class GameViewModel {

    GameDate: Date;
    GameId: number;
    Ballpark: string;
    HomeTeam: GameTeamViewModel;
    AwayTeam: GameTeamViewModel;
    HomeTeamBench: GamePlayerViewModel[];
    AwayTeamBench: GamePlayerViewModel[];
    HomeTeamRuns: number;
    AwayTeamRuns: number;
    HomeTeamHits: number;
    AwayTeamHits: number;
    HomeTeamErrors: number;
    AwayTeamErrors: number;
    Innings: GameInningViewModel[];
    PlayByPlay: string;
    CurrentInning: GameInningViewModel;

    constructor(gameId: number, homeTeam: TeamSearchResultViewModel, awayTeam: TeamSearchResultViewModel) {
        this.GameId = gameId;
        this.Ballpark = homeTeam.ballpark;
        this.HomeTeam = new GameTeamViewModel(homeTeam.name, homeTeam.id, homeTeam.city, homeTeam.season, homeTeam.ballpark);
        this.AwayTeam = new GameTeamViewModel(awayTeam.name, awayTeam.id, awayTeam.city, awayTeam.season, awayTeam.ballpark);
        this.Innings = [
            new GameInningViewModel(1),
            new GameInningViewModel(2),
            new GameInningViewModel(3),
            new GameInningViewModel(4),
            new GameInningViewModel(5),
            new GameInningViewModel(6),
            new GameInningViewModel(7),
            new GameInningViewModel(8),
            new GameInningViewModel(9)
        ];

        this.Innings[0].AwayAtBats.push(new GameAtBatViewModel());
        this.Innings[0].AwayRunsScored = 0;

        this.CurrentInning = this.Innings[0];

        this.PlayByPlay = "Top of the 1st inning.... Play Ball!";
    }
}
