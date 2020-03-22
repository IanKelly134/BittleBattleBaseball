import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameViewModel } from '../game-view-model';
import { MLBYearByYearLeagueStatsServiceService } from '../mlbyear-by-year-league-stats-service.service';
import { MLBYearByYearBattingStatsViewModel } from '../mlbyear-by-year-batting-stats-view-model';
import { MLBYearByYearPitchingStatsViewModel } from '../mlbyear-by-year-pitching-stats-view-model';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.scss']
})

export class GameplayComponent implements OnInit, AfterViewInit {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  batHittingBallSound = new Audio("../assets/audio/batHittingBall.mp3");
  pitchSound = new Audio("../assets/assets/audio/caughtball.mp3");
  IsSoundMuted: boolean = false;

  screenPctAdj: number = 0.62;

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

  homePlateX: number = 895 * this.screenPctAdj;
  homePlateY: number = 990 * this.screenPctAdj;
  firstBaseX: number = 1220 * this.screenPctAdj;
  firstBaseY: number = 800 * this.screenPctAdj;
  secondBaseX: number = 905 * this.screenPctAdj;
  secondBaseY: number = 690 * this.screenPctAdj;
  thirdBaseX: number = 555 * this.screenPctAdj;
  thirdBaseY: number = 790 * this.screenPctAdj;

  rightHandedBatterX: number = 830 * this.screenPctAdj;
  rightHandedBatterY: number = 940 * this.screenPctAdj;
  leftHandedBatterX: number = 915 * this.screenPctAdj;
  leftHandedBatterY: number = 940 * this.screenPctAdj;

  homeOnDeckBatterX: number = 1300 * this.screenPctAdj;
  homeOnDeckBatterY: number = 950 * this.screenPctAdj;
  awayOnDeckBatterX: number = 480 * this.screenPctAdj;
  awayOnDeckBatterY: number = 950 * this.screenPctAdj;

  catcherX: number = 875 * this.screenPctAdj;
  catcherY: number = 900 * this.screenPctAdj;
  pitcherX: number = 895 * this.screenPctAdj;
  pitcherY: number = 700 * this.screenPctAdj;
  firstBasemanX: number = 1210 * this.screenPctAdj;
  firstBasemanY: number = 610 * this.screenPctAdj;
  secondBasemanX: number = 1045 * this.screenPctAdj;
  secondBasemanY: number = 600 * this.screenPctAdj;
  thirdBasemanX: number = 584 * this.screenPctAdj;
  thirdBasemanY: number = 620 * this.screenPctAdj;
  shortstopX: number = 740 * this.screenPctAdj;
  shortstopY: number = 600 * this.screenPctAdj;
  leftFielderX: number = 565 * this.screenPctAdj;
  leftFielderY: number = 370 * this.screenPctAdj;
  centerFielderX: number = 935 * this.screenPctAdj;
  centerFielderY: number = 320 * this.screenPctAdj;
  rightFielderX: number = 1360 * this.screenPctAdj;
  rightFielderY: number = 355 * this.screenPctAdj;

