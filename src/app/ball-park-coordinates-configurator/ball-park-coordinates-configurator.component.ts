import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-ball-park-coordinates-configurator',
  templateUrl: './ball-park-coordinates-configurator.component.html',
  styleUrls: ['./ball-park-coordinates-configurator.component.scss']
})
export class BallParkCoordinatesConfiguratorComponent implements OnInit, AfterViewInit {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  batHittingBallSound = new Audio("http://localhost:4200/assets/audio/batHittingBall.mp3");
  pitchSound = new Audio("http://localhost:4200/assets/audio/caughtball.mp3");
  IsSoundMuted: boolean = false;

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

  firstBaseX: number;
  firstBaseY: number;
  secondBaseX: number;
  secondBaseY: number;
  thirdBaseX: number;
  thirdBaseY: number;

  screenPctAdj: number = 0.85;

  catcherX: number = 1000 * this.screenPctAdj;
  catcherY: number = 720 * this.screenPctAdj;
  pitcherX: number = 955 * this.screenPctAdj;
  pitcherY: number = 575 * this.screenPctAdj;
  firstBasemanX: number = 1220 * this.screenPctAdj;
  firstBasemanY: number = 565 * this.screenPctAdj;
  secondBasemanX: number = 1075 * this.screenPctAdj;
  secondBasemanY: number = 525 * this.screenPctAdj;
  thirdBasemanX: number = 710 * this.screenPctAdj;
  thirdBasemanY: number = 555 * this.screenPctAdj;
  shortstopX: number = 825 * this.screenPctAdj;
  shortstopY: number = 529 * this.screenPctAdj;
  leftFielderX: number = 640 * this.screenPctAdj;
  leftFielderY: number = 475 * this.screenPctAdj;
  centerFielderX: number = 955 * this.screenPctAdj;
  centerFielderY: number = 460 * this.screenPctAdj;
  rightFielderX: number = 1250 * this.screenPctAdj;
  rightFielderY: number = 475 * this.screenPctAdj;

  canvasWidth: number = 1920 * this.screenPctAdj;
  canvasHeight: number = 1080 * this.screenPctAdj;

  ngAfterViewInit(): void {
    this.SetPlayingField();

  }

  SetPlayingField() {
    this.canvas = <HTMLCanvasElement>document.getElementById("ballparkCanvas");
    this.ctx = this.canvas.getContext("2d");
    let img = new Image();
    img.src = 'http://localhost:4200/assets/images/camden1.jpg';
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
      this.SetDefensivePlayers();
    }
  }

  constructor() { }

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

  DrawPitcher() {
    let img = new Image();
    img.src = 'http://localhost:4200/assets/images/emptyPitcherIcon.png';
    img.onload = () => {
      this.ctx.drawImage(img,
        this.pitcherX, this.pitcherY, 60, 60);
    }
  }

  DrawCatcher() {
    let img = new Image();
    img.src = 'http://localhost:4200/assets/images/emptyCatcherIcon.png';
    img.onload = () => {
      this.ctx.drawImage(img,
        this.catcherX, this.catcherY, 40, 40);
    }
  }

  DrawFirstBasemen() {
    let img = new Image();
    img.src = 'http://localhost:4200/assets/images/emptyRightSideInfielderIcon.png';
    img.onload = () => {
      this.ctx.drawImage(img,
        this.firstBasemanX, this.firstBasemanY, 35, 35);
    }
  }

  DrawSecondBasemen() {
    let img = new Image();
    img.src = 'http://localhost:4200/assets/images/emptyRightSideInfielderIcon.png';
    img.onload = () => {
      this.ctx.drawImage(img,
        this.secondBasemanX, this.secondBasemanY, 35, 35);
    }
  }

  DrawThirdBasemen() {
    let img = new Image();
    img.src = 'http://localhost:4200/assets/images/emptyLeftSideInfielderIcon.png';
    img.onload = () => {
      this.ctx.drawImage(img,
        this.thirdBasemanX, this.thirdBasemanY, 35, 35);
    }
  }

  DrawShortstop() {
    let img = new Image();
    img.src = 'http://localhost:4200/assets/images/emptyLeftSideInfielderIcon.png';
    img.onload = () => {
      this.ctx.drawImage(img,
        this.shortstopX, this.shortstopY, 35, 35);
    }
  }

  DrawLeftfielder() {
    let img = new Image();
    img.src = 'http://localhost:4200/assets/images/emptyLeftSideOutfielderIcon.png';
    img.onload = () => {
      this.ctx.drawImage(img,
        this.leftFielderX, this.leftFielderY, 35, 35);
    }
  }

  DrawRightfielder() {
    let img = new Image();
    img.src = 'http://localhost:4200/assets/images/emptyRightSideOutfielderIcon.png';
    img.onload = () => {
      this.ctx.drawImage(img,
        this.rightFielderX, this.rightFielderY, 35, 35);
    }
  }

  DrawCenterfielder() {
    let img = new Image();
    img.src = 'http://localhost:4200/assets/images/emptyCenterFielderIcon.png';
    img.onload = () => {
      this.ctx.drawImage(img,
        this.centerFielderX, this.centerFielderY, 35, 35);
    }
  }

  GroundBallSingleLeft1() {
    this.GroundBallHit(550, 550);
  }

  GroundBallLeft2() {
    this.GroundBallHit(730, 510);
  }

  FlyBallRight1() {
    this.FlyBallHit(1100, 10, 1200, 250, this.rightFielderX, this.rightFielderY);
  }

  FlyBallCenter() {
    this.FlyBallHit(1000, 10, 1000, 150, this.centerFielderX, this.centerFielderY);
  }

  FlyBallLeftCenter() {
    this.FlyBallHit(850, 10, 850, 150, (this.leftFielderX + this.centerFielderX) / 2, this.centerFielderY);
  }

  FlyBallRightCenter() {
    this.FlyBallHit(1000, 10, 1050, 150, (this.rightFielderX + this.centerFielderX + 50) / 2, this.centerFielderY);
  }

  FlyBallLeft1() {
    this.FlyBallHit(700, 10, 650, 250, this.leftFielderX, this.leftFielderY);
  }

  FlyBallLeft2() {
    this.FlyBallHit(750, 30, 700, 150, this.leftFielderX, this.leftFielderY);
  }

  GroundBallRight1() {
    this.GroundBallHit(1200, 525);
  }

  GroundBallRight2() {
    this.GroundBallHit(1450, 530);
  }

  GroundBallCenter1() {
    this.GroundBallHit(925, 500);
  }

  GroundBallCenter2() {
    this.GroundBallHit(1025, 500);
  }

  FlyBallInfield1() {
    this.FlyBallHit(1000, 10, 1050, 150, (this.rightFielderX + this.centerFielderX + 50) / 2, this.shortstopY + 30);
  }

  FlyBallInfield2() {
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

  GroundBallHit(x: number, y: number) {
    this.PlayBatHittingBallSound();
    this.ctx.beginPath();
    this.ctx.moveTo(this.catcherX, this.catcherY);
    this.ctx.lineTo(x, y);
    this.ctx.lineWidth = 2;

    // line color
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
  }

  FlyBallHit(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
    this.PlayBatHittingBallSound();
    //  this.ctx.setLineDash([4, 8]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.catcherX, this.catcherY);
    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    this.ctx.lineWidth = 4;
    // line color
    this.ctx.strokeStyle = 'white';

    //   this.ctx.lineDashOffset = 4;
    this.ctx.stroke();
  }


  ClearCanvas() {
    this.SetPlayingField();
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

  ngOnInit() {

  }

}
