import { PlayerSeasonViewModel } from './player-season-view-model';

export class HitterPlayerSeasonViewModel extends PlayerSeasonViewModel {

    //On-Base Percentage
    obp: number;

    //Slugging Percentage
    slg: number;

    //Batting Average
    avg: number;

    //Plate Appearances
    pa: number;

    //At-Bats
    ab: number;

    //Home Runs
    hr: number;

    //RBIs
    rbi: number;

    //Stolen Bases
    sb: number;

    //Walks
    bb: number;

    //On Base Roll Probability adjusted by current opposing pitcher WHIP
    OBRP: number;
}
