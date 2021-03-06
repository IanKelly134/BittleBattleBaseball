import { GameAtBatViewModel } from './game-at-bat-view-model';
import { HitterPlayerSeasonViewModel } from './hitter-player-season-view-model';
import { PitcherPlayerSeasonViewModel } from './pitcher-player-season-view-model';

export class GamePlayerViewModel {
    AtBats: GameAtBatViewModel[];
    Position: string;
    Name: string;
    Id: number;
    BattingOrderNumber: number;
    Errors: number;
    HittingSeasonStats: HitterPlayerSeasonViewModel;
    PitchingSeasonStats: PitcherPlayerSeasonViewModel;
    OpposingPitcherMultiplier: number;
    PlayerImageURL: string;

    constructor(pos: string, hitter: HitterPlayerSeasonViewModel, pitcher: PitcherPlayerSeasonViewModel) {
        this.Position = pos;
        if (hitter) {
            this.HittingSeasonStats = hitter;
            this.Name = this.HittingSeasonStats.player.playerName;
            this.Id = this.HittingSeasonStats.player.id;
            this.PlayerImageURL = this.HittingSeasonStats.player.playerImageURL;
        }

        if (pitcher) {
            this.PitchingSeasonStats = pitcher;
            this.Name = this.PitchingSeasonStats.player.playerName;
            this.Id = this.PitchingSeasonStats.player.id;
            this.PlayerImageURL = this.PitchingSeasonStats.player.playerImageURL;
        }
    }
}
