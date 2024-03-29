import { GameTeamViewModel } from './game-team-view-model';
import { GamePlayerViewModel } from './game-player-view-model';
import { GameInningViewModel } from './game-inning-view-model';
import { TeamSearchResultViewModel } from './team-search-result-view-model';
import { GameAtBatViewModel } from './game-at-bat-view-model';
import { HitterPlayerSeasonViewModel } from './hitter-player-season-view-model';
import { PlayerViewModel } from './player-view-model';
import { EnumAtBatResult } from './enum-at-bat-result.enum';

export class GameViewModel {

    GameDate: Date;
    GameId: number;
    Ballpark: string;
    HomeTeam: GameTeamViewModel;
    AwayTeam: GameTeamViewModel;
    HomeTeamBench: GamePlayerViewModel[];
    AwayTeamBench: GamePlayerViewModel[];
    HomeTeamRuns: number = 0;
    AwayTeamRuns: number = 0;
    HomeTeamHits: number = 0;
    AwayTeamHits: number = 0;
    HomeTeamErrors: number = 0;
    AwayTeamErrors: number = 0;
    Innings: GameInningViewModel[];
    PlayByPlays: string[] = [];
    CurrentInning: GameInningViewModel;
    CurrentAtBat: GameAtBatViewModel;
    IsDesignatedHitterEnabled: boolean;
    RunnerOnFirst: GamePlayerViewModel;
    RunnerOnSecond: GamePlayerViewModel;
    RunnerOnThird: GamePlayerViewModel;
    RunnersWhoScoredOnPlay: GamePlayerViewModel[];

    IsGameInProgress: boolean = true;

    constructor() {

    }

    SetValues(gameId: number, homeTeam: TeamSearchResultViewModel, awayTeam: TeamSearchResultViewModel, isDesignatedHitterEnabled: boolean) {
        this.GameId = gameId;
        this.Ballpark = homeTeam.ballpark;
        this.IsDesignatedHitterEnabled = isDesignatedHitterEnabled;
        this.HomeTeam = new GameTeamViewModel(homeTeam.name, homeTeam.id, homeTeam.city, homeTeam.season, homeTeam.ballpark, homeTeam.logoUrl, isDesignatedHitterEnabled, homeTeam.fullTeamName);
        this.AwayTeam = new GameTeamViewModel(awayTeam.name, awayTeam.id, awayTeam.city, awayTeam.season, awayTeam.ballpark, awayTeam.logoUrl, isDesignatedHitterEnabled, awayTeam.fullTeamName);
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
        this.PlayByPlays = [];
        this.RunnerOnFirst = null;
        this.RunnerOnSecond = null;
        this.RunnerOnThird = null;
        this.HomeTeamHits = 0;
        this.HomeTeamRuns = 0;
        this.HomeTeamErrors = 0;
        this.AwayTeamHits = 0;
        this.AwayTeamRuns = 0;
        this.AwayTeamErrors = 0;
        this.IsGameInProgress = true;
        this.SetBattersOBRPAccordingToNewPitcherWHIP();

        this.HomeTeam.NextBatter = this.HomeTeam.GetBatterAtLineupPosition(1);
        this.AwayTeam.NextBatter = this.AwayTeam.GetBatterAtLineupPosition(1);

        this.NewAtBat();

        this.PlayByPlays.push("Top of the 1st inning.... Play Ball!");
    }

    SetBattersOBRPAccordingToNewPitcherWHIP() {
        this.SetAWAYTEAMBattersOBRPAccordingToNewPitcherWHIP();
        this.SetHOMETEAMBattersOBRPAccordingToNewPitcherWHIP();
    }

