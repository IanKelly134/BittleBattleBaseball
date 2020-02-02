import { GamePlayerViewModel } from './game-player-view-model';

export class GameTeamViewModel {
    TeamName: string;
    TeamId: number;
    TeamCity: string;
    TeamSeason: number;
    Ballpark: string;

    Catcher: GamePlayerViewModel;
    FirstBaseman: GamePlayerViewModel;
    SecondBaseman: GamePlayerViewModel;
    Shortstop: GamePlayerViewModel;
    ThirdBaseman: GamePlayerViewModel;
    LeftFielder: GamePlayerViewModel;
    CenterFielder: GamePlayerViewModel;
    RightFielder: GamePlayerViewModel;
    Pitcher: GamePlayerViewModel;

    CurrentBatter: GamePlayerViewModel;
    LastBatter: GamePlayerViewModel;
    NextBatter: GamePlayerViewModel;

    private numberOfBatters(): number {
        let returnVal = 0;

        if (this.Pitcher)
            returnVal++;

        if (this.Catcher)
            returnVal++;

        if (this.FirstBaseman)
            returnVal++;

        if (this.SecondBaseman)
            returnVal++;

        if (this.Shortstop)
            returnVal++;

        if (this.ThirdBaseman)
            returnVal++;

        if (this.LeftFielder)
            returnVal++;

        if (this.CenterFielder)
            returnVal++;

        if (this.RightFielder)
            returnVal++;

        return returnVal;
    }

    SetPitcher(player: GamePlayerViewModel) {

        this.Pitcher = player;
        if (!this.Pitcher.BattingOrderNumber) {
            let numberOfBatters = this.numberOfBatters();
            this.Pitcher.BattingOrderNumber = numberOfBatters;
        }
    }

    SetCatcher(player: GamePlayerViewModel) {
        this.Catcher = player;
        if (!this.Catcher.BattingOrderNumber) {
            let numberOfBatters = this.numberOfBatters();
            this.Catcher.BattingOrderNumber = numberOfBatters;
        }
    }

    SetFirstBase(player: GamePlayerViewModel) {
        this.FirstBaseman = player;
        if (!this.FirstBaseman.BattingOrderNumber) {
            let numberOfBatters = this.numberOfBatters();
            this.FirstBaseman.BattingOrderNumber = numberOfBatters;
        }
    }

    SetSecondBase(player: GamePlayerViewModel) {
        this.SecondBaseman = player;
        if (!this.SecondBaseman.BattingOrderNumber) {
            let numberOfBatters = this.numberOfBatters();
            this.SecondBaseman.BattingOrderNumber = numberOfBatters;
        }
    }

    SetShortstop(player: GamePlayerViewModel) {
        this.Shortstop = player;
        if (!this.Shortstop.BattingOrderNumber) {
            let numberOfBatters = this.numberOfBatters();
            this.Shortstop.BattingOrderNumber = numberOfBatters;
        }
    }

    SetThirdBase(player: GamePlayerViewModel) {
        this.ThirdBaseman = player;
        if (!this.ThirdBaseman.BattingOrderNumber) {
            let numberOfBatters = this.numberOfBatters();
            this.ThirdBaseman.BattingOrderNumber = numberOfBatters;
        }
    }

    SetLeftField(player: GamePlayerViewModel) {
        this.LeftFielder = player;
        if (!this.LeftFielder.BattingOrderNumber) {
            let numberOfBatters = this.numberOfBatters();
            this.LeftFielder.BattingOrderNumber = numberOfBatters;
        }
    }

    SetCenterField(player: GamePlayerViewModel) {
        this.CenterFielder = player;
        if (!this.CenterFielder.BattingOrderNumber) {
            let numberOfBatters = this.numberOfBatters();
            this.CenterFielder.BattingOrderNumber = numberOfBatters;
        }
    }

    SetRightField(player: GamePlayerViewModel) {
        this.RightFielder = player;
        if (!this.RightFielder.BattingOrderNumber) {
            let numberOfBatters = this.numberOfBatters();
            this.RightFielder.BattingOrderNumber = numberOfBatters;
        }
    }

    MovePlayerUpInOrder(player: GamePlayerViewModel) {
        let playerToSwitchWith: GamePlayerViewModel = null;
        if (player.BattingOrderNumber == 1) {
            playerToSwitchWith = this.GetBatterAtLineupPosition(this.numberOfBatters());

        } else {
            playerToSwitchWith = this.GetBatterAtLineupPosition(player.BattingOrderNumber - 1);
        }

        let newOrderNumber = playerToSwitchWith.BattingOrderNumber;
        playerToSwitchWith.BattingOrderNumber = player.BattingOrderNumber;
        player.BattingOrderNumber = newOrderNumber;
    }

