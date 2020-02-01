import { GameAtBatViewModel } from './game-at-bat-view-model';

export class GameInningViewModel {
    InningNumber: number;
    HomeOuts: number;
    HomeAtBats: GameAtBatViewModel[] = new Array<GameAtBatViewModel>();
    HomeRunsScored: number;
    HomeHits: number;
    HomeErrors: number;
    AwayOuts: number;
    AwayAtBats: GameAtBatViewModel[] = new Array<GameAtBatViewModel>();
    AwayRunsScored: number;
    AwayHits: number;
    AwayErrors: number;
    IsBottomOfInning: boolean;
    Plays: string[] = new Array<string>();

    constructor(inningNumber: number) {
        this.InningNumber = inningNumber;
    }
}