    SetAWAYTEAMBattersOBRPAccordingToNewPitcherWHIP() {
        var pitcherHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
        pitcherHitterPlayerSeasonViewModel.obp = 0.226;
        pitcherHitterPlayerSeasonViewModel.slg = 0.305;
        pitcherHitterPlayerSeasonViewModel.avg = 0.200;
        pitcherHitterPlayerSeasonViewModel.pa = 600;
        pitcherHitterPlayerSeasonViewModel.ab = 500;
        pitcherHitterPlayerSeasonViewModel.hr = 1;
        pitcherHitterPlayerSeasonViewModel.rbi = 19;
        pitcherHitterPlayerSeasonViewModel.sb = 20;
        pitcherHitterPlayerSeasonViewModel.bb = 100;
        pitcherHitterPlayerSeasonViewModel.player = new PlayerViewModel();
        pitcherHitterPlayerSeasonViewModel.player.playerName = this.AwayTeam.Pitcher.Name;
        this.AwayTeam.Pitcher.HittingSeasonStats = pitcherHitterPlayerSeasonViewModel;

        /*
          this.AwayTeam.Pitcher.HittingSeasonStats.OBRP = this.HomeTeam.Pitcher.PitchingSeasonStats.PX * .225;//TODO - FIX.AwayTeam.FirstBaseman.HittingSeasonStats.obp;
        
        this.AwayTeam.Catcher.HittingSeasonStats.OBRP = this.HomeTeam.Pitcher.PitchingSeasonStats.PX * this.AwayTeam.Catcher.HittingSeasonStats.obp;
        this.AwayTeam.FirstBaseman.HittingSeasonStats.OBRP = this.HomeTeam.Pitcher.PitchingSeasonStats.PX * this.AwayTeam.FirstBaseman.HittingSeasonStats.obp;
        this.AwayTeam.SecondBaseman.HittingSeasonStats.OBRP = this.HomeTeam.Pitcher.PitchingSeasonStats.PX * this.AwayTeam.SecondBaseman.HittingSeasonStats.obp;
        this.AwayTeam.Shortstop.HittingSeasonStats.OBRP = this.HomeTeam.Pitcher.PitchingSeasonStats.PX * this.AwayTeam.Shortstop.HittingSeasonStats.obp;
        this.AwayTeam.ThirdBaseman.HittingSeasonStats.OBRP = this.HomeTeam.Pitcher.PitchingSeasonStats.PX * this.AwayTeam.ThirdBaseman.HittingSeasonStats.obp;
        this.AwayTeam.LeftFielder.HittingSeasonStats.OBRP = this.HomeTeam.Pitcher.PitchingSeasonStats.PX * this.AwayTeam.LeftFielder.HittingSeasonStats.obp;
        this.AwayTeam.CenterFielder.HittingSeasonStats.OBRP = this.HomeTeam.Pitcher.PitchingSeasonStats.PX * this.AwayTeam.CenterFielder.HittingSeasonStats.obp;
        this.AwayTeam.RightFielder.HittingSeasonStats.OBRP = this.HomeTeam.Pitcher.PitchingSeasonStats.PX * this.AwayTeam.RightFielder.HittingSeasonStats.obp;
        */
    }

    SetHOMETEAMBattersOBRPAccordingToNewPitcherWHIP() {
        var pitcherHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
        pitcherHitterPlayerSeasonViewModel.obp = 0.226;
        pitcherHitterPlayerSeasonViewModel.slg = 0.305;
        pitcherHitterPlayerSeasonViewModel.avg = 0.200;
        pitcherHitterPlayerSeasonViewModel.pa = 600;
        pitcherHitterPlayerSeasonViewModel.ab = 500;
        pitcherHitterPlayerSeasonViewModel.hr = 3;
        pitcherHitterPlayerSeasonViewModel.rbi = 21;
        pitcherHitterPlayerSeasonViewModel.sb = 20;
        pitcherHitterPlayerSeasonViewModel.bb = 100;
        pitcherHitterPlayerSeasonViewModel.player = new PlayerViewModel();
        pitcherHitterPlayerSeasonViewModel.player.playerName = this.HomeTeam.Pitcher.Name;
        this.HomeTeam.Pitcher.HittingSeasonStats = pitcherHitterPlayerSeasonViewModel;
        this.HomeTeam.Pitcher.HittingSeasonStats.OBRP = this.AwayTeam.Pitcher.PitchingSeasonStats.PX * .225;//TODO - FIX.AwayTeam.FirstBaseman.HittingSeasonStats.obp;
        this.HomeTeam.Catcher.HittingSeasonStats.OBRP = this.AwayTeam.Pitcher.PitchingSeasonStats.PX * this.HomeTeam.Catcher.HittingSeasonStats.obp;
        this.HomeTeam.FirstBaseman.HittingSeasonStats.OBRP = this.AwayTeam.Pitcher.PitchingSeasonStats.PX * this.HomeTeam.FirstBaseman.HittingSeasonStats.obp;
        this.HomeTeam.SecondBaseman.HittingSeasonStats.OBRP = this.AwayTeam.Pitcher.PitchingSeasonStats.PX * this.HomeTeam.SecondBaseman.HittingSeasonStats.obp;
        this.HomeTeam.Shortstop.HittingSeasonStats.OBRP = this.AwayTeam.Pitcher.PitchingSeasonStats.PX * this.HomeTeam.Shortstop.HittingSeasonStats.obp;
        this.HomeTeam.ThirdBaseman.HittingSeasonStats.OBRP = this.AwayTeam.Pitcher.PitchingSeasonStats.PX * this.HomeTeam.ThirdBaseman.HittingSeasonStats.obp;
        this.HomeTeam.LeftFielder.HittingSeasonStats.OBRP = this.AwayTeam.Pitcher.PitchingSeasonStats.PX * this.HomeTeam.LeftFielder.HittingSeasonStats.obp;
        this.HomeTeam.CenterFielder.HittingSeasonStats.OBRP = this.AwayTeam.Pitcher.PitchingSeasonStats.PX * this.HomeTeam.CenterFielder.HittingSeasonStats.obp;
        this.HomeTeam.RightFielder.HittingSeasonStats.OBRP = this.AwayTeam.Pitcher.PitchingSeasonStats.PX * this.HomeTeam.RightFielder.HittingSeasonStats.obp;
    }

