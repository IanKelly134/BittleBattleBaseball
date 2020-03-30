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

  screenPctAdj: number = 0.66;

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
  firstBaseY: number = 1023 * this.screenPctAdj;
  secondBaseX: number = 905 * this.screenPctAdj;
  secondBaseY: number = 913 * this.screenPctAdj;
  thirdBaseX: number = 555 * this.screenPctAdj;
  thirdBaseY: number = 1013 * this.screenPctAdj;

  rightHandedBatterX: number = 830 * this.screenPctAdj;
  rightHandedBatterY: number = 940 * this.screenPctAdj;
  leftHandedBatterX: number = 915 * this.screenPctAdj;
  leftHandedBatterY: number = 940 * this.screenPctAdj;

  homeOnDeckBatterX: number = 1300 * this.screenPctAdj;
  homeOnDeckBatterY: number = 1173 * this.screenPctAdj;
  awayOnDeckBatterX: number = 480 * this.screenPctAdj;
  awayOnDeckBatterY: number = 1173 * this.screenPctAdj;

  catcherX: number = 915 * this.screenPctAdj;
  catcherY: number = 1217 * this.screenPctAdj;
  pitcherX: number = 915 * this.screenPctAdj;
  pitcherY: number = 883 * this.screenPctAdj;
  firstBasemanX: number = 1210 * this.screenPctAdj;
  firstBasemanY: number = 833 * this.screenPctAdj;
  secondBasemanX: number = 1045 * this.screenPctAdj;
  secondBasemanY: number = 783 * this.screenPctAdj;
  thirdBasemanX: number = 625 * this.screenPctAdj;
  thirdBasemanY: number = 843 * this.screenPctAdj;
  shortstopX: number = 775 * this.screenPctAdj;
  shortstopY: number = 783 * this.screenPctAdj;
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
    pitcherHitterPlayerSeasonViewModel.obp = 0.400;
    pitcherHitterPlayerSeasonViewModel.slg = 0.650;
    pitcherHitterPlayerSeasonViewModel.avg = 0.300;
    pitcherHitterPlayerSeasonViewModel.pa = 600;
    pitcherHitterPlayerSeasonViewModel.ab = 500;
    pitcherHitterPlayerSeasonViewModel.hr = 30;
    pitcherHitterPlayerSeasonViewModel.rbi = 100;
    pitcherHitterPlayerSeasonViewModel.sb = 20;
    pitcherHitterPlayerSeasonViewModel.bb = 100;
    pitcherHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    pitcherHitterPlayerSeasonViewModel.player.playerName = "Adam Wainwright";

    var pitherPitcherPlayerSeasonViewModel = new PitcherPlayerSeasonViewModel();
    pitherPitcherPlayerSeasonViewModel.era = 3.26;
    pitherPitcherPlayerSeasonViewModel.fldPct = .989;
    pitherPitcherPlayerSeasonViewModel.whip = 1.46;
    pitherPitcherPlayerSeasonViewModel.player = new PlayerViewModel();
    pitherPitcherPlayerSeasonViewModel.player.playerName = "Adam Wainwright";
    var p = new GamePlayerViewModel("SP", pitcherHitterPlayerSeasonViewModel, pitherPitcherPlayerSeasonViewModel);
    p.BattingOrderNumber = 9;
    homeTeam.SetPitcher(p);

    var catcherHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    catcherHitterPlayerSeasonViewModel.obp = 0.400;
    catcherHitterPlayerSeasonViewModel.slg = 0.650;
    catcherHitterPlayerSeasonViewModel.avg = 0.300;
    catcherHitterPlayerSeasonViewModel.pa = 600;
    catcherHitterPlayerSeasonViewModel.ab = 500;
    catcherHitterPlayerSeasonViewModel.hr = 30;
    catcherHitterPlayerSeasonViewModel.rbi = 100;
    catcherHitterPlayerSeasonViewModel.sb = 20;
    catcherHitterPlayerSeasonViewModel.bb = 100;
    catcherHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    catcherHitterPlayerSeasonViewModel.player.playerName = "Yadi Molina";
    var c = new GamePlayerViewModel("C", catcherHitterPlayerSeasonViewModel, null);
    c.BattingOrderNumber = 8;
    homeTeam.SetCatcher(c);

    var firstBaseHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    firstBaseHitterPlayerSeasonViewModel.obp = 0.400;
    firstBaseHitterPlayerSeasonViewModel.slg = 0.650;
    firstBaseHitterPlayerSeasonViewModel.avg = 0.300;
    firstBaseHitterPlayerSeasonViewModel.pa = 600;
    firstBaseHitterPlayerSeasonViewModel.ab = 500;
    firstBaseHitterPlayerSeasonViewModel.hr = 30;
    firstBaseHitterPlayerSeasonViewModel.rbi = 100;
    firstBaseHitterPlayerSeasonViewModel.sb = 20;
    firstBaseHitterPlayerSeasonViewModel.bb = 100;
    firstBaseHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    firstBaseHitterPlayerSeasonViewModel.player.playerName = "Albert Pujols";

    var fb = new GamePlayerViewModel("1B", firstBaseHitterPlayerSeasonViewModel, null);
    fb.BattingOrderNumber = 3;
    homeTeam.SetFirstBase(fb);

    var secondBaseHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    secondBaseHitterPlayerSeasonViewModel.obp = 0.400;
    secondBaseHitterPlayerSeasonViewModel.slg = 0.650;
    secondBaseHitterPlayerSeasonViewModel.avg = 0.300;
    secondBaseHitterPlayerSeasonViewModel.pa = 600;
    secondBaseHitterPlayerSeasonViewModel.ab = 500;
    secondBaseHitterPlayerSeasonViewModel.hr = 30;
    secondBaseHitterPlayerSeasonViewModel.rbi = 100;
    secondBaseHitterPlayerSeasonViewModel.sb = 20;
    secondBaseHitterPlayerSeasonViewModel.bb = 100;
    secondBaseHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    secondBaseHitterPlayerSeasonViewModel.player.playerName = "Rogers Hornsby";
    var sb = new GamePlayerViewModel("2B", secondBaseHitterPlayerSeasonViewModel, null);
    sb.BattingOrderNumber = 1;
    homeTeam.SetSecondBase(sb);

    var thirdBaseHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    thirdBaseHitterPlayerSeasonViewModel.obp = 0.400;
    thirdBaseHitterPlayerSeasonViewModel.slg = 0.650;
    thirdBaseHitterPlayerSeasonViewModel.avg = 0.300;
    thirdBaseHitterPlayerSeasonViewModel.pa = 600;
    thirdBaseHitterPlayerSeasonViewModel.ab = 500;
    thirdBaseHitterPlayerSeasonViewModel.hr = 30;
    thirdBaseHitterPlayerSeasonViewModel.rbi = 100;
    thirdBaseHitterPlayerSeasonViewModel.sb = 20;
    thirdBaseHitterPlayerSeasonViewModel.bb = 100;
    thirdBaseHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    thirdBaseHitterPlayerSeasonViewModel.player.playerName = "Scott Rolen";
    var tb = new GamePlayerViewModel("3B", thirdBaseHitterPlayerSeasonViewModel, null);
    tb.BattingOrderNumber = 4;
    homeTeam.SetThirdBase(tb);

    var shortstopHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    shortstopHitterPlayerSeasonViewModel.obp = 0.400;
    shortstopHitterPlayerSeasonViewModel.slg = 0.650;
    shortstopHitterPlayerSeasonViewModel.avg = 0.300;
    shortstopHitterPlayerSeasonViewModel.pa = 600;
    shortstopHitterPlayerSeasonViewModel.ab = 500;
    shortstopHitterPlayerSeasonViewModel.hr = 30;
    shortstopHitterPlayerSeasonViewModel.rbi = 100;
    shortstopHitterPlayerSeasonViewModel.sb = 20;
    shortstopHitterPlayerSeasonViewModel.bb = 100;
    shortstopHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    shortstopHitterPlayerSeasonViewModel.player.playerName = "Ozzie Smith";
    var ss = new GamePlayerViewModel("SS", shortstopHitterPlayerSeasonViewModel, null);
    ss.BattingOrderNumber = 7;
    homeTeam.SetShortstop(ss);

    var leftfielderHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    leftfielderHitterPlayerSeasonViewModel.obp = 0.400;
    leftfielderHitterPlayerSeasonViewModel.slg = 0.650;
    leftfielderHitterPlayerSeasonViewModel.avg = 0.300;
    leftfielderHitterPlayerSeasonViewModel.pa = 600;
    leftfielderHitterPlayerSeasonViewModel.ab = 500;
    leftfielderHitterPlayerSeasonViewModel.hr = 30;
    leftfielderHitterPlayerSeasonViewModel.rbi = 100;
    leftfielderHitterPlayerSeasonViewModel.sb = 20;
    leftfielderHitterPlayerSeasonViewModel.bb = 100;
    leftfielderHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    leftfielderHitterPlayerSeasonViewModel.player.playerName = "Matt Holliday";
    var lf = new GamePlayerViewModel("LF", leftfielderHitterPlayerSeasonViewModel, null);
    lf.BattingOrderNumber = 5;
    homeTeam.SetLeftField(lf);

    var centerfielderHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    centerfielderHitterPlayerSeasonViewModel.obp = 0.400;
    centerfielderHitterPlayerSeasonViewModel.slg = 0.650;
    centerfielderHitterPlayerSeasonViewModel.avg = 0.300;
    centerfielderHitterPlayerSeasonViewModel.pa = 600;
    centerfielderHitterPlayerSeasonViewModel.ab = 500;
    centerfielderHitterPlayerSeasonViewModel.hr = 30;
    centerfielderHitterPlayerSeasonViewModel.rbi = 100;
    centerfielderHitterPlayerSeasonViewModel.sb = 20;
    centerfielderHitterPlayerSeasonViewModel.bb = 100;
    centerfielderHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    centerfielderHitterPlayerSeasonViewModel.player.playerName = "Lou Brock";
    var cf = new GamePlayerViewModel("CF", centerfielderHitterPlayerSeasonViewModel, null);
    cf.BattingOrderNumber = 2;
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
    let rf = new GamePlayerViewModel("RF", rightfielderHitterPlayerSeasonViewModel, null);
    rf.BattingOrderNumber = 6;
    homeTeam.SetRightField(rf);

    gameVM.HomeTeam = homeTeam;

    //---------------

    let awayTeam = new GameTeamViewModel("Rockies", 5678, "Colorado", 1998, "Coors Field");

    var pitcherHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    pitcherHitterPlayerSeasonViewModel.obp = 0.400;
    pitcherHitterPlayerSeasonViewModel.slg = 0.650;
    pitcherHitterPlayerSeasonViewModel.avg = 0.300;
    pitcherHitterPlayerSeasonViewModel.pa = 600;
    pitcherHitterPlayerSeasonViewModel.ab = 500;
    pitcherHitterPlayerSeasonViewModel.hr = 30;
    pitcherHitterPlayerSeasonViewModel.rbi = 100;
    pitcherHitterPlayerSeasonViewModel.sb = 20;
    pitcherHitterPlayerSeasonViewModel.bb = 100;
    pitcherHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    pitcherHitterPlayerSeasonViewModel.player.playerName = "Pedro Astacio";

    var pitherPitcherPlayerSeasonViewModel = new PitcherPlayerSeasonViewModel();
    pitherPitcherPlayerSeasonViewModel.era = 3.26;
    pitherPitcherPlayerSeasonViewModel.fldPct = .989;
    pitherPitcherPlayerSeasonViewModel.whip = 1.46;
    pitherPitcherPlayerSeasonViewModel.player = new PlayerViewModel();
    pitherPitcherPlayerSeasonViewModel.player.playerName = "Pedro Astacio";
    var ap = new GamePlayerViewModel("SP", pitcherHitterPlayerSeasonViewModel, pitherPitcherPlayerSeasonViewModel);
    ap.BattingOrderNumber = 9;
    awayTeam.SetPitcher(ap);

    var catcherHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    catcherHitterPlayerSeasonViewModel.obp = 0.400;
    catcherHitterPlayerSeasonViewModel.slg = 0.650;
    catcherHitterPlayerSeasonViewModel.avg = 0.300;
    catcherHitterPlayerSeasonViewModel.pa = 600;
    catcherHitterPlayerSeasonViewModel.ab = 500;
    catcherHitterPlayerSeasonViewModel.hr = 30;
    catcherHitterPlayerSeasonViewModel.rbi = 100;
    catcherHitterPlayerSeasonViewModel.sb = 20;
    catcherHitterPlayerSeasonViewModel.bb = 100;
    catcherHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    catcherHitterPlayerSeasonViewModel.player.playerName = "Yorvit Torrealba";
    var ac = new GamePlayerViewModel("C", catcherHitterPlayerSeasonViewModel, null);
    ac.BattingOrderNumber = 8;
    awayTeam.SetCatcher(ac);

    var firstBaseHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    firstBaseHitterPlayerSeasonViewModel.obp = 0.400;
    firstBaseHitterPlayerSeasonViewModel.slg = 0.650;
    firstBaseHitterPlayerSeasonViewModel.avg = 0.300;
    firstBaseHitterPlayerSeasonViewModel.pa = 600;
    firstBaseHitterPlayerSeasonViewModel.ab = 500;
    firstBaseHitterPlayerSeasonViewModel.hr = 30;
    firstBaseHitterPlayerSeasonViewModel.rbi = 100;
    firstBaseHitterPlayerSeasonViewModel.sb = 20;
    firstBaseHitterPlayerSeasonViewModel.bb = 100;
    firstBaseHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    firstBaseHitterPlayerSeasonViewModel.player.playerName = "Todd Helton";

    var afb = new GamePlayerViewModel("1B", firstBaseHitterPlayerSeasonViewModel, null);
    afb.BattingOrderNumber = 3;
    awayTeam.SetFirstBase(afb);

    var secondBaseHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    secondBaseHitterPlayerSeasonViewModel.obp = 0.400;
    secondBaseHitterPlayerSeasonViewModel.slg = 0.650;
    secondBaseHitterPlayerSeasonViewModel.avg = 0.300;
    secondBaseHitterPlayerSeasonViewModel.pa = 600;
    secondBaseHitterPlayerSeasonViewModel.ab = 500;
    secondBaseHitterPlayerSeasonViewModel.hr = 30;
    secondBaseHitterPlayerSeasonViewModel.rbi = 100;
    secondBaseHitterPlayerSeasonViewModel.sb = 20;
    secondBaseHitterPlayerSeasonViewModel.bb = 100;
    secondBaseHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    secondBaseHitterPlayerSeasonViewModel.player.playerName = "Mike Lansing";
    var asb = new GamePlayerViewModel("2B", secondBaseHitterPlayerSeasonViewModel, null);
    asb.BattingOrderNumber = 1;
    awayTeam.SetSecondBase(asb);

    var thirdBaseHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    thirdBaseHitterPlayerSeasonViewModel.obp = 0.400;
    thirdBaseHitterPlayerSeasonViewModel.slg = 0.650;
    thirdBaseHitterPlayerSeasonViewModel.avg = 0.300;
    thirdBaseHitterPlayerSeasonViewModel.pa = 600;
    thirdBaseHitterPlayerSeasonViewModel.ab = 500;
    thirdBaseHitterPlayerSeasonViewModel.hr = 30;
    thirdBaseHitterPlayerSeasonViewModel.rbi = 100;
    thirdBaseHitterPlayerSeasonViewModel.sb = 20;
    thirdBaseHitterPlayerSeasonViewModel.bb = 100;
    thirdBaseHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    thirdBaseHitterPlayerSeasonViewModel.player.playerName = "Nolan Arenado";
    var atb = new GamePlayerViewModel("3B", thirdBaseHitterPlayerSeasonViewModel, null);
    atb.BattingOrderNumber = 4;
    awayTeam.SetThirdBase(atb);

    var shortstopHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    shortstopHitterPlayerSeasonViewModel.obp = 0.400;
    shortstopHitterPlayerSeasonViewModel.slg = 0.650;
    shortstopHitterPlayerSeasonViewModel.avg = 0.300;
    shortstopHitterPlayerSeasonViewModel.pa = 600;
    shortstopHitterPlayerSeasonViewModel.ab = 500;
    shortstopHitterPlayerSeasonViewModel.hr = 30;
    shortstopHitterPlayerSeasonViewModel.rbi = 100;
    shortstopHitterPlayerSeasonViewModel.sb = 20;
    shortstopHitterPlayerSeasonViewModel.bb = 100;
    shortstopHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    shortstopHitterPlayerSeasonViewModel.player.playerName = "Troy Tulowitzki";
    var ass = new GamePlayerViewModel("SS", shortstopHitterPlayerSeasonViewModel, null);
    ass.BattingOrderNumber = 7;
    awayTeam.SetShortstop(ass);

    var leftfielderHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    leftfielderHitterPlayerSeasonViewModel.obp = 0.400;
    leftfielderHitterPlayerSeasonViewModel.slg = 0.650;
    leftfielderHitterPlayerSeasonViewModel.avg = 0.300;
    leftfielderHitterPlayerSeasonViewModel.pa = 600;
    leftfielderHitterPlayerSeasonViewModel.ab = 500;
    leftfielderHitterPlayerSeasonViewModel.hr = 30;
    leftfielderHitterPlayerSeasonViewModel.rbi = 100;
    leftfielderHitterPlayerSeasonViewModel.sb = 20;
    leftfielderHitterPlayerSeasonViewModel.bb = 100;
    leftfielderHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    leftfielderHitterPlayerSeasonViewModel.player.playerName = "Carlos Gonzalez";
    var alf = new GamePlayerViewModel("LF", leftfielderHitterPlayerSeasonViewModel, null);
    alf.BattingOrderNumber = 5;
    awayTeam.SetLeftField(alf);

    var centerfielderHitterPlayerSeasonViewModel = new HitterPlayerSeasonViewModel();
    centerfielderHitterPlayerSeasonViewModel.obp = 0.400;
    centerfielderHitterPlayerSeasonViewModel.slg = 0.650;
    centerfielderHitterPlayerSeasonViewModel.avg = 0.300;
    centerfielderHitterPlayerSeasonViewModel.pa = 600;
    centerfielderHitterPlayerSeasonViewModel.ab = 500;
    centerfielderHitterPlayerSeasonViewModel.hr = 30;
    centerfielderHitterPlayerSeasonViewModel.rbi = 100;
    centerfielderHitterPlayerSeasonViewModel.sb = 20;
    centerfielderHitterPlayerSeasonViewModel.bb = 100;
    centerfielderHitterPlayerSeasonViewModel.player = new PlayerViewModel();
    centerfielderHitterPlayerSeasonViewModel.player.playerName = "Charlie Blackmon";
    var acf = new GamePlayerViewModel("CF", centerfielderHitterPlayerSeasonViewModel, null);
    acf.BattingOrderNumber = 2;
    awayTeam.SetCenterField(acf);

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
    rightfielderHitterPlayerSeasonViewModel.player.playerName = "Larry Walker";
    let arf = new GamePlayerViewModel("RF", rightfielderHitterPlayerSeasonViewModel, null);
    arf.BattingOrderNumber = 6;
    awayTeam.SetRightField(arf);


    gameVM.AwayTeam = awayTeam;


    gameVM.StartGame();

    return gameVM;
  }
  //***

  ExecuteNextPlay() {
    this.ClearCanvas();

    setTimeout(() => {
      let diceRoll = this.GenerateRandomNumber(0, 1000);

      if (this.Game.CurrentAtBat.Batter.HittingSeasonStats.OBRP <= (diceRoll * .001)) {
        this.ExecuteCurrentBatterReachedBase();
      }
      else {
        this.ExecuteCurrentBatterIsOut();
      }
    }, 300);
  }

  GenerateRandomNumber(from: number, to: number): number {
    return Math.floor((Math.random() * to));

  }

  ExecuteCurrentBatterReachedBase() {
    let diceRoll = this.GenerateRandomNumber(1, 6);
    if (diceRoll == 1) {
      this.GroundBallSingleLeft1();
      this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " singles to left.");
    }
    else if (diceRoll == 2) {
      this.HomerLeftFieldLine();
      this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " homers down the left field line.");
    }
    else if (diceRoll == 3) {
      this.LongHomerLeftFieldLine();
      this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " hits a long homerun to left.");
    }
    else if (diceRoll == 4) {
      this.HomerLeftField();
      this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " homers to left field.");
    }
    else if (diceRoll == 5) {
      this.HomerLeftCenterField();
      this.showSuccess(this.Game.CurrentAtBat.Batter.Name + " homers to left-center field.");
    }
    else {
      this.GroundBallSingleLeft2();
    }

    this.Game.NewAtBat();
  }

  ExecuteCurrentBatterIsOut() {
    let diceRoll = this.GenerateRandomNumber(1, 3);
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
    img.src = this.Game.CurrentAtBat.Batter.PlayerImageURL;
    img.title = this.Game.CurrentAtBat.Batter.Name;

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    if (this.Game.CurrentAtBat.Batter.HittingSeasonStats.player.bats.toLowerCase() == "r") {
      img.onload = () => {
        this.ctx.drawImage(img,
          this.rightHandedBatterX, this.rightHandedBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
      }
    } else if (this.Game.CurrentAtBat.Batter.HittingSeasonStats.player.bats.toLowerCase() == "l") {
      img.onload = () => {
        this.ctx.drawImage(img,
          this.leftHandedBatterX, this.leftHandedBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
      }
    } else {
      img.onload = () => {
        this.ctx.drawImage(img,
          this.leftHandedBatterX, this.leftHandedBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
      }
    }

  }

  // DrawLeftHandedBatter() {
  //   let img = new Image();
  //   if (this.Game.CurrentInning.IsBottomOfInning) {
  //     img.src = this.Game.HomeTeam.RightFielder.PlayerImageURL;
  //     img.title = this.Game.HomeTeam.RightFielder.Name;
  //   }
  //   else {
  //     img.src = this.Game.AwayTeam.RightFielder.PlayerImageURL;
  //     img.title = "TEST TEST";// this.Game.AwayTeam.RightFielder.Name;
  //   }

  //   img.onerror = function () {
  //     img.src = '../assets/images/emptyHeadshot.jpeg';
  //   }


  // }

  // DrawRightHandedBatter() {
  //   let img = new Image();
  //   if (this.Game.CurrentInning.IsBottomOfInning) {
  //     img.src = this.Game.HomeTeam.FirstBaseman.PlayerImageURL;
  //     img.title = this.Game.HomeTeam.FirstBaseman.Name;
  //   }
  //   else {
  //     img.src = this.Game.AwayTeam.FirstBaseman.PlayerImageURL;
  //     img.title = this.Game.AwayTeam.FirstBaseman.Name;
  //   }

  //   img.onerror = function () {
  //     img.src = '../assets/images/emptyHeadshot.jpeg';
  //   }

  //   img.onload = () => {
  //     this.ctx.drawImage(img,
  //       this.rightHandedBatterX, this.rightHandedBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
  //   }
  // }

  DrawRunnerOnFirst() {
    let img = new Image();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.HomeTeam.SecondBaseman.PlayerImageURL;
      img.title = this.Game.HomeTeam.SecondBaseman.Name;
    } else {
      img.src = this.Game.AwayTeam.SecondBaseman.PlayerImageURL;
      img.title = this.Game.AwayTeam.SecondBaseman.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.firstBaseX, this.firstBaseY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawRunnerOnSecond() {
    let img = new Image();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.HomeTeam.Shortstop.PlayerImageURL;
      img.title = this.Game.HomeTeam.Shortstop.Name;
    }
    else {
      img.src = this.Game.AwayTeam.Shortstop.PlayerImageURL;
      img.title = this.Game.AwayTeam.Shortstop.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.secondBaseX, this.secondBaseY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawRunnerOnThird() {
    let img = new Image();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.HomeTeam.ThirdBaseman.PlayerImageURL;
      img.title = this.Game.HomeTeam.ThirdBaseman.Name;
    } else {
      img.src = this.Game.AwayTeam.ThirdBaseman.PlayerImageURL;
      img.title = this.Game.AwayTeam.ThirdBaseman.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.thirdBaseX, this.thirdBaseY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawHitterOnHomeDeck() {
    let img = new Image();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.HomeTeam.LeftFielder.PlayerImageURL;
      img.title = this.Game.HomeTeam.LeftFielder.Name;
    } else {
      img.src = this.Game.AwayTeam.LeftFielder.PlayerImageURL;
      img.title = this.Game.AwayTeam.LeftFielder.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.homeOnDeckBatterX, this.homeOnDeckBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawHitterOnAwayDeck() {
    let img = new Image();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.HomeTeam.CenterFielder.PlayerImageURL;
      img.title = this.Game.HomeTeam.CenterFielder.Name;
    }
    else {
      img.src = this.Game.AwayTeam.CenterFielder.PlayerImageURL;
      img.title = this.Game.AwayTeam.CenterFielder.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.awayOnDeckBatterX, this.awayOnDeckBatterY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawPitcher() {
    let img = new Image();
    let color = 'red';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.Pitcher.PlayerImageURL;
      img.title = this.Game.AwayTeam.Pitcher.Name;
      color = 'blue';
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
    let color = 'red';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.Catcher.PlayerImageURL;
      img.title = this.Game.AwayTeam.Catcher.Name;
      color = 'blue';
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
    let color = 'red';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.FirstBaseman.PlayerImageURL;
      img.title = this.Game.AwayTeam.FirstBaseman.Name;
      color = 'blue';
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
    let color = 'red';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.SecondBaseman.PlayerImageURL;
      img.title = this.Game.AwayTeam.SecondBaseman.Name;
      color = 'blue';
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
    let color = 'red';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.ThirdBaseman.PlayerImageURL;
      img.title = this.Game.AwayTeam.ThirdBaseman.Name;
      color = 'blue';
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
    let color = 'red';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.Shortstop.PlayerImageURL;
      img.title = this.Game.AwayTeam.Shortstop.Name;
      color = 'blue';
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
    let color = 'red';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.LeftFielder.PlayerImageURL;
      img.title = this.Game.AwayTeam.LeftFielder.Name;
      color = 'blue';
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
    let color = 'red';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.RightFielder.PlayerImageURL;
      img.title = this.Game.AwayTeam.RightFielder.Name;
      color = 'blue';
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
    let color = 'red';
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.CenterFielder.PlayerImageURL;
      img.title = this.Game.AwayTeam.CenterFielder.Name;
      color = 'blue';
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

  groundBallSingleLeft1X: number = 370 * this.screenPctAdj;
  groundBallSingleLeft1Y: number = 500 * this.screenPctAdj;

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

  Fastball() {

    this.ctx.beginPath();
    this.ctx.moveTo(this.pitcherX + 10, this.pitcherY + 10);
    this.ctx.lineTo(this.catcherX + 10, this.catcherY + 10);
    this.ctx.lineWidth = 3;

    // line color
    this.ctx.strokeStyle = 'gray';
    this.ctx.stroke();

    this.PlayPitchSound();
  }

  GroundBallHit(x: number, y: number, desc: string) {
    // this.SetPlayingField();
    this.PlayBatHittingBallSound();


    this.ctx.beginPath();
    this.ctx.moveTo(this.homePlateX, this.homePlateY);
    this.ctx.lineTo(x, y);
    this.ctx.lineWidth = 2;

    // line color
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
    this.showSuccess(desc);
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

    //   this.ctx.lineDashOffset = 4;
    this.ctx.stroke();
  }


  ClearCanvas() {
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

  showSuccess(msg: string) {
    this.toastr.success("", msg, {
      timeOut: 3000,
      positionClass: "toast-top-center",
      messageClass: "toast-message"
    });

    this.Game.PlayByPlay += "\n" + " " + msg;
  }

  showError(msg: string) {
    this.toastr.error("", msg, {
      timeOut: 3000,
      positionClass: "toast-top-center",
      messageClass: "toast-message"
    });

    this.Game.PlayByPlay += "\n" + " " + msg;
  }


  FlipHomeAway() {
    this.Game.CurrentInning.IsBottomOfInning = !this.Game.CurrentInning.IsBottomOfInning;
  }

}
