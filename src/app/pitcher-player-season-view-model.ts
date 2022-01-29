import { PlayerSeasonViewModel } from './player-season-view-model';

export class PitcherPlayerSeasonViewModel extends PlayerSeasonViewModel {
    era: number;
    whip: number;
    wins: number;
    losses: number;
    PX: number = 1;
    StartingPX: number = 1;
}
