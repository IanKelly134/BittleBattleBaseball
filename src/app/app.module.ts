import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchTeamsComponent } from './search-teams/search-teams.component';
import { SetStartingLineupsComponent } from './set-starting-lineups/set-starting-lineups.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { GameSummaryComponent } from './game-summary/game-summary.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BattingAvgPipePipe } from './batting-avg-pipe.pipe';
import { OnBasePctPipePipe } from './on-base-pct-pipe.pipe';
import { DataLoadingComponent } from './data-loading/data-loading.component';
import { BallParkCoordinatesConfiguratorComponent } from './ball-park-coordinates-configurator/ball-park-coordinates-configurator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GameViewModel } from './game-view-model';
import { MLBYearByYearLeagueStatsServiceService } from './mlbyear-by-year-league-stats-service.service';
import { GameConfigureComponent } from './game-configure/game-configure.component';
import { SearchNlTeamsComponent } from './search-nl-teams/search-nl-teams.component';
import { SearchMilbAaaTeamsComponent } from './search-milb-aaa-teams/search-milb-aaa-teams.component';
import { SearchMilbAaTeamsComponent } from './search-milb-aa-teams/search-milb-aa-teams.component';
import { SearchMilbATeamsComponent } from './search-milb-ateams/search-milb-ateams.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchTeamsComponent,
    SetStartingLineupsComponent,
    GameplayComponent,
    GameSummaryComponent,
    HomeComponent,
    BattingAvgPipePipe,
    OnBasePctPipePipe,
    DataLoadingComponent,
    BallParkCoordinatesConfiguratorComponent,
    GameConfigureComponent,
    SearchNlTeamsComponent,
    SearchMilbAaaTeamsComponent,
    SearchMilbAaTeamsComponent,
    SearchMilbATeamsComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [GameViewModel, MLBYearByYearLeagueStatsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