    NextInning() {
        this.RunnerOnFirst = null;
        this.RunnerOnSecond = null;
        this.RunnerOnThird = null;
        this.RunnersWhoScoredOnPlay = [];

        this.CurrentInning = this.Innings[this.CurrentInning.InningNumber];//Current Inning becomes next inning
        this.CurrentInning.AwayRunsScored = 0;
        let inningText = '';

        if (this.CurrentInning.InningNumber == 2) {
            inningText = "Top of the 2nd inning...";
        }
        else if (this.CurrentInning.InningNumber == 3) {
            inningText = "Top of the 3rd inning...";
        }
        else {
            inningText = "Top of the " + this.CurrentInning.InningNumber + "th inning...";
        }

        this.PlayByPlays.push(inningText);
    }

    NewAtBat() {
        if (this.CurrentInning.IsBottomOfInning) {
            let newAB = new GameAtBatViewModel();
            newAB.Pitcher = this.AwayTeam.Pitcher;
            this.HomeTeam.LastBatter = this.HomeTeam.CurrentBatter;
            if (this.HomeTeam.CurrentBatter != null && this.HomeTeam.CurrentBatter.BattingOrderNumber < 9) {
                this.HomeTeam.CurrentBatter = this.HomeTeam.NextBatter;
                this.HomeTeam.NextBatter = this.HomeTeam.GetBatterAtLineupPosition(this.HomeTeam.CurrentBatter.BattingOrderNumber < 9 ? this.HomeTeam.CurrentBatter.BattingOrderNumber + 1 : 1);
                newAB.Batter = this.HomeTeam.CurrentBatter;
            } else {
                this.HomeTeam.CurrentBatter = this.HomeTeam.GetBatterAtLineupPosition(1);
                this.HomeTeam.NextBatter = this.HomeTeam.GetBatterAtLineupPosition(this.HomeTeam.CurrentBatter.BattingOrderNumber + 1);
                newAB.Batter = this.HomeTeam.CurrentBatter;
            }

            this.CurrentInning.HomeAtBats.push(newAB);
            this.CurrentAtBat = newAB;
        } else {
            let newAB = new GameAtBatViewModel();
            newAB.Pitcher = this.HomeTeam.Pitcher;
            this.AwayTeam.LastBatter = this.AwayTeam.CurrentBatter;
            if (this.AwayTeam.CurrentBatter != null && this.AwayTeam.CurrentBatter.BattingOrderNumber < 9) {
                this.AwayTeam.CurrentBatter = this.AwayTeam.NextBatter;
                this.AwayTeam.NextBatter = this.AwayTeam.GetBatterAtLineupPosition(this.AwayTeam.CurrentBatter.BattingOrderNumber < 9 ? this.AwayTeam.CurrentBatter.BattingOrderNumber + 1 : 1);
                newAB.Batter = this.AwayTeam.CurrentBatter;
            }
            else {
                this.AwayTeam.CurrentBatter = this.AwayTeam.GetBatterAtLineupPosition(1);
                this.AwayTeam.NextBatter = this.AwayTeam.GetBatterAtLineupPosition(this.AwayTeam.CurrentBatter.BattingOrderNumber + 1);
                newAB.Batter = this.AwayTeam.CurrentBatter;
            }

            this.CurrentInning.AwayAtBats.push(newAB);
            this.CurrentAtBat = newAB;
        }
    }

    GetAtBats(playerId: number, isHome: boolean): number {
        let returnVal = 0;

        if (this.Innings) {
            for (let inning of this.Innings) {
                for (let ab of (isHome ? inning.HomeAtBats : inning.AwayAtBats)) {
                    if (ab.Batter.Id == playerId && (ab.Result != EnumAtBatResult.Walk && ab.Result != EnumAtBatResult.HBP
                        && ab.Result != EnumAtBatResult.Sacrifce && ab.Result != EnumAtBatResult.Error)) {
                        returnVal++;
                    }
                }
            }
        }

        return returnVal;
    }

    GetHits(playerId: number, isHome: boolean): number {
        let returnVal = 0;

        if (this.Innings) {
            for (let inning of this.Innings) {
                for (let ab of (isHome ? inning.HomeAtBats : inning.AwayAtBats)) {
                    if (ab.Batter.Id == playerId) {
                        if (ab.Result == EnumAtBatResult.Single || ab.Result == EnumAtBatResult.Double || ab.Result == EnumAtBatResult.Triple || ab.Result == EnumAtBatResult.HomeRun) {
                            returnVal++;
                        }
                    }
                }
            }
        }

        return returnVal;
    }