    MovePlayerDownInOrder(player: GamePlayerViewModel) {
        let playerToSwitchWith: GamePlayerViewModel = null;
        if (player.BattingOrderNumber == this.numberOfBatters()) {
            playerToSwitchWith = this.GetBatterAtLineupPosition(1);

        } else {
            playerToSwitchWith = this.GetBatterAtLineupPosition(player.BattingOrderNumber + 1);
        }

        let newOrderNumber = playerToSwitchWith.BattingOrderNumber;
        playerToSwitchWith.BattingOrderNumber = player.BattingOrderNumber;
        player.BattingOrderNumber = newOrderNumber;
    }

    get IsRosterSet(): boolean {
        if (this.Catcher && this.Pitcher && this.FirstBaseman &&
            this.SecondBaseman && this.Shortstop && this.ThirdBaseman && this.LeftFielder && this.CenterFielder && this.RightFielder) {
            return true;
        }
        else {
            return false;
        }
    }

    RemovePlayerAtLineupNumber(lineupNumber: number) {

        let numberOfBatters = this.numberOfBatters();
        if (numberOfBatters > lineupNumber) {
            for (var i = lineupNumber + 1; i <= numberOfBatters; i++) {
                let player = this.GetBatterAtLineupPosition(i);
                player.BattingOrderNumber--;
            }
        }

        if (this.Catcher && this.Catcher.BattingOrderNumber == lineupNumber) {
            this.Catcher = null;
            return;
        }
        else if (this.Pitcher && this.Pitcher.BattingOrderNumber == lineupNumber) {
            this.Pitcher = null;
            return;
        }
        else if (this.FirstBaseman && this.FirstBaseman.BattingOrderNumber == lineupNumber) {
            this.FirstBaseman = null;
            return;
        }
        else if (this.SecondBaseman && this.SecondBaseman.BattingOrderNumber == lineupNumber) {
            this.SecondBaseman = null;
            return;
        }
        else if (this.Shortstop && this.Shortstop.BattingOrderNumber == lineupNumber) {
            this.Shortstop = null;
            return;
        }
        else if (this.ThirdBaseman && this.ThirdBaseman.BattingOrderNumber == lineupNumber) {
            this.ThirdBaseman = null;
            return;
        }
        else if (this.LeftFielder && this.LeftFielder.BattingOrderNumber == lineupNumber) {
            this.LeftFielder = null;
            return;
        }
        else if (this.CenterFielder && this.CenterFielder.BattingOrderNumber == lineupNumber) {
            this.CenterFielder = null;
            return;
        }
        else if (this.RightFielder && this.RightFielder.BattingOrderNumber == lineupNumber) {
            this.RightFielder = null;
            return;
        }


    }

    GetBatterAtLineupPosition(battingOrderNumber: number): GamePlayerViewModel {
        //  console.log("GetBatterAtLineupPosition invoked... with " + battingOrderNumber);
        if (this.Catcher && this.Catcher.BattingOrderNumber == battingOrderNumber)
            return this.Catcher;
        else if (this.FirstBaseman && this.FirstBaseman.BattingOrderNumber == battingOrderNumber)
            return this.FirstBaseman;
        else if (this.SecondBaseman && this.SecondBaseman.BattingOrderNumber == battingOrderNumber)
            return this.SecondBaseman;
        else if (this.Shortstop && this.Shortstop.BattingOrderNumber == battingOrderNumber)
            return this.Shortstop;
        else if (this.ThirdBaseman && this.ThirdBaseman.BattingOrderNumber == battingOrderNumber)
            return this.ThirdBaseman;
        else if (this.LeftFielder && this.LeftFielder.BattingOrderNumber == battingOrderNumber)
            return this.LeftFielder;
        else if (this.CenterFielder && this.CenterFielder.BattingOrderNumber == battingOrderNumber)
            return this.CenterFielder;
        else if (this.RightFielder && this.RightFielder.BattingOrderNumber == battingOrderNumber)
            return this.RightFielder;
        else if (this.Pitcher && this.Pitcher.BattingOrderNumber == battingOrderNumber)
            return this.Pitcher;

        return null;
    }

    constructor(teamName: string, teamId: number, teamCity: string, teamSeason: number, ballpark: string) {
        this.TeamName = teamName;
        this.TeamId = teamId;
        this.TeamCity = teamCity;
        this.TeamSeason = teamSeason;
        this.Ballpark = ballpark;
    }
}
