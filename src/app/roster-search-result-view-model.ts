import { PitcherPlayerSeasonViewModel } from './pitcher-player-season-view-model';
import { HitterPlayerSeasonViewModel } from './hitter-player-season-view-model';

export class RosterSearchResultViewModel {
    id: number;
    season: number;
    teamName: string;

    pitchers: PitcherPlayerSeasonViewModel[];

    hitters: HitterPlayerSeasonViewModel[];

    suggestedLineup: HitterPlayerSeasonViewModel[];

    suggestedRotation: PitcherPlayerSeasonViewModel[];
}
