import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchTeamsComponent } from './search-teams/search-teams.component';
import { HomeComponent } from './home/home.component';
import { SetStartingLineupsComponent } from './set-starting-lineups/set-starting-lineups.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { BallParkCoordinatesConfiguratorComponent } from './ball-park-coordinates-configurator/ball-park-coordinates-configurator.component';
import { GameConfigureComponent } from './game-configure/game-configure.component';


const routes: Routes = [
  { path: "searchteams", component: SearchTeamsComponent },
  { path: "setlineups/:newGameId", component: SetStartingLineupsComponent },
  { path: "game/:gameId", component: GameplayComponent },
  { path: "ballparkconfigure", component: BallParkCoordinatesConfiguratorComponent },
  { path: "gameconfigure", component: GameConfigureComponent },
  { path: "", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
