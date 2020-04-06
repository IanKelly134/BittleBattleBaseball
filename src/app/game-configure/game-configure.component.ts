import { Component, OnInit } from '@angular/core';
import { GameViewModel } from '../game-view-model';
import { MLBYearByYearBattingStatsViewModel } from '../mlbyear-by-year-batting-stats-view-model';
import { MLBYearByYearPitchingStatsViewModel } from '../mlbyear-by-year-pitching-stats-view-model';
import { Router, ActivatedRoute } from '@angular/router';
import { MLBYearByYearLeagueStatsServiceService } from '../mlbyear-by-year-league-stats-service.service';
import { TeamViewModel } from '../team-view-model';
import { GameTeamViewModel } from '../game-team-view-model';
import { TeamSearchResultViewModel } from '../team-search-result-view-model';
import { GamePlayerViewModel } from '../game-player-view-model';
import { HitterPlayerSeasonViewModel } from '../hitter-player-season-view-model';
import { PitcherPlayerSeasonViewModel } from '../pitcher-player-season-view-model';
import { PlayerViewModel } from '../player-view-model';
import { EnumAtBatResult } from '../enum-at-bat-result.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-configure',
  templateUrl: './game-configure.component.html',
  styleUrls: ['./game-configure.component.scss']
})
export class GameConfigureComponent implements OnInit {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  batHittingBallSound = new Audio("../assets/audio/batHittingBall.mp3");
  pitchSound = new Audio("../assets/assets/audio/caughtball.mp3");
  IsSoundMuted: boolean = false;

  screenPctAdj: number = 0.65;

  IsPlayInProgress: boolean = false;

  leftFieldCornerX: number;
  leftFieldCornerY: number;
  leftCenterWallX: number;
  leftCenterWallY: number;
  centerWallX: number;
  centerWallY: number;
  rightFieldCornerX: number;
  rightFieldCornerY: number;
  rightCenterWallX: number;
  rightCenterWallY: number;

  homePlateX: number = 950 * this.screenPctAdj;
  homePlateY: number = 1170 * this.screenPctAdj;
  firstBaseX: number = 1220 * this.screenPctAdj;
  firstBaseY: number = 900 * this.screenPctAdj;
  secondBaseX: number = 910 * this.screenPctAdj;
  secondBaseY: number = 750 * this.screenPctAdj;
  thirdBaseX: number = 620 * this.screenPctAdj;
  thirdBaseY: number = 880 * this.screenPctAdj;

  rightHandedBatterX: number = 848 * this.screenPctAdj;
  rightHandedBatterY: number = 1120 * this.screenPctAdj;
  leftHandedBatterX: number = 985 * this.screenPctAdj;
  leftHandedBatterY: number = 1120 * this.screenPctAdj;

  homeOnDeckBatterX: number = 1300 * this.screenPctAdj;
  homeOnDeckBatterY: number = 1173 * this.screenPctAdj;
  awayOnDeckBatterX: number = 480 * this.screenPctAdj;
  awayOnDeckBatterY: number = 1173 * this.screenPctAdj;

  catcherX: number = 915 * this.screenPctAdj;
  catcherY: number = 1217 * this.screenPctAdj;
  pitcherX: number = 918 * this.screenPctAdj;
  pitcherY: number = 870 * this.screenPctAdj;
  firstBasemanX: number = 1210 * this.screenPctAdj;
  firstBasemanY: number = 813 * this.screenPctAdj;
  secondBasemanX: number = 1045 * this.screenPctAdj;
  secondBasemanY: number = 763 * this.screenPctAdj;
  thirdBasemanX: number = 625 * this.screenPctAdj;
  thirdBasemanY: number = 813 * this.screenPctAdj;
  shortstopX: number = 775 * this.screenPctAdj;
  shortstopY: number = 763 * this.screenPctAdj;
  leftFielderX: number = 430 * this.screenPctAdj;
  leftFielderY: number = 543 * this.screenPctAdj;
  centerFielderX: number = 935 * this.screenPctAdj;
  centerFielderY: number = 483 * this.screenPctAdj;
  rightFielderX: number = 1430 * this.screenPctAdj;
  rightFielderY: number = 543 * this.screenPctAdj;

  canvasWidth: number = 1920 * this.screenPctAdj;
  canvasHeight: number = 1371 * this.screenPctAdj;

  Game: GameViewModel;//= new GameViewModel();
  lineupNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  GameId: number;

  playerFieldImgAvatarHeight: number = 60;
  playerFieldImgAvatarWidth: number = 40;

  _leagueHomeBattingStats: MLBYearByYearBattingStatsViewModel;
  _leagueAwayBattingStats: MLBYearByYearBattingStatsViewModel;
  _leagueHomePitchingStats: MLBYearByYearPitchingStatsViewModel;
  _leagueAwayPitchingStats: MLBYearByYearPitchingStatsViewModel;

  ngAfterViewInit(): void {

    this.SetPlayingField();
  }

  ngOnInit() {
  }

  constructor(private router: Router, mlbYearByYearLeagueStatsServiceService: MLBYearByYearLeagueStatsServiceService, private toastr: ToastrService) //, private toastr: ToastrService
  {
    //console.log(this.router.getCurrentNavigation().extras.state);
    document.body.style.backgroundImage = "url('../assets/images/baseball-background6.jpg')";

    //this.GameId = activatedRoute.snapshot.params["gameId"];
    //var parsedGame = ) as GameViewModel;
    //Object.assign(this.Game, JSON.parse(localStorage.getItem('bittlebattlebaseball_game_instance' + this.GameId)));


    this.Game = this.BuildMockGame();

    mlbYearByYearLeagueStatsServiceService.GetLeagueBattingStatsByYear(this.Game.HomeTeam.TeamSeason).subscribe(data => {
      this._leagueHomeBattingStats = data;
    });
    mlbYearByYearLeagueStatsServiceService.GetLeagueBattingStatsByYear(this.Game.AwayTeam.TeamSeason).subscribe(data => {
      this._leagueAwayBattingStats = data;
    });
    mlbYearByYearLeagueStatsServiceService.GetLeaguePitchingStatsByYear(this.Game.HomeTeam.TeamSeason).subscribe(data => {
      this._leagueHomePitchingStats = data;
    });
    mlbYearByYearLeagueStatsServiceService.GetLeaguePitchingStatsByYear(this.Game.AwayTeam.TeamSeason).subscribe(data => {
      this._leagueAwayPitchingStats = data;
    });

    this.Game.StartGame();
  }