    GetWalks(playerId: number, isHome: boolean): number {
        let returnVal = 0;

        if (this.Innings) {
            for (let inning of this.Innings) {
                for (let ab of (isHome ? inning.HomeAtBats : inning.AwayAtBats)) {
                    if (ab.Batter.Id == playerId) {
                        if (ab.Result == EnumAtBatResult.Walk) {
                            returnVal++;
                        }
                    }
                }
            }
        }

        return returnVal;
    }

    GetStrikeouts(playerId: number, isHome: boolean): number {
        let returnVal = 0;

        if (this.Innings) {
            for (let inning of this.Innings) {
                for (let ab of (isHome ? inning.HomeAtBats : inning.AwayAtBats)) {
                    if (ab.Batter.Id == playerId) {
                        if (ab.Result == EnumAtBatResult.StrikeOut) {
                            returnVal++;
                        }
                    }
                }
            }
        }

        return returnVal;
    }

    GetInningsPitched(playerId: number, isHome: boolean): string {
        let outsRecorded = 0;

        if (this.Innings) {
            for (let inning of this.Innings) {
                for (let ab of (isHome ? inning.AwayAtBats : inning.HomeAtBats)) {
                    if (ab.Pitcher.Id == playerId && (ab.Result == EnumAtBatResult.FieldersChoice
                        || ab.Result == EnumAtBatResult.GIDP || ab.Result == EnumAtBatResult.GITP || ab.Result == EnumAtBatResult.Out
                        || ab.Result == EnumAtBatResult.Sacrifce || ab.Result == EnumAtBatResult.StrikeOut)) {

                        if (ab.Result == EnumAtBatResult.GITP) {
                            outsRecorded += 3;
                        }
                        else if (ab.Result == EnumAtBatResult.GIDP) {
                            outsRecorded += 2;
                        } else {
                            outsRecorded++;
                        }
                    }
                }
            }
        }

        let inningsPitched = Math.floor(outsRecorded / 3);
        let inningsPitchedPartial = outsRecorded % 3;

        let returnVal = inningsPitched + "." + inningsPitchedPartial;

        return returnVal;
    }

    GetHitsAllowed(playerId: number, isHome: boolean): number {
        let returnVal = 0;

        if (this.Innings) {
            for (let inning of this.Innings) {
                for (let ab of (isHome ? inning.AwayAtBats : inning.HomeAtBats)) {
                    if (ab.Pitcher.Id == playerId) {
                        if (ab.Result == EnumAtBatResult.Single || ab.Result == EnumAtBatResult.Double
                            || ab.Result == EnumAtBatResult.Triple || ab.Result == EnumAtBatResult.HomeRun) {
                            returnVal++;
                        }
                    }
                }
            }
        }

        return returnVal;
    }

    GetWalksAllowed(playerId: number, isHome: boolean): number {
        let returnVal = 0;

        if (this.Innings) {
            for (let inning of this.Innings) {
                for (let ab of (isHome ? inning.AwayAtBats : inning.HomeAtBats)) {
                    if (ab.Pitcher.Id == playerId) {
                        if (ab.Result == EnumAtBatResult.Walk) {
                            returnVal++;
                        }
                    }
                }
            }
        }

        return returnVal;
    }

    GetStrikeoutsByPitcher(playerId: number, isHome: boolean): number {
        let returnVal = 0;

        if (this.Innings) {
            for (let inning of this.Innings) {
                for (let ab of (isHome ? inning.AwayAtBats : inning.HomeAtBats)) {
                    if (ab.Pitcher.Id == playerId) {
                        if (ab.Result == EnumAtBatResult.StrikeOut) {
                            returnVal++;
                        }
                    }
                }
            }
        }

        return returnVal;
    }

    GetRunsAllowed(playerId: number, isHome: boolean): number {
        let returnVal = 0;

        if (this.Innings) {
            for (let inning of this.Innings) {
                for (let ab of (isHome ? inning.AwayAtBats : inning.HomeAtBats)) {
                    if (ab.Pitcher.Id == playerId) {
                        returnVal += ab.RunsScored;
                    }
                }
            }
        }

        return returnVal;
    }

    GetHomeRunsAllowed(playerId: number, isHome: boolean): number {
        let returnVal = 0;

        if (this.Innings) {
            for (let inning of this.Innings) {
                for (let ab of (isHome ? inning.AwayAtBats : inning.HomeAtBats)) {
                    if (ab.Pitcher.Id == playerId) {
                        if (ab.Result == EnumAtBatResult.HomeRun) {
                            returnVal++;
                        }
                    }
                }
            }
        }

        return returnVal;
    }
}
