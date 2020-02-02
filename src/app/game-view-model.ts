import { GameTeamViewModel } from './game-team-view-model';
import { GamePlayerViewModel } from './game-player-view-model';
import { GameInningViewModel } from './game-inning-view-model';
import { TeamSearchResultViewModel } from './team-search-result-view-model';
import { GameAtBatViewModel } from './game-at-bat-view-model';
import { Injectable } from '@angular/core';

@Injectable()
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
    CurrentAtBat: GameAtBatViewModel;

    constructor() {

    }

    SetValues(gameId: number, homeTeam: TeamSearchResultViewModel, awayTeam: TeamSearchResultViewModel) {
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

        this.Innings[0].AwayRunsScored = 0;
        this.CurrentInning = this.Innings[0];

    }

    StartGame() {
        this.HomeTeam.NextBatter = this.HomeTeam.GetBatterAtLineupPosition(1);
        this.AwayTeam.NextBatter = this.AwayTeam.GetBatterAtLineupPosition(1);
        this.NewAtBat();

        this.PlayByPlay = "Top of the 1st inning.... Play Ball!";
    }

    NextInning() {
        this.CurrentInning = this.Innings[this.CurrentInning.InningNumber];//Current Inning becomes next inning
        this.CurrentInning.AwayRunsScored = 0;
    }

    NewAtBat() {
        if (this.CurrentInning.IsBottomOfInning) {
            let newAB = new GameAtBatViewModel();
            newAB.Pitcher = this.AwayTeam.Pitcher;
            this.HomeTeam.LastBatter = this.HomeTeam.CurrentBatter;
            this.HomeTeam.CurrentBatter = this.HomeTeam.NextBatter;
            this.HomeTeam.NextBatter = this.HomeTeam.GetBatterAtLineupPosition(this.HomeTeam.CurrentBatter.BattingOrderNumber + 1);
            newAB.Batter = this.HomeTeam.CurrentBatter;
            this.CurrentInning.HomeAtBats.push(newAB);
            this.CurrentAtBat = newAB;
        } else {
            let newAB = new GameAtBatViewModel();
            newAB.Pitcher = this.HomeTeam.Pitcher;
            this.AwayTeam.LastBatter = this.AwayTeam.CurrentBatter;
            this.AwayTeam.CurrentBatter = this.AwayTeam.NextBatter;
            this.AwayTeam.NextBatter = this.AwayTeam.GetBatterAtLineupPosition(this.AwayTeam.CurrentBatter.BattingOrderNumber + 1);
            newAB.Batter = this.AwayTeam.CurrentBatter;
            this.CurrentInning.AwayAtBats.push(newAB);
            this.CurrentAtBat = newAB;
        }
    }
}