  //***
  private BuildMockGame(): GameViewModel {
    let gameVM = new GameViewModel();

    let homeTeamSearchResult = new TeamSearchResultViewModel();
    homeTeamSearchResult.id = 1234;
    homeTeamSearchResult.city = "St. Louis";
    homeTeamSearchResult.ballpark = "Busch Stadium III";
    homeTeamSearchResult.teamName = "Cardinals";

    let awayTeamSearchResult = new TeamSearchResultViewModel();
    awayTeamSearchResult.id = 5678;
    awayTeamSearchResult.city = "Colorado";
    awayTeamSearchResult.ballpark = "Coors Field";
    awayTeamSearchResult.teamName = "Rockies";

    gameVM.SetValues(1010101, homeTeamSearchResult, awayTeamSearchResult);

    //---------------

    let homeTeam = new GameTeamViewModel("Cardinals", 1234, "St. Louis", 2011, "Busch Stadium III");

    var pitcherHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    pitcherHitterPlayerSeasonViewModel.obp = 0.226;
    pitcherHitterPlayerSeasonViewModel.slg = 0.305;
    pitcherHitterPlayerSeasonViewModel.avg = 0.200;
    pitcherHitterPlayerSeasonViewModel.pa = 600;
    pitcherHitterPlayerSeasonViewModel.ab = 500;
    pitcherHitterPlayerSeasonViewModel.hr = 30;
    pitcherHitterPlayerSeasonViewModel.rbi = 100;
    pitcherHitterPlayerSeasonViewModel.sb = 20;
    pitcherHitterPlayerSeasonViewModel.bb = 100;
    pitcherHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    pitcherHitterPlayerSeasonViewModel.player.playerName = "Adam Wainwright";

    var pitherPitcherPlayerSeasonViewModel = new PitcherPlayerSeasonViewModel();
    pitherPitcherPlayerSeasonViewModel.era = 3.39;
    pitherPitcherPlayerSeasonViewModel.fldPct = .989;
    pitherPitcherPlayerSeasonViewModel.whip = 1.23;
    pitherPitcherPlayerSeasonViewModel.player = new PlayerViewModel();
    pitherPitcherPlayerSeasonViewModel.player.playerName = "Adam Wainwright";
    pitherPitcherPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/425794.jpg";
    pitherPitcherPlayerSeasonViewModel.player.bats = "R";
    var p = new GamePlayerViewModel("SP", pitcherHitterPlayerSeasonViewModel, pitherPitcherPlayerSeasonViewModel);
    p.BattingOrderNumber = 9;
    p.Id = 201;
    homeTeam.SetPitcher(p);

    var catcherHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    catcherHitterPlayerSeasonViewModel.obp = 0.333;
    catcherHitterPlayerSeasonViewModel.slg = 0.405;
    catcherHitterPlayerSeasonViewModel.avg = 0.282;
    catcherHitterPlayerSeasonViewModel.pa = 600;
    catcherHitterPlayerSeasonViewModel.ab = 500;
    catcherHitterPlayerSeasonViewModel.hr = 16;
    catcherHitterPlayerSeasonViewModel.rbi = 59;
    catcherHitterPlayerSeasonViewModel.sb = 20;
    catcherHitterPlayerSeasonViewModel.bb = 100;
    catcherHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    catcherHitterPlayerSeasonViewModel.player.playerName = "Yadi Molina";
    catcherHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/425877.jpg";
    catcherHitterPlayerSeasonViewModel.player.bats = "R";
    var c = new GamePlayerViewModel("C", catcherHitterPlayerSeasonViewModel, null);
    c.BattingOrderNumber = 8;
    c.Id = 202;
    homeTeam.SetCatcher(c);

    var firstBaseHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    firstBaseHitterPlayerSeasonViewModel.obp = 0.379;
    firstBaseHitterPlayerSeasonViewModel.slg = 0.549;
    firstBaseHitterPlayerSeasonViewModel.avg = 0.300;
    firstBaseHitterPlayerSeasonViewModel.pa = 600;
    firstBaseHitterPlayerSeasonViewModel.ab = 500;
    firstBaseHitterPlayerSeasonViewModel.hr = 35;
    firstBaseHitterPlayerSeasonViewModel.rbi = 110;
    firstBaseHitterPlayerSeasonViewModel.sb = 20;
    firstBaseHitterPlayerSeasonViewModel.bb = 100;
    firstBaseHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    firstBaseHitterPlayerSeasonViewModel.player.playerName = "Albert Pujols";
    firstBaseHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/405395.jpg";
    firstBaseHitterPlayerSeasonViewModel.player.bats = "R";
    var fb = new GamePlayerViewModel("1B", firstBaseHitterPlayerSeasonViewModel, null);
    fb.BattingOrderNumber = 3;
    fb.Id = 203;
    homeTeam.SetFirstBase(fb);

    var secondBaseHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    secondBaseHitterPlayerSeasonViewModel.obp = 0.434;
    secondBaseHitterPlayerSeasonViewModel.slg = 0.577;
    secondBaseHitterPlayerSeasonViewModel.avg = 0.358;
    secondBaseHitterPlayerSeasonViewModel.pa = 600;
    secondBaseHitterPlayerSeasonViewModel.ab = 500;
    secondBaseHitterPlayerSeasonViewModel.hr = 22;
    secondBaseHitterPlayerSeasonViewModel.rbi = 114;
    secondBaseHitterPlayerSeasonViewModel.sb = 20;
    secondBaseHitterPlayerSeasonViewModel.bb = 100;
    secondBaseHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    secondBaseHitterPlayerSeasonViewModel.player.playerName = "Rogers Hornsby";
    secondBaseHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/116156.jpg";
    secondBaseHitterPlayerSeasonViewModel.player.bats = "R";
    var sb = new GamePlayerViewModel("2B", secondBaseHitterPlayerSeasonViewModel, null);
    sb.BattingOrderNumber = 1;
    sb.Id = 204;
    homeTeam.SetSecondBase(sb);

    var thirdBaseHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    thirdBaseHitterPlayerSeasonViewModel.obp = 0.364;
    thirdBaseHitterPlayerSeasonViewModel.slg = 0.490;
    thirdBaseHitterPlayerSeasonViewModel.avg = 0.281;
    thirdBaseHitterPlayerSeasonViewModel.pa = 600;
    thirdBaseHitterPlayerSeasonViewModel.ab = 500;
    thirdBaseHitterPlayerSeasonViewModel.hr = 25;
    thirdBaseHitterPlayerSeasonViewModel.rbi = 102;
    thirdBaseHitterPlayerSeasonViewModel.sb = 20;
    thirdBaseHitterPlayerSeasonViewModel.bb = 100;
    thirdBaseHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    thirdBaseHitterPlayerSeasonViewModel.player.playerName = "Scott Rolen";
    thirdBaseHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/121409.jpg";
    thirdBaseHitterPlayerSeasonViewModel.player.bats = "R";
    var tb = new GamePlayerViewModel("3B", thirdBaseHitterPlayerSeasonViewModel, null);
    tb.BattingOrderNumber = 4;
    tb.Id = 205;
    homeTeam.SetThirdBase(tb);

    var shortstopHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    shortstopHitterPlayerSeasonViewModel.obp = 0.337;
    shortstopHitterPlayerSeasonViewModel.slg = 0.328;
    shortstopHitterPlayerSeasonViewModel.avg = 0.262;
    shortstopHitterPlayerSeasonViewModel.pa = 600;
    shortstopHitterPlayerSeasonViewModel.ab = 500;
    shortstopHitterPlayerSeasonViewModel.hr = 2;
    shortstopHitterPlayerSeasonViewModel.rbi = 50;
    shortstopHitterPlayerSeasonViewModel.sb = 20;
    shortstopHitterPlayerSeasonViewModel.bb = 100;
    shortstopHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    shortstopHitterPlayerSeasonViewModel.player.playerName = "Ozzie Smith";
    shortstopHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/122439.jpg";
    shortstopHitterPlayerSeasonViewModel.player.bats = "S";
    var ss = new GamePlayerViewModel("SS", shortstopHitterPlayerSeasonViewModel, null);
    ss.BattingOrderNumber = 7;
    ss.Id = 206;
    homeTeam.SetShortstop(ss);

    var leftfielderHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    leftfielderHitterPlayerSeasonViewModel.obp = 0.379;
    leftfielderHitterPlayerSeasonViewModel.slg = 0.510;
    leftfielderHitterPlayerSeasonViewModel.avg = 0.299;
    leftfielderHitterPlayerSeasonViewModel.pa = 600;
    leftfielderHitterPlayerSeasonViewModel.ab = 500;
    leftfielderHitterPlayerSeasonViewModel.hr = 27;
    leftfielderHitterPlayerSeasonViewModel.rbi = 104;
    leftfielderHitterPlayerSeasonViewModel.sb = 20;
    leftfielderHitterPlayerSeasonViewModel.bb = 100;
    leftfielderHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    leftfielderHitterPlayerSeasonViewModel.player.playerName = "Matt Holliday";
    leftfielderHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/407812.jpg";
    leftfielderHitterPlayerSeasonViewModel.player.bats = "R";
    var lf = new GamePlayerViewModel("LF", leftfielderHitterPlayerSeasonViewModel, null);
    lf.BattingOrderNumber = 5;
    lf.Id = 207;
    homeTeam.SetLeftField(lf);

    var centerfielderHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    centerfielderHitterPlayerSeasonViewModel.obp = 0.343;
    centerfielderHitterPlayerSeasonViewModel.slg = 0.410;
    centerfielderHitterPlayerSeasonViewModel.avg = 0.293;
    centerfielderHitterPlayerSeasonViewModel.pa = 600;
    centerfielderHitterPlayerSeasonViewModel.ab = 500;
    centerfielderHitterPlayerSeasonViewModel.hr = 9;
    centerfielderHitterPlayerSeasonViewModel.rbi = 56;
    centerfielderHitterPlayerSeasonViewModel.sb = 20;
    centerfielderHitterPlayerSeasonViewModel.bb = 100;
    centerfielderHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    centerfielderHitterPlayerSeasonViewModel.player.playerName = "Lou Brock";
    centerfielderHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/111495.jpg";
    centerfielderHitterPlayerSeasonViewModel.player.bats = "L";
    var cf = new GamePlayerViewModel("CF", centerfielderHitterPlayerSeasonViewModel, null);
    cf.BattingOrderNumber = 2;
    cf.Id = 208;
    homeTeam.SetCenterField(cf);

    var rightfielderHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    rightfielderHitterPlayerSeasonViewModel.obp = 0.400;
    rightfielderHitterPlayerSeasonViewModel.slg = 0.650;
    rightfielderHitterPlayerSeasonViewModel.avg = 0.300;
    rightfielderHitterPlayerSeasonViewModel.pa = 600;
    rightfielderHitterPlayerSeasonViewModel.ab = 500;
    rightfielderHitterPlayerSeasonViewModel.hr = 30;
    rightfielderHitterPlayerSeasonViewModel.rbi = 100;
    rightfielderHitterPlayerSeasonViewModel.sb = 20;
    rightfielderHitterPlayerSeasonViewModel.bb = 100;
    rightfielderHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    rightfielderHitterPlayerSeasonViewModel.player.playerName = "Stan Musial";
    rightfielderHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/119602.jpg";
    rightfielderHitterPlayerSeasonViewModel.player.bats = "L";
    let rf = new GamePlayerViewModel("RF", rightfielderHitterPlayerSeasonViewModel, null);
    rf.BattingOrderNumber = 6;
    rf.Id = 209;
    homeTeam.SetRightField(rf);

    gameVM.HomeTeam = homeTeam;

    //---------------

    let awayTeam = new GameTeamViewModel("Rockies", 5678, "Colorado", 1998, "Coors Field");

    var pitcherHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    pitcherHitterPlayerSeasonViewModel.obp = 0.417;
    pitcherHitterPlayerSeasonViewModel.slg = 0.559;
    pitcherHitterPlayerSeasonViewModel.avg = 0.331;
    pitcherHitterPlayerSeasonViewModel.pa = 600;
    pitcherHitterPlayerSeasonViewModel.ab = 500;
    pitcherHitterPlayerSeasonViewModel.hr = 25;
    pitcherHitterPlayerSeasonViewModel.rbi = 104;
    pitcherHitterPlayerSeasonViewModel.sb = 20;
    pitcherHitterPlayerSeasonViewModel.bb = 100;
    pitcherHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    pitcherHitterPlayerSeasonViewModel.player.playerName = "Pedro Astacio";

    var pitherPitcherPlayerSeasonViewModel = new PitcherPlayerSeasonViewModel();
    pitherPitcherPlayerSeasonViewModel.era = 4.67;
    pitherPitcherPlayerSeasonViewModel.fldPct = .989;
    pitherPitcherPlayerSeasonViewModel.whip = 1.374;
    pitherPitcherPlayerSeasonViewModel.player = new PlayerViewModel();
    pitherPitcherPlayerSeasonViewModel.player.playerName = "Pedro Astacio";
    pitherPitcherPlayerSeasonViewModel.player.playerImageURL = "http://bittlebattlebaseball.azurewebsites.net/assets/images/emptyHeadshot.jpeg";
    pitherPitcherPlayerSeasonViewModel.player.bats = "R";
    var ap = new GamePlayerViewModel("SP", pitcherHitterPlayerSeasonViewModel, pitherPitcherPlayerSeasonViewModel);
    ap.Id = 103;
    ap.BattingOrderNumber = 9;
    awayTeam.SetPitcher(ap);

    var catcherHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    catcherHitterPlayerSeasonViewModel.obp = 0.315;
    catcherHitterPlayerSeasonViewModel.slg = 0.379;
    catcherHitterPlayerSeasonViewModel.avg = 0.256;
    catcherHitterPlayerSeasonViewModel.pa = 600;
    catcherHitterPlayerSeasonViewModel.ab = 500;
    catcherHitterPlayerSeasonViewModel.hr = 10;
    catcherHitterPlayerSeasonViewModel.rbi = 61;
    catcherHitterPlayerSeasonViewModel.sb = 20;
    catcherHitterPlayerSeasonViewModel.bb = 100;
    catcherHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    catcherHitterPlayerSeasonViewModel.player.playerName = "Yorvit Torrealba";
    catcherHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/150275.jpg";
    catcherHitterPlayerSeasonViewModel.player.bats = "R";
    var ac = new GamePlayerViewModel("C", catcherHitterPlayerSeasonViewModel, null);
    ac.Id = 102;
    ac.BattingOrderNumber = 8;
    awayTeam.SetCatcher(ac);

    var firstBaseHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    firstBaseHitterPlayerSeasonViewModel.obp = 0.414;
    firstBaseHitterPlayerSeasonViewModel.slg = 0.539;
    firstBaseHitterPlayerSeasonViewModel.avg = 0.316;
    firstBaseHitterPlayerSeasonViewModel.pa = 600;
    firstBaseHitterPlayerSeasonViewModel.ab = 500;
    firstBaseHitterPlayerSeasonViewModel.hr = 27;
    firstBaseHitterPlayerSeasonViewModel.rbi = 101;
    firstBaseHitterPlayerSeasonViewModel.sb = 20;
    firstBaseHitterPlayerSeasonViewModel.bb = 100;
    firstBaseHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    firstBaseHitterPlayerSeasonViewModel.player.playerName = "Todd Helton";
    firstBaseHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/115732.jpg";
    firstBaseHitterPlayerSeasonViewModel.player.bats = "L";

    var afb = new GamePlayerViewModel("1B", firstBaseHitterPlayerSeasonViewModel, null);
    afb.Id = 101;
    afb.BattingOrderNumber = 3;
    awayTeam.SetFirstBase(afb);

    var secondBaseHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    secondBaseHitterPlayerSeasonViewModel.obp = 0.354;
    secondBaseHitterPlayerSeasonViewModel.slg = 0.423;
    secondBaseHitterPlayerSeasonViewModel.avg = 0.302;
    secondBaseHitterPlayerSeasonViewModel.pa = 600;
    secondBaseHitterPlayerSeasonViewModel.ab = 500;
    secondBaseHitterPlayerSeasonViewModel.hr = 8;
    secondBaseHitterPlayerSeasonViewModel.rbi = 50;
    secondBaseHitterPlayerSeasonViewModel.sb = 20;
    secondBaseHitterPlayerSeasonViewModel.bb = 100;
    secondBaseHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    secondBaseHitterPlayerSeasonViewModel.player.playerName = "DJ LeMahieu";
    secondBaseHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/518934.jpg";

    secondBaseHitterPlayerSeasonViewModel.player.bats = "R";
    var asb = new GamePlayerViewModel("2B", secondBaseHitterPlayerSeasonViewModel, null);
    asb.Id = 100;
    asb.BattingOrderNumber = 1;
    awayTeam.SetSecondBase(asb);

    var thirdBaseHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    thirdBaseHitterPlayerSeasonViewModel.obp = 0.351;
    thirdBaseHitterPlayerSeasonViewModel.slg = 0.546;
    thirdBaseHitterPlayerSeasonViewModel.avg = 0.295;
    thirdBaseHitterPlayerSeasonViewModel.pa = 600;
    thirdBaseHitterPlayerSeasonViewModel.ab = 500;
    thirdBaseHitterPlayerSeasonViewModel.hr = 32;
    thirdBaseHitterPlayerSeasonViewModel.rbi = 105;
    thirdBaseHitterPlayerSeasonViewModel.sb = 20;
    thirdBaseHitterPlayerSeasonViewModel.bb = 100;
    thirdBaseHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    thirdBaseHitterPlayerSeasonViewModel.player.playerName = "Nolan Arenado";
    thirdBaseHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/571448.jpg";
    thirdBaseHitterPlayerSeasonViewModel.player.bats = "R";
    var atb = new GamePlayerViewModel("3B", thirdBaseHitterPlayerSeasonViewModel, null);
    atb.Id = 104;
    atb.BattingOrderNumber = 4;
    awayTeam.SetThirdBase(atb);

    var shortstopHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    shortstopHitterPlayerSeasonViewModel.obp = 0.361;
    shortstopHitterPlayerSeasonViewModel.slg = 0.495;
    shortstopHitterPlayerSeasonViewModel.avg = 0.290;
    shortstopHitterPlayerSeasonViewModel.pa = 600;
    shortstopHitterPlayerSeasonViewModel.ab = 500;
    shortstopHitterPlayerSeasonViewModel.hr = 17;
    shortstopHitterPlayerSeasonViewModel.rbi = 60;
    shortstopHitterPlayerSeasonViewModel.sb = 20;
    shortstopHitterPlayerSeasonViewModel.bb = 100;
    shortstopHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    shortstopHitterPlayerSeasonViewModel.player.playerName = "Troy Tulowitzki";
    shortstopHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/453064.jpg";
    shortstopHitterPlayerSeasonViewModel.player.bats = "R";
    var ass = new GamePlayerViewModel("SS", shortstopHitterPlayerSeasonViewModel, null);
    ass.BattingOrderNumber = 7;
    ass.Id = 105;
    awayTeam.SetShortstop(ass);

    var leftfielderHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    leftfielderHitterPlayerSeasonViewModel.obp = 0.379;
    leftfielderHitterPlayerSeasonViewModel.slg = 0.510;
    leftfielderHitterPlayerSeasonViewModel.avg = 0.299;
    leftfielderHitterPlayerSeasonViewModel.pa = 600;
    leftfielderHitterPlayerSeasonViewModel.ab = 500;
    leftfielderHitterPlayerSeasonViewModel.hr = 30;
    leftfielderHitterPlayerSeasonViewModel.rbi = 100;
    leftfielderHitterPlayerSeasonViewModel.sb = 20;
    leftfielderHitterPlayerSeasonViewModel.bb = 100;
    leftfielderHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    leftfielderHitterPlayerSeasonViewModel.player.playerName = "Matt Holliday";
    leftfielderHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/407812.jpg";
    leftfielderHitterPlayerSeasonViewModel.player.bats = "R";
    var alf = new GamePlayerViewModel("LF", leftfielderHitterPlayerSeasonViewModel, null);
    alf.BattingOrderNumber = 5;
    alf.Id = 106;
    awayTeam.SetLeftField(alf);

    var centerfielderHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    centerfielderHitterPlayerSeasonViewModel.obp = 0.360;
    centerfielderHitterPlayerSeasonViewModel.slg = 0.509;
    centerfielderHitterPlayerSeasonViewModel.avg = 0.304;
    centerfielderHitterPlayerSeasonViewModel.pa = 600;
    centerfielderHitterPlayerSeasonViewModel.ab = 500;
    centerfielderHitterPlayerSeasonViewModel.hr = 19;
    centerfielderHitterPlayerSeasonViewModel.rbi = 57;
    centerfielderHitterPlayerSeasonViewModel.sb = 20;
    centerfielderHitterPlayerSeasonViewModel.bb = 100;
    centerfielderHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    centerfielderHitterPlayerSeasonViewModel.player.playerName = "Charlie Blackmon";
    centerfielderHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/453568.jpg";
    centerfielderHitterPlayerSeasonViewModel.player.bats = "L";
    var acf = new GamePlayerViewModel("CF", centerfielderHitterPlayerSeasonViewModel, null);
    acf.BattingOrderNumber = 2;
    acf.Id = 107;
    awayTeam.SetCenterField(acf);

    var rightfielderHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    rightfielderHitterPlayerSeasonViewModel.obp = 0.384;
    rightfielderHitterPlayerSeasonViewModel.slg = 0.502;
    rightfielderHitterPlayerSeasonViewModel.avg = 0.313;
    rightfielderHitterPlayerSeasonViewModel.pa = 600;
    rightfielderHitterPlayerSeasonViewModel.ab = 500;
    rightfielderHitterPlayerSeasonViewModel.hr = 30;
    rightfielderHitterPlayerSeasonViewModel.rbi = 90;
    rightfielderHitterPlayerSeasonViewModel.sb = 20;
    rightfielderHitterPlayerSeasonViewModel.bb = 100;
    rightfielderHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    rightfielderHitterPlayerSeasonViewModel.player.playerName = "Larry Walker";
    rightfielderHitterPlayerSeasonViewModel.player.playerImageURL = "https://securea.mlb.com/mlb/images/players/head_shot/123833.jpg";
    rightfielderHitterPlayerSeasonViewModel.player.bats = "L";
    let arf = new GamePlayerViewModel("RF", rightfielderHitterPlayerSeasonViewModel, null);
    arf.BattingOrderNumber = 6;
    arf.Id = 108;
    awayTeam.SetRightField(arf);


    gameVM.AwayTeam = awayTeam;


    // gameVM.StartGame();

    return gameVM;
  }
  //***

