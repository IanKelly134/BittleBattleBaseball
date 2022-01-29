import { GameAtBatViewModel } from './game-at-bat-view-model';

export class GameInningViewModel {
    InningNumber: number;
    HomeOuts: number = 0;
    HomeAtBats: GameAtBatViewModel[] = new Array<GameAtBatViewModel>();
    HomeRunsScored: number;
    HomeHits: number = 0;
    HomeErrors: number = 0;
    AwayOuts: number = 0;
    AwayAtBats: GameAtBatViewModel[] = new Array<GameAtBatViewModel>();
    AwayRunsScored: number;
    AwayHits: number = 0;
    AwayErrors: number = 0;
    IsBottomOfInning: boolean;
    Plays: string[] = new Array<string>();

    constructor(inningNumber: number) {
        this.InningNumber = inningNumber;
    }
}
