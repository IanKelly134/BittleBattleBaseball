import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchTeamsComponent } from './search-teams/search-teams.component';
import { HomeComponent } from './home/home.component';
import { SetStartingLineupsComponent } from './set-starting-lineups/set-starting-lineups.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { BallParkCoordinatesConfiguratorComponent } from './ball-park-coordinates-configurator/ball-park-coordinates-configurator.component';
import { GameConfigureComponent } from './game-configure/game-configure.component';
import { SearchNlTeamsComponent } from './search-nl-teams/search-nl-teams.component';
import { SearchMilbAaaTeamsComponent } from './search-milb-aaa-teams/search-milb-aaa-teams.component';
import { SearchMilbAaTeamsComponent } from './search-milb-aa-teams/search-milb-aa-teams.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "searchteams", component: SearchTeamsComponent },
  { path: "searchnlteams", component: SearchNlTeamsComponent },
  { path: "searchmilbaaateams", component: SearchMilbAaaTeamsComponent },
  { path: "searchmilbaateams", component: SearchMilbAaTeamsComponent },
  { path: "setlineups/:newGameId", component: SetStartingLineupsComponent },
  { path: "game/:gameId", component: GameplayComponent },
  { path: "ballparkconfigure", component: BallParkCoordinatesConfiguratorComponent },
  { path: "gameconfigure", component: GameConfigureComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
