import { GamePlayerViewModel } from './game-player-view-model';
import { EnumAtBatResult } from './enum-at-bat-result.enum';

export class GameAtBatViewModel {
    Batter: GamePlayerViewModel;
    Pitcher: GamePlayerViewModel;
    Result: EnumAtBatResult;
    Balls: number;
    Strikes: number;
    RunsScored: number = 0;
}