  ExecuteNextPlay() {
    this.IsPlayInProgress = true;
    this.Game.RunnersWhoScoredOnPlay = [];
    this.ClearCanvas();

    setTimeout(() => {
      this.Pitch();

      setTimeout(() => {
        let diceRoll = this.GenerateRandomNumber(1, 1000);
        //this.showWarning("Dice Roll is " + diceRoll + " Current Batter OBRP : " + this.Game.CurrentAtBat.Batter.HittingSeasonStats.OBRP);

        if (diceRoll <= (this.Game.CurrentAtBat.Batter.HittingSeasonStats.OBRP * 1000)) {
          this.ExecuteCurrentBatterReachedBase();
        }
        else {
          this.ExecuteCurrentBatterIsOut();
        }

        setTimeout(() => {
          this.IsPlayInProgress = false;
          this.ClearCanvas();
        }, 2500);

      }, 300);
    }, 200);


  }

  GenerateRandomNumber(from: number, to: number): number {
    return Math.floor((Math.random() * to) + from);
  }

  ExecuteCurrentBatterReachedBase() {
    let diceRoll = this.GenerateRandomNumber(1, 1000);

    let basesAdded = 1;
    //TODO - Numbers based off of 2019 totals, need to pull in stats for year of batter
    if (diceRoll <= 215) { //Walks
      this.BatterWalked();
      this.showInfo(this.Game.CurrentAtBat.Batter.Name + " walked.");

      this.Game.CurrentAtBat.Result = EnumAtBatResult.Walk;

      if (this.Game.RunnerOnFirst) {

        if (this.Game.RunnerOnSecond) {

          if (this.Game.RunnerOnThird) {
            this.Game.RunnersWhoScoredOnPlay.push(this.Game.RunnerOnThird);

            if (this.Game.CurrentInning.IsBottomOfInning) {
              this.Game.CurrentInning.HomeRunsScored++;
            } else {
              this.Game.CurrentInning.AwayRunsScored++;
            }

            for (let playerWhoScored of this.Game.RunnersWhoScoredOnPlay) {
              this.showSuccess(playerWhoScored.Name + " scored!");
            }

          }

          this.Game.RunnerOnThird = this.Game.RunnerOnSecond;
        }

        this.Game.RunnerOnSecond = this.Game.RunnerOnFirst;
      }

      this.Game.RunnerOnFirst = this.Game.CurrentAtBat.Batter;
    }
    else if (diceRoll > 215 && diceRoll <= 783) { //Singles

      let singleHitDiceRoll = this.GenerateRandomNumber(1, 2);

      if (singleHitDiceRoll <= 1) {
        this.GroundBallSingleLeft1();
        this.showInfo(this.Game.CurrentAtBat.Batter.Name + " singles to left.");
      } else {
        this.GroundBallSingleLeft2();
        this.showInfo(this.Game.CurrentAtBat.Batter.Name + " singles to left.");
      }

      this.Game.CurrentAtBat.Result = EnumAtBatResult.Single;

      if (this.Game.RunnerOnThird) {
        this.Game.RunnersWhoScoredOnPlay.push(this.Game.RunnerOnThird);
        this.Game.RunnerOnThird = null;
      }

      if (this.Game.RunnerOnSecond) {
        this.Game.RunnerOnThird = this.Game.RunnerOnSecond;
        this.Game.RunnerOnSecond = null;
      }

      if (this.Game.RunnerOnFirst) {
        this.Game.RunnerOnSecond = this.Game.RunnerOnFirst;
        this.Game.RunnerOnFirst = null;
      }

      for (let playerWhoScored of this.Game.RunnersWhoScoredOnPlay) {
        if (this.Game.CurrentInning.IsBottomOfInning) {
          this.Game.CurrentInning.HomeRunsScored++;
        } else {
          this.Game.CurrentInning.AwayRunsScored++;
        }

        this.showSuccess(playerWhoScored.Name + " scored!");
      }

      this.Game.RunnerOnFirst = this.Game.CurrentAtBat.Batter;
    }
    else if (diceRoll > 783 && diceRoll <= 959) { //Doubles
      let doubleHitDiceRoll = this.GenerateRandomNumber(1, 2);
      basesAdded = 2;
      if (doubleHitDiceRoll <= 1) {
        //this.GroundBallSingleLeft1();
        this.showInfo(this.Game.CurrentAtBat.Batter.Name + " doubles to left.");
      } else {
        //this.GroundBallSingleLeft2();
        this.showInfo(this.Game.CurrentAtBat.Batter.Name + " doubles to left.");
      }

      this.Game.CurrentAtBat.Result = EnumAtBatResult.Double;

      if (this.Game.RunnerOnThird) {
        this.Game.RunnersWhoScoredOnPlay.push(this.Game.RunnerOnThird);
        this.Game.RunnerOnThird = null;
      }

      if (this.Game.RunnerOnSecond) {
        this.Game.RunnersWhoScoredOnPlay.push(this.Game.RunnerOnSecond);
        this.Game.RunnerOnSecond = null;
      }

      if (this.Game.RunnerOnFirst) {
        this.Game.RunnerOnThird = this.Game.RunnerOnFirst;
        this.Game.RunnerOnFirst = null;
      }


      for (let playerWhoScored of this.Game.RunnersWhoScoredOnPlay) {
        if (this.Game.CurrentInning.IsBottomOfInning) {
          this.Game.CurrentInning.HomeRunsScored++;
        } else {
          this.Game.CurrentInning.AwayRunsScored++;
        }

        this.showSuccess(playerWhoScored.Name + " scored!");
      }

      this.Game.RunnerOnSecond = this.Game.CurrentAtBat.Batter;
    }
    else if (diceRoll > 959 && diceRoll <= 975) { //Triples
      let tripleHitDiceRoll = this.GenerateRandomNumber(1, 2);
      basesAdded = 3;
      if (tripleHitDiceRoll <= 1) {
        //this.GroundBallSingleLeft1();
        this.showInfo(this.Game.CurrentAtBat.Batter.Name + " triples to left.");
      } else {
        //this.GroundBallSingleLeft2();
        this.showInfo(this.Game.CurrentAtBat.Batter.Name + " triples to left.");
      }

      this.Game.CurrentAtBat.Result = EnumAtBatResult.Triple;

      if (this.Game.RunnerOnThird) {
        this.Game.RunnersWhoScoredOnPlay.push(this.Game.RunnerOnThird);
        this.Game.RunnerOnThird = null;
      }

      if (this.Game.RunnerOnSecond) {
        this.Game.RunnersWhoScoredOnPlay.push(this.Game.RunnerOnSecond);
        this.Game.RunnerOnSecond = null;
      }

      if (this.Game.RunnerOnFirst) {
        this.Game.RunnersWhoScoredOnPlay.push(this.Game.RunnerOnFirst);
        this.Game.RunnerOnFirst = null;
      }


      for (let playerWhoScored of this.Game.RunnersWhoScoredOnPlay) {
        if (this.Game.CurrentInning.IsBottomOfInning) {
          this.Game.CurrentInning.HomeRunsScored++;
        } else {
          this.Game.CurrentInning.AwayRunsScored++;
        }

        this.showSuccess(playerWhoScored.Name + " scored!");
      }

      this.Game.RunnerOnThird = this.Game.CurrentAtBat.Batter;
    }
    else if (diceRoll > 975) { //Homers
      let homerDiceRoll = this.GenerateRandomNumber(1, 8);
      basesAdded = 4;
      if (homerDiceRoll <= 1) {
        this.HomerLeftFieldLine();
        this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " homers down the left field line.");
      }
      else if (homerDiceRoll == 2) {
        this.LongHomerLeftFieldLine();
        this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " hits a long homerun to left.");
      }
      else if (homerDiceRoll == 3) {
        this.HomerLeftField();
        this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " homers to left field.");
      }
      else if (homerDiceRoll == 4) {
        this.HomerLeftCenterField();
        this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " homers to left-center field.");
      }
      else if (homerDiceRoll == 5) {
        this.HomerCenterField();
        this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " homers to center field.");
      }
      else if (homerDiceRoll == 6) {
        this.HomerRightCenterField();
        this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " homers to right-center field.");
      }
      else if (homerDiceRoll == 7) {
        this.HomerRightField();
        this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " homers to right field.");
      }
      else if (homerDiceRoll == 8) {
        this.HomerRightFieldLine();
        this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " homers down the right field line.");
      }

      this.Game.CurrentAtBat.Result = EnumAtBatResult.HomeRun;

      if (this.Game.RunnerOnThird) {
        this.Game.RunnersWhoScoredOnPlay.push(this.Game.RunnerOnThird);
        this.Game.RunnerOnThird = null;
      }

      if (this.Game.RunnerOnSecond) {
        this.Game.RunnersWhoScoredOnPlay.push(this.Game.RunnerOnSecond);
        this.Game.RunnerOnSecond = null;
      }

      if (this.Game.RunnerOnFirst) {
        this.Game.RunnersWhoScoredOnPlay.push(this.Game.RunnerOnFirst);
        this.Game.RunnerOnFirst = null;
      }

      this.Game.RunnersWhoScoredOnPlay.push(this.Game.CurrentAtBat.Batter);

      for (let playerWhoScored of this.Game.RunnersWhoScoredOnPlay) {
        if (this.Game.CurrentInning.IsBottomOfInning) {
          this.Game.CurrentInning.HomeRunsScored++;
        } else {
          this.Game.CurrentInning.AwayRunsScored++;
        }

        this.showSuccess(playerWhoScored.Name + " scored!");
      }
    }

    //***
    this.Game.NewAtBat();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      this.DrawHitterOnHomeDeck();
    }
    else {
      this.DrawHitterOnAwayDeck();
    }
  }

  ExecuteCurrentBatterIsOut() {
    let diceRoll = this.GenerateRandomNumber(1, 3);
    //this.showWarning("Dice Roll is " + diceRoll);

    if (diceRoll == 1) {
      this.FlyBallOutToFirst();
      this.showError(this.Game.CurrentAtBat.Batter.Name + " pops out to first.");
    } else {
      this.FlyBallOutToThird();
      this.showError(this.Game.CurrentAtBat.Batter.Name + " pops out to third.");
    }

    this.Game.CurrentAtBat.Result = EnumAtBatResult.Out;

    if (this.Game.CurrentInning.IsBottomOfInning) {
      this.Game.CurrentInning.HomeOuts++;

      if (this.Game.CurrentInning.HomeOuts == 3) {
        this.Game.NextInning();
        this.Game.NewAtBat();
      }
      else {
        this.Game.NewAtBat();
      }
    }
    else {
      this.Game.CurrentInning.AwayOuts++;

      if (this.Game.CurrentInning.AwayOuts == 3) {
        this.Game.CurrentInning.IsBottomOfInning = true;
        this.Game.RunnerOnFirst = null;
        this.Game.RunnerOnSecond = null;
        this.Game.RunnerOnThird = null;
        this.Game.RunnersWhoScoredOnPlay = [];
        this.Game.CurrentInning.HomeRunsScored = 0;
        this.Game.NewAtBat();
      }
      else {
        this.Game.NewAtBat();
      }
    }

  }


  SetPlayingField() {

    this.canvas = <HTMLCanvasElement>document.getElementById("ballparkCanvas");
    this.ctx = this.canvas.getContext("2d");


    let img = new Image();
    img.src = '../assets/images/GenericField2.png';
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
      this.SetDefensivePlayers();
      this.DrawOffensivePlayers();
    }
  }

  SetDefensivePlayers() {
    this.DrawCatcher();
    this.DrawPitcher();
    this.DrawFirstBasemen();
    this.DrawSecondBasemen();
    this.DrawShortstop();
    this.DrawThirdBasemen();
    this.DrawLeftfielder();
    this.DrawCenterfielder();
    this.DrawRightfielder();
  }

  DrawOffensivePlayers() {
    this.DrawHitterOnHomeDeck();
    this.DrawHitterOnAwayDeck();
    this.DrawBatter();
    this.DrawRunnerOnFirst();
    this.DrawRunnerOnSecond();
    this.DrawRunnerOnThird();
  }

  DrawBatter() {
    let img = new Image();
    let color = '#00004E';
    img.src = this.Game.CurrentAtBat.Batter.PlayerImageURL;
    img.title = this.Game.CurrentAtBat.Batter.Name;
    if (this.Game.CurrentInning.IsBottomOfInning) {
      color = '#B30000';
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }


    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    if (this.Game.CurrentAtBat.Batter.HittingSeasonStats.player.bats.toLowerCase() == "r") {
      img.onload = () => {
        this.ctx.beginPath();
        this.ctx.rect(this.rightHandedBatterX, this.rightHandedBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();

        this.ctx.drawImage(img,
          this.rightHandedBatterX, this.rightHandedBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

        this.ctx.font = '8pt Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(img.title, this.rightHandedBatterX + (this.playerFieldImgAvatarWidth / 2), (this.rightHandedBatterY - 5));
      }
    } else if (this.Game.CurrentAtBat.Batter.HittingSeasonStats.player.bats.toLowerCase() == "l") {
      img.onload = () => {
        this.ctx.beginPath();
        this.ctx.rect(this.leftHandedBatterX, this.leftHandedBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();

        this.ctx.drawImage(img,
          this.leftHandedBatterX, this.leftHandedBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

        this.ctx.font = '8pt Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(img.title, this.leftHandedBatterX + (this.playerFieldImgAvatarWidth / 2), (this.leftHandedBatterY - 5));
      }
    } else {

      //TODO - switch sides based on current pitcher

      img.onload = () => {
        this.ctx.beginPath();
        this.ctx.rect(this.leftHandedBatterX, this.leftHandedBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();

        this.ctx.drawImage(img,
          this.leftHandedBatterX, this.leftHandedBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

        this.ctx.font = '8pt Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(img.title, this.leftHandedBatterX + (this.playerFieldImgAvatarWidth / 2), (this.leftHandedBatterY - 5));
      }
    }

  }

  DrawRunnerOnFirst() {
    if (this.Game.RunnerOnFirst) {
      let img = new Image();
      let color = "#00004E";
      img.src = this.Game.RunnerOnFirst.PlayerImageURL;
      img.title = this.Game.RunnerOnFirst.Name;

      if (this.Game.CurrentInning.IsBottomOfInning) {
        color = "red";
      }

      img.onerror = function () {
        img.src = '../assets/images/emptyHeadshot.jpeg';
      }

      img.onload = () => {
        this.ctx.beginPath();
        this.ctx.rect(this.firstBaseX, this.firstBaseY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();

        this.ctx.drawImage(img,
          this.firstBaseX, this.firstBaseY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

        this.ctx.font = '8pt Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'gray';
        this.ctx.fillText(img.title, this.firstBaseX + (this.playerFieldImgAvatarWidth / 2), (this.firstBaseY - 5));
      }
    }
  }

  DrawRunnerOnSecond() {
    if (this.Game.RunnerOnSecond) {
      let img = new Image();
      let color = "#00004E";
      img.src = this.Game.RunnerOnSecond.PlayerImageURL;
      img.title = this.Game.RunnerOnSecond.Name;

      if (this.Game.CurrentInning.IsBottomOfInning) {
        color = "red";
      }

      img.onerror = function () {
        img.src = '../assets/images/emptyHeadshot.jpeg';
      }

      img.onload = () => {
        this.ctx.beginPath();
        this.ctx.rect(this.secondBaseX, this.secondBaseY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();

        this.ctx.drawImage(img,
          this.secondBaseX, this.secondBaseY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

        this.ctx.font = '8pt Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(img.title, this.secondBaseX + (this.playerFieldImgAvatarWidth / 2), (this.secondBaseY - 5));
      }
    }
  }

  DrawRunnerOnThird() {
    if (this.Game.RunnerOnThird) {
      let img = new Image();
      let color = "#00004E";
      img.src = this.Game.RunnerOnThird.PlayerImageURL;
      img.title = this.Game.RunnerOnThird.Name;

      if (this.Game.CurrentInning.IsBottomOfInning) {
        color = "red";
      }

      img.onerror = function () {
        img.src = '../assets/images/emptyHeadshot.jpeg';
      }

      img.onload = () => {
        this.ctx.beginPath();
        this.ctx.rect(this.thirdBaseX, this.thirdBaseY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();

        this.ctx.drawImage(img,
          this.thirdBaseX, this.thirdBaseY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

        this.ctx.font = '8pt Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'gray';
        this.ctx.fillText(img.title, this.thirdBaseX + (this.playerFieldImgAvatarWidth / 2), (this.thirdBaseY - 5));
      }
    }
  }

  DrawHitterOnHomeDeck() {
    let img = new Image();
    let color = '#B30000';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.HomeTeam.NextBatter.PlayerImageURL;
      img.title = this.Game.HomeTeam.NextBatter.Name;

      img.onerror = function () {
        img.src = '../assets/images/emptyHeadshot.jpeg';
      }

      img.onload = () => {
        this.ctx.beginPath();
        this.ctx.rect(this.homeOnDeckBatterX, this.homeOnDeckBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();

        this.ctx.drawImage(img,
          this.homeOnDeckBatterX, this.homeOnDeckBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

        this.ctx.font = '8pt Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(img.title, this.homeOnDeckBatterX + (this.playerFieldImgAvatarWidth / 2), (this.homeOnDeckBatterY - 5));
      }
    }


  }

  DrawHitterOnAwayDeck() {
    let img = new Image();
    let color = '#00004E';
    if (!this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.NextBatter.PlayerImageURL;
      img.title = this.Game.AwayTeam.NextBatter.Name;

      img.onerror = function () {
        img.src = '../assets/images/emptyHeadshot.jpeg';
      }

      img.onload = () => {
        this.ctx.beginPath();
        this.ctx.rect(this.awayOnDeckBatterX, this.awayOnDeckBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();

        this.ctx.drawImage(img,
          this.awayOnDeckBatterX, this.awayOnDeckBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

        this.ctx.font = '8pt Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(img.title, this.awayOnDeckBatterX + (this.playerFieldImgAvatarWidth / 2), (this.awayOnDeckBatterY - 5));
      }
    }
  }

  DrawPitcher() {
    let img = new Image();
    let color = '#B30000';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.Pitcher.PlayerImageURL;
      img.title = this.Game.AwayTeam.Pitcher.Name;
      color = '#00004E';
    }
    else {
      img.src = this.Game.HomeTeam.Pitcher.PlayerImageURL;
      img.title = this.Game.HomeTeam.Pitcher.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.beginPath();
      this.ctx.rect(this.pitcherX, this.pitcherY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = color;
      this.ctx.stroke();

      this.ctx.drawImage(img,
        this.pitcherX, this.pitcherY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

      this.ctx.font = '8pt Calibri';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(img.title, this.pitcherX + (this.playerFieldImgAvatarWidth / 2), (this.pitcherY - 5));
    }
  }

  DrawCatcher() {
    let img = new Image();
    let color = '#B30000';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.Catcher.PlayerImageURL;
      img.title = this.Game.AwayTeam.Catcher.Name;
      color = '#00004E';
    }
    else {
      img.src = this.Game.HomeTeam.Catcher.PlayerImageURL;
      img.title = this.Game.HomeTeam.Catcher.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.beginPath();
      this.ctx.rect(this.catcherX, this.catcherY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = color;
      this.ctx.stroke();

      this.ctx.drawImage(img,
        this.catcherX, this.catcherY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

      this.ctx.font = '8pt Calibri';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'gray';
      this.ctx.fillText(img.title, this.catcherX + (this.playerFieldImgAvatarWidth / 2), (this.catcherY - 5));
    }
  }

  DrawFirstBasemen() {
    let img = new Image();
    let color = '#B30000';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.FirstBaseman.PlayerImageURL;
      img.title = this.Game.AwayTeam.FirstBaseman.Name;
      color = '#00004E';
    }
    else {
      img.src = this.Game.HomeTeam.FirstBaseman.PlayerImageURL;
      img.title = this.Game.HomeTeam.FirstBaseman.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.beginPath();
      this.ctx.rect(this.firstBasemanX, this.firstBasemanY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = color;
      this.ctx.stroke();

      this.ctx.drawImage(img,
        this.firstBasemanX, this.firstBasemanY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

      this.ctx.font = '8pt Calibri';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(img.title, this.firstBasemanX + (this.playerFieldImgAvatarWidth / 2), (this.firstBasemanY - 5));
    }
  }

  DrawSecondBasemen() {
    let img = new Image();
    let color = '#B30000';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.SecondBaseman.PlayerImageURL;
      img.title = this.Game.AwayTeam.SecondBaseman.Name;
      color = '#00004E';
    } else {
      img.src = this.Game.HomeTeam.SecondBaseman.PlayerImageURL;
      img.title = this.Game.HomeTeam.SecondBaseman.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.beginPath();
      this.ctx.rect(this.secondBasemanX, this.secondBasemanY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = color;
      this.ctx.stroke();

      this.ctx.drawImage(img,
        this.secondBasemanX, this.secondBasemanY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

      this.ctx.font = '8pt Calibri';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(img.title, this.secondBasemanX + (this.playerFieldImgAvatarWidth / 2), (this.secondBasemanY - 5));
    }
  }

  DrawThirdBasemen() {
    let img = new Image();
    let color = '#B30000';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.ThirdBaseman.PlayerImageURL;
      img.title = this.Game.AwayTeam.ThirdBaseman.Name;
      color = '#00004E';
    } else {
      img.src = this.Game.HomeTeam.ThirdBaseman.PlayerImageURL;
      img.title = this.Game.HomeTeam.ThirdBaseman.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.beginPath();
      this.ctx.rect(this.thirdBasemanX, this.thirdBasemanY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = color;
      this.ctx.stroke();

      this.ctx.drawImage(img,
        this.thirdBasemanX, this.thirdBasemanY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

      this.ctx.font = '8pt Calibri';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(img.title, this.thirdBasemanX + (this.playerFieldImgAvatarWidth / 2), (this.thirdBasemanY - 5));
    }
  }

  DrawShortstop() {
    let img = new Image();
    let color = '#B30000';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.Shortstop.PlayerImageURL;
      img.title = this.Game.AwayTeam.Shortstop.Name;
      color = '#00004E';
    } else {
      img.src = this.Game.HomeTeam.Shortstop.PlayerImageURL;
      img.title = this.Game.HomeTeam.Shortstop.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.beginPath();
      this.ctx.rect(this.shortstopX, this.shortstopY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = color;
      this.ctx.stroke();

      this.ctx.drawImage(img,
        this.shortstopX, this.shortstopY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

      this.ctx.font = '8pt Calibri';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(img.title, this.shortstopX + (this.playerFieldImgAvatarWidth / 2), (this.shortstopY - 5));
    }
  }

  DrawLeftfielder() {
    let img = new Image();
    let color = '#B30000';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.LeftFielder.PlayerImageURL;
      img.title = this.Game.AwayTeam.LeftFielder.Name;
      color = '#00004E';
    } else {
      img.src = this.Game.HomeTeam.LeftFielder.PlayerImageURL;
      img.title = this.Game.HomeTeam.LeftFielder.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.beginPath();
      this.ctx.rect(this.leftFielderX, this.leftFielderY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = color;
      this.ctx.stroke();


      this.ctx.drawImage(img,
        this.leftFielderX, this.leftFielderY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

      this.ctx.font = '8pt Calibri';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(img.title, this.leftFielderX + (this.playerFieldImgAvatarWidth / 2), (this.leftFielderY - 5));
    }
  }

  DrawRightfielder() {
    let img = new Image();
    let color = '#B30000';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.RightFielder.PlayerImageURL;
      img.title = this.Game.AwayTeam.RightFielder.Name;
      color = '#00004E';
    }
    else {
      img.src = this.Game.HomeTeam.RightFielder.PlayerImageURL;
      img.title = this.Game.HomeTeam.RightFielder.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.beginPath();
      this.ctx.rect(this.rightFielderX, this.rightFielderY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = color;
      this.ctx.stroke();

      this.ctx.drawImage(img,
        this.rightFielderX, this.rightFielderY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

      this.ctx.font = '8pt Calibri';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(img.title, this.rightFielderX + (this.playerFieldImgAvatarWidth / 2), (this.rightFielderY - 5));
    }
  }

  DrawCenterfielder() {
    let img = new Image();
    let color = '#B30000';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.CenterFielder.PlayerImageURL;
      img.title = this.Game.AwayTeam.CenterFielder.Name;
      color = '#00004E';
    } else {
      img.src = this.Game.HomeTeam.CenterFielder.PlayerImageURL;
      img.title = this.Game.HomeTeam.CenterFielder.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.beginPath();
      this.ctx.rect(this.centerFielderX, this.centerFielderY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = color;
      this.ctx.stroke();

      this.ctx.drawImage(img,
        this.centerFielderX, this.centerFielderY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);

      this.ctx.font = '8pt Calibri';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(img.title, this.centerFielderX + (this.playerFieldImgAvatarWidth / 2), (this.centerFielderY - 5));
    }
  }

  BatterWalked() {
    //TODO
  }

  groundBallSingleLeft1X: number = 370 * this.screenPctAdj;
  groundBallSingleLeft1Y: number = 725 * this.screenPctAdj;

  GroundBallSingleLeft1() {
    this.GroundBallHit(this.groundBallSingleLeft1X, this.groundBallSingleLeft1Y, "Single down the left field line!");
  }

  groundBallHitLeft2X: number = 639 * this.screenPctAdj;
  groundBallHitLeft2Y: number = 710 * this.screenPctAdj;

  GroundBallSingleLeft2() {
    this.GroundBallHit(this.groundBallHitLeft2X, this.groundBallHitLeft2Y, "Single to left field!");
  }

  groundBallSingleCenter1X: number = 875 * this.screenPctAdj;
  groundBallSingleCenter1Y: number = 680 * this.screenPctAdj;

  GroundBallSingleCenter1() {
    this.GroundBallHit(this.groundBallSingleCenter1X, this.groundBallSingleCenter1Y, "Base Hit to center!");
  }

  groundBallSingleCenter2X: number = 1025 * this.screenPctAdj;
  groundBallSingleCenter2Y: number = 680 * this.screenPctAdj;

  GroundBallSingleCenter2() {
    this.GroundBallHit(this.groundBallSingleCenter2X, this.groundBallSingleCenter2Y, "Single to center field!");
  }

  groundBallSingleRight1X: number = 1250 * this.screenPctAdj;
  groundBallSingleRight1Y: number = 650 * this.screenPctAdj;

  GroundBallSingleRight1() {

    this.GroundBallHit(this.groundBallSingleRight1X, this.groundBallSingleRight1Y, "Single down the right field line!");
  }

  groundBallSingleRight2X: number = 1450 * this.screenPctAdj;
  groundBallSingleRight2Y: number = 720 * this.screenPctAdj;

  GroundBallSingleRight2() {
    this.GroundBallHit(this.groundBallSingleRight2X, this.groundBallSingleRight2Y, "Single to right field!");
  }

  flyBallDoubleLeft1cp1X: number = 450 * this.screenPctAdj;
  flyBallDoubleLeft1cp1Y: number = 320 * this.screenPctAdj;
  flyBallDoubleLeft1cp2X: number = 370 * this.screenPctAdj;
  flyBallDoubleLeft1cp2Y: number = 520 * this.screenPctAdj;

  FlyBallDoubleLeft1() {
    this.FlyBallHit(this.flyBallDoubleLeft1cp1X, this.flyBallDoubleLeft1cp1Y, this.flyBallDoubleLeft1cp2X,
      this.flyBallDoubleLeft1cp2Y, this.leftFielderX - 180, this.leftFielderY + 30);
  }

  flyBallDoubleLeft2cp1X: number = 675 * this.screenPctAdj;
  flyBallDoubleLeft2cp1Y: number = 420 * this.screenPctAdj;
  flyBallDoubleLeft2cp2X: number = 575 * this.screenPctAdj;
  flyBallDoubleLeft2cp2Y: number = 330 * this.screenPctAdj;

  FlyBallDoubleLeft2() {
    this.FlyBallHit(this.flyBallDoubleLeft2cp1X, this.flyBallDoubleLeft2cp1Y, this.flyBallDoubleLeft2cp2X,
      this.flyBallDoubleLeft2cp2Y, this.leftFielderX - 30, this.leftFielderY);
  }

  flyBallDoubleLeftCentercp1X: number = 780 * this.screenPctAdj;
  flyBallDoubleLeftCentercp1Y: number = 30 * this.screenPctAdj;
  flyBallDoubleLeftCenter2cp2X: number = 780 * this.screenPctAdj;
  flyBallDoubleLeftCentercp2Y: number = 400 * this.screenPctAdj;

  FlyBallDoubleLeftCenter() {
    this.FlyBallHit(this.flyBallDoubleLeftCentercp1X, this.flyBallDoubleLeftCentercp1Y, this.flyBallDoubleLeftCenter2cp2X, this.flyBallDoubleLeftCentercp2Y, (this.leftFielderX + this.centerFielderX) / 2, this.centerFielderY);
  }

  flyBallDoubleCentercp1X: number = 980 * this.screenPctAdj;
  flyBallDoubleCentercp1Y: number = 0 * this.screenPctAdj;
  flyBallDoubleCenter2cp2X: number = 980 * this.screenPctAdj;
  flyBallDoubleCentercp2Y: number = 420 * this.screenPctAdj;

  FlyBallDoubleCenter() {
    this.FlyBallHit(this.flyBallDoubleCentercp1X, this.flyBallDoubleCentercp1Y, this.flyBallDoubleCenter2cp2X,
      this.flyBallDoubleCentercp2Y, this.centerFielderX + 30, this.centerFielderY - 5);
  }

  flyBallDoubleRightCentercp1X: number = 1075 * this.screenPctAdj;
  flyBallDoubleRightCentercp1Y: number = 10 * this.screenPctAdj;
  flyBallDoubleRightCenter2cp2X: number = 1150 * this.screenPctAdj;
  flyBallDoubleRightCentercp2Y: number = 450 * this.screenPctAdj;

  FlyBallDoubleRightCenter() {
    this.FlyBallHit(this.flyBallDoubleRightCentercp1X, this.flyBallDoubleRightCentercp1Y, this.flyBallDoubleRightCenter2cp2X,
      this.flyBallDoubleRightCentercp2Y, (this.rightFielderX + this.centerFielderX + 50) / 2, this.centerFielderY + 10);
  }

  flyBallDoubleRightcp1X: number = 1550 * this.screenPctAdj;
  flyBallDoubleRightcp1Y: number = 10 * this.screenPctAdj;
  flyBallDoubleRight2cp2X: number = 1500 * this.screenPctAdj;
  flyBallDoubleRightcp2Y: number = 720 * this.screenPctAdj;

  FlyBallDoubleRight1() {
    this.FlyBallHit(this.flyBallDoubleRightcp1X, this.flyBallDoubleRightcp1Y, this.flyBallDoubleRight2cp2X, this.flyBallDoubleRightcp2Y,
      this.rightFielderX + 140, this.rightFielderY + 20);
  }

  //Outs
  flyBallInfieldOut1cp1X: number = 1000 * this.screenPctAdj;
  flyBallInfieldOut1cp1Y: number = 1 * this.screenPctAdj;
  flyBallInfieldOut1cp2X: number = 1120 * this.screenPctAdj;
  flyBallInfieldOut1cp2Y: number = 150 * this.screenPctAdj;
  FlyBallOutToFirst() {
    this.FlyBallHit(this.flyBallInfieldOut1cp1X, this.flyBallInfieldOut1cp1Y, this.flyBallInfieldOut1cp2X, this.flyBallInfieldOut1cp2Y,
      (this.rightFielderX + this.centerFielderX + 50) / 2, this.shortstopY + 30);
  }

  flyBallInfieldOut2cp1X: number = 750 * this.screenPctAdj;
  flyBallInfieldOut2cp1Y: number = 10 * this.screenPctAdj;
  flyBallInfieldOut2cp2X: number = 710 * this.screenPctAdj;
  flyBallInfieldOut2cp2Y: number = 150 * this.screenPctAdj;
  FlyBallOutToThird() {
    this.FlyBallHit(this.flyBallInfieldOut2cp1X, this.flyBallInfieldOut2cp1Y, this.flyBallInfieldOut2cp2X, this.flyBallInfieldOut2cp2Y, (this.leftFielderX + this.centerFielderX) / 2, this.secondBasemanY + 30);
  }

  BreakingBallRH() {
    this.PlayPitchSound();
  }

  BreakingBallLH() {

    this.PlayPitchSound();
  }

  Pitch() {

    this.ctx.beginPath();
    this.ctx.moveTo(this.pitcherX + 20, this.pitcherY + this.playerFieldImgAvatarHeight);
    this.ctx.lineTo(this.homePlateX, this.homePlateY);
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    // line color
    this.ctx.strokeStyle = 'lightgray';
    this.ctx.stroke();

    // this.PlayPitchSound();
  }

  GroundBallHit(x: number, y: number, desc: string) {
    // this.SetPlayingField();
    this.PlayBatHittingBallSound();


    this.ctx.beginPath();
    this.ctx.moveTo(this.homePlateX, this.homePlateY);
    this.ctx.lineWidth = 2;

    // line color
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
  }

  FlyBallHit(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
    //   this.SetPlayingField();
    this.PlayBatHittingBallSound();
    //  this.ctx.setLineDash([4, 8]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.homePlateX, this.homePlateY);
    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    this.ctx.lineWidth = 2;
    // line color
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
  }


  ClearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.SetPlayingField();
    //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  PlayBatHittingBallSound() {
    if (!this.IsSoundMuted) {
      this.batHittingBallSound.play();
    }
  }

  PlayPitchSound() {
    if (!this.IsSoundMuted) {
      this.pitchSound.play();
    }
  }

  homerLeftFieldLinecp1X: number = 400 * this.screenPctAdj;
  homerLeftFieldLinecp1Y: number = 10 * this.screenPctAdj;
  homerLeftFieldLinecp2X: number = 250 * this.screenPctAdj;
  homerLeftFieldLinecp2Y: number = 1 * this.screenPctAdj;
  HomerLeftFieldLine() {
    this.FlyBallHit(this.homerLeftFieldLinecp1X, this.homerLeftFieldLinecp1Y, this.homerLeftFieldLinecp2X,
      this.homerLeftFieldLinecp2Y, 70, this.leftFielderY - 30);
  }

  longHomerLeftFieldLinecp1X: number = 325 * this.screenPctAdj;
  longHomerLeftFieldLinecp1Y: number = 10 * this.screenPctAdj;
  longHomerLeftFieldLinecp2X: number = 250 * this.screenPctAdj;
  longHomerLeftFieldLinecp2Y: number = (this.leftFielderY - 300) * this.screenPctAdj;
  LongHomerLeftFieldLine() {
    this.FlyBallHit(this.longHomerLeftFieldLinecp1X, this.longHomerLeftFieldLinecp1Y, this.longHomerLeftFieldLinecp2X,
      this.longHomerLeftFieldLinecp2Y, 70, this.leftFielderY - 100);
  }

  homerLeftFieldcp1X: number = 650 * this.screenPctAdj;
  homerLeftFieldcp1Y: number = 0;
  homerLeftFieldcp2X: number = 550 * this.screenPctAdj;
  homerLeftFieldcp2Y: number = 0;
  HomerLeftField() {
    this.FlyBallHit(this.homerLeftFieldcp1X, this.homerLeftFieldcp1Y, this.homerLeftFieldcp2X,
      this.homerLeftFieldcp2Y, 225, this.leftFielderY - 80);
  }

  homerLeftCenterFieldcp1X: number = 650 * this.screenPctAdj;
  homerLeftCenterFieldcp1Y: number = 0;
  homerLeftCenterFieldcp2X: number = 550 * this.screenPctAdj;
  homerLeftCenterFieldcp2Y: number = -150;
  HomerLeftCenterField() {
    this.FlyBallHit(this.homerLeftCenterFieldcp1X, this.homerLeftCenterFieldcp1Y, this.homerLeftCenterFieldcp2X,
      this.homerLeftCenterFieldcp2Y, 350, this.leftFielderY - 90);
  }

  homerCenterFieldcp1X: number = 900 * this.screenPctAdj;
  homerCenterFieldcp1Y: number = 0;
  homerCenterFieldcp2X: number = 900 * this.screenPctAdj;
  homerCenterFieldcp2Y: number = -150;
  HomerCenterField() {
    this.FlyBallHit(this.homerCenterFieldcp1X, this.homerCenterFieldcp1Y, this.homerCenterFieldcp2X,
      this.homerCenterFieldcp2Y, 625, this.centerFielderY - 90);
  }


  homerRightCenterFieldcp1X: number = 1175 * this.screenPctAdj;
  homerRightCenterFieldcp1Y: number = 0;
  homerRightCenterFieldcp2X: number = 1200 * this.screenPctAdj;
  homerRightCenterFieldcp2Y: number = -150;
  HomerRightCenterField() {
    this.FlyBallHit(this.homerRightCenterFieldcp1X, this.homerRightCenterFieldcp1Y, this.homerRightCenterFieldcp2X,
      this.homerRightCenterFieldcp2Y, ((this.rightFielderX + this.centerFielderX + 50) / 2) + 50, this.centerFielderY - 60);
  }

  homerRightFieldcp1X: number = 1375 * this.screenPctAdj;
  homerRightFieldcp1Y: number = 0;
  homerRightFieldcp2X: number = 1400 * this.screenPctAdj;
  homerRightFieldcp2Y: number = -150;
  HomerRightField() {
    this.FlyBallHit(this.homerRightFieldcp1X, this.homerRightFieldcp1Y, this.homerRightFieldcp2X,
      this.homerRightFieldcp2Y, this.rightFielderX + 100, this.rightFielderY - 85);
  }

  homerRightFieldLinecp1X: number = 1550 * this.screenPctAdj;
  homerRightFieldLinecp1Y: number = 0;
  homerRightFieldLinecp2X: number = 1575 * this.screenPctAdj;
  homerRightFieldLinecp2Y: number = -100;
  HomerRightFieldLine() {
    this.FlyBallHit(this.homerRightFieldLinecp1X, this.homerRightFieldLinecp1Y, this.homerRightFieldLinecp2X,
      this.homerRightFieldLinecp2Y, this.rightFielderX + 240, this.rightFielderY - 65);
  }

  showSuccess(msg: string) {

    let position = this.Game.CurrentInning.IsBottomOfInning ? "toast-top-right" : "toast-top-left";

    this.toastr.success("", msg, {
      timeOut: 3000,
      positionClass: position,
      messageClass: "toast-message"
    });

    this.Game.PlayByPlays.push(msg);
  }

  showInfo(msg: string) {
    let position = this.Game.CurrentInning.IsBottomOfInning ? "toast-top-right" : "toast-top-left";

    this.toastr.warning("", msg, {
      timeOut: 3000,
      positionClass: position,
      messageClass: "toast-message"
    });

    this.Game.PlayByPlays.push(msg);
  }

  showWarning(msg: string) {
    let position = this.Game.CurrentInning.IsBottomOfInning ? "toast-top-right" : "toast-top-left";

    this.toastr.warning("", msg, {
      timeOut: 3000,
      positionClass: position,
      messageClass: "toast-message"
    });

    this.Game.PlayByPlays.push(msg);
  }

  showError(msg: string) {
    let position = this.Game.CurrentInning.IsBottomOfInning ? "toast-top-right" : "toast-top-left";

    this.toastr.error("", msg, {
      timeOut: 3000,
      positionClass: position,
      messageClass: "toast-message"
    });

    this.Game.PlayByPlays.push(msg);
  }


  FlipHomeAway() {
    this.Game.CurrentInning.IsBottomOfInning = !this.Game.CurrentInning.IsBottomOfInning;
  }

}