  canvasWidth: number = 1920 * this.screenPctAdj;
  canvasHeight: number = 1080 * this.screenPctAdj;

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
    // this.Game = history.state;
    // this.Game.StartGame();
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    game: GameViewModel, mlbYearByYearLeagueStatsServiceService: MLBYearByYearLeagueStatsServiceService) //, private toastr: ToastrService
  {
    //console.log(this.router.getCurrentNavigation().extras.state);
    document.body.style.backgroundImage = "url('../assets/images/baseball-background1.jpg')";

    this.GameId = activatedRoute.snapshot.params["gameId"];
    //var parsedGame = ) as GameViewModel;
    //Object.assign(this.Game, JSON.parse(localStorage.getItem('bittlebattlebaseball_game_instance' + this.GameId)));


    this.Game = game;

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

  SetPlayingField() {
    this.canvas = <HTMLCanvasElement>document.getElementById("ballparkCanvas");
    this.ctx = this.canvas.getContext("2d");
    let img = new Image();
    img.src = '../assets/images/GenericField.png';
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
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.Pitcher.PlayerImageURL;
      img.title = this.Game.AwayTeam.Pitcher.Name;
    }
    else {
      img.src = this.Game.HomeTeam.Pitcher.PlayerImageURL;
      img.title = this.Game.HomeTeam.Pitcher.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.pitcherX, this.pitcherY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawCatcher() {
    let img = new Image();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.Catcher.PlayerImageURL;
      img.title = this.Game.AwayTeam.Catcher.Name;
    }
    else {
      img.src = this.Game.HomeTeam.Catcher.PlayerImageURL;
      img.title = this.Game.HomeTeam.Catcher.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.catcherX, this.catcherY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawFirstBasemen() {
    let img = new Image();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.FirstBaseman.PlayerImageURL;
      img.title = this.Game.AwayTeam.FirstBaseman.Name;
    }
    else {
      img.src = this.Game.HomeTeam.FirstBaseman.PlayerImageURL;
      img.title = "\"" + this.Game.HomeTeam.FirstBaseman.Name + "\"";
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.firstBasemanX, this.firstBasemanY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawSecondBasemen() {
    let img = new Image();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.SecondBaseman.PlayerImageURL;
      img.title = this.Game.AwayTeam.SecondBaseman.Name;
    } else {
      img.src = this.Game.HomeTeam.SecondBaseman.PlayerImageURL;
      img.title = this.Game.HomeTeam.SecondBaseman.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.secondBasemanX, this.secondBasemanY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawThirdBasemen() {
    let img = new Image();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.ThirdBaseman.PlayerImageURL;
      img.title = this.Game.AwayTeam.ThirdBaseman.Name;
    } else {
      img.src = this.Game.HomeTeam.ThirdBaseman.PlayerImageURL;
      img.title = this.Game.HomeTeam.ThirdBaseman.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.thirdBasemanX, this.thirdBasemanY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawShortstop() {
    let img = new Image();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.Shortstop.PlayerImageURL;
      img.title = this.Game.AwayTeam.Shortstop.Name;
    } else {
      img.src = this.Game.HomeTeam.Shortstop.PlayerImageURL;
      img.title = this.Game.HomeTeam.Shortstop.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.shortstopX, this.shortstopY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawLeftfielder() {
    let img = new Image();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.LeftFielder.PlayerImageURL;
      img.title = this.Game.AwayTeam.LeftFielder.Name;
    } else {
      img.src = this.Game.HomeTeam.LeftFielder.PlayerImageURL;
      img.title = this.Game.HomeTeam.LeftFielder.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.leftFielderX, this.leftFielderY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawRightfielder() {
    let img = new Image();
    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.RightFielder.PlayerImageURL;
      img.title = this.Game.AwayTeam.RightFielder.Name;
    }
    else {
      img.src = this.Game.HomeTeam.RightFielder.PlayerImageURL;
      img.title = this.Game.HomeTeam.RightFielder.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.rightFielderX, this.rightFielderY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  DrawCenterfielder() {
    let img = new Image();

    if (this.Game.CurrentInning.IsBottomOfInning) {
      img.src = this.Game.AwayTeam.CenterFielder.PlayerImageURL;
      img.title = this.Game.AwayTeam.CenterFielder.Name;
    } else {
      img.src = this.Game.HomeTeam.CenterFielder.PlayerImageURL;
      img.title = this.Game.HomeTeam.CenterFielder.Name;
    }

    img.onerror = function () {
      img.src = '../assets/images/emptyHeadshot.jpeg';
    }

    img.onload = () => {
      this.ctx.drawImage(img,
        this.centerFielderX, this.centerFielderY, this.playerFieldImgAvatarWidth, this.playerFieldImgAvatarHeight);
    }
  }

  groundBallSingleLeft1X: number = 415 * this.screenPctAdj;
  groundBallSingleLeft1Y: number = 720 * this.screenPctAdj;

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
  flyBallInfieldOut1cp1Y: number = 10 * this.screenPctAdj;
  flyBallInfieldOut1cp2X: number = 1050 * this.screenPctAdj;
  flyBallInfieldOut1cp2Y: number = 150 * this.screenPctAdj;
  FlyBallInfieldOut1() {
    this.FlyBallHit(this.flyBallInfieldOut1cp1X, this.flyBallInfieldOut1cp1Y, this.flyBallInfieldOut1cp2X, this.flyBallInfieldOut1cp2Y,
      (this.rightFielderX + this.centerFielderX + 50) / 2, this.shortstopY + 30);
  }

  FlyBallInfieldOut2() {
    this.FlyBallHit(850, 10, 850, 150, (this.leftFielderX + this.centerFielderX) / 2, this.secondBasemanY + 30);
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

  HomerLeftFieldLine() {
    this.FlyBallHit(550, 10, 475, 250, 400, this.leftFielderY);
  }

  LongHomerLeftFieldLine() {
    this.FlyBallHit(550, 10, 475, 200, 400, this.leftFielderY - 78);
  }

  showSuccess(msg: string) {
    // this.toastr.success("", msg, {
    //   timeOut: 3000,
    //   positionClass: "toast-top-center",
    //   messageClass: "toast-message"
    // });

    this.Game.PlayByPlay += "\n" + " " + msg;
  }

  FlipHomeAway() {
    this.Game.CurrentInning.IsBottomOfInning = !this.Game.CurrentInning.IsBottomOfInning;
  }

}
