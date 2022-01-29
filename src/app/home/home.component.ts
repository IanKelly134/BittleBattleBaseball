import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ImageCarouselURL: string = "";
  ImageURLs: string[];

  constructor() {
    this.ImageURLs = new Array<string>();
    this.ImageURLs.push("../assets/images/ruth1.jpg");
    this.ImageURLs.push("../assets/images/musial1.jpg");
    this.ImageURLs.push("../assets/images/jeter1.jpg");
    this.ImageURLs.push("../assets/images/spahn1.jpg");
    this.ImageURLs.push("../assets/images/bigunit1.jpg");
    this.ImageURLs.push("../assets/images/maddux1.jpg");
    this.ImageURLs.push("../assets/images/trout1.jpg");
    this.ImageURLs.push("../assets/images/aaron1.jpg");
    this.ImageURLs.push("../assets/images/pujols1.jpg");
    this.ImageURLs.push("../assets/images/wjohnson1.jpg");
    this.ImageURLs.push("../assets/images/jrobinson1.jpg");
    this.ImageURLs.push("../assets/images/arenado1.jpg");
    this.ImageURLs.push("../assets/images/mays1.jpg");
    this.ImageURLs.push("../assets/images/mantle1.jpg");
    this.ImageURLs.push("../assets/images/ichiro1.jpg");
    this.ImageURLs.push("../assets/images/mattingly1.jpg");
    this.ImageURLs.push("../assets/images/cobb1.jpg");
    this.ImageURLs.push("../assets/images/nolanryan1.jpg");
    this.ImageURLs.push("../assets/images/vladSr.jpeg");
    this.ImageURLs.push("../assets/images/winfield1.jpg");
    this.ImageURLs.push("../assets/images/matthewson1.JPG");
    this.ImageURLs.push("../assets/images/banks1.jpg");
    this.ImageURLs.push("../assets/images/judge1.jpg");
    this.ImageURLs.push("../assets/images/yelich1.JPG");
    this.ImageURLs.push("../assets/images/gehrig1.jpg");
    this.ImageURLs.push("../assets/images/williams1.jpg");
    this.ImageURLs.push("../assets/images/wagner1.JPG");
    this.ImageURLs.push("../assets/images/hornsby1.jpeg");
    this.ImageURLs.push("../assets/images/gibson1.jpg");
    this.ImageURLs.push("../assets/images/koufax1.jpg");
    this.ImageURLs.push("../assets/images/martinez1.jpg");
    this.ImageURLs.push("../assets/images/palmer1.jpg");
    this.ImageURLs.push("../assets/images/clemente1.jpg");
    this.ImageURLs.push("../assets/images/foxx.jpeg");
    this.ImageURLs.push("../assets/images/ott1.jpg");
    this.ImageURLs.push("../assets/images/henderson1.jpg");
    this.ImageURLs.push("../assets/images/collins1.jpg");
    this.ImageURLs.push("../assets/images/dimaggio1.jpg");
    this.ImageURLs.push("../assets/images/speaker1.jpg");
    this.ImageURLs.push("../assets/images/young1.jpg");
    this.ImageURLs.push("../assets/images/jackson1.jpg");
    this.ImageURLs.push("../assets/images/robinson1.JPG");
    this.ImageURLs.push("../assets/images/rose1.jpg");
    this.ImageURLs.push("../assets/images/bumgarner1.jpg");
    this.ImageURLs.push("../assets/images/gwynn1.jpg");
    this.ImageURLs.push("../assets/images/boggs1.jpg");
    this.ImageURLs.push("../assets/images/puckett1.jpg");
    this.ImageURLs.push("../assets/images/osmith1.jpg");
    this.ImageURLs.push("../assets/images/lester1.jpg");
    this.ImageURLs.push("../assets/images/fingers1.jpg");
    this.ImageURLs.push("../assets/images/seaver1.jpg");
    this.ImageURLs.push("../assets/images/bench1.jpg");
    this.ImageURLs.push("../assets/images/berra1.jpg");
    this.ImageURLs.push("../assets/images/walker1.jpg");
    this.ImageURLs.push("../assets/images/tulo1.jpg");
    this.ImageURLs.push("../assets/images/helton1.jpg");
    this.ImageURLs.push("../assets/images/kershaw1.jpg");
    this.ImageURLs.push("../assets/images/molina1.jpg");
    this.ImageURLs.push("../assets/images/carter.jpg");
    this.ImageURLs.push("../assets/images/brock1.jpg");
    this.ImageURLs.push("../assets/images/shoelessjoe1.jpg");
    this.ImageURLs.push("../assets/images/killebrew1.jpg");
    this.ImageURLs.push("../assets/images/carew1.jpg");
    this.ImageURLs.push("../assets/images/griffey1.jpg");
    this.ImageURLs.push("../assets/images/brobinson1.jpg");
    this.ImageURLs.push("../assets/images/ohtani1.jpg");
    this.ImageURLs.push("../assets/images/betts1.jpg");
    this.ImageURLs.push("../assets/images/bellinger1.jpg");
    this.ImageURLs.push("../assets/images/verlander1.jpg");
    this.ImageURLs.push("../assets/images/beltre1.jpg");
    this.ImageURLs.push("../assets/images/cabrera1.jpg");
    this.ImageURLs.push("../assets/images/valenzuela1.jpg");
    this.ImageURLs.push("../assets/images/rizzo1.jpg");
    this.ImageURLs.push("../assets/images/story1.JPG");
    this.ImageURLs.push("../assets/images/santo1.jpeg");
    this.ImageURLs.push("../assets/images/sandberg1.jpg");
    this.ImageURLs.push("../assets/images/dean1.jpg");
    this.ImageURLs.push("../assets/images/yaz1.jpg");
    this.ImageURLs.push("../assets/images/posey1.jpg");
    this.ImageURLs.push("../assets/images/pudge1.jpg");
    this.ImageURLs.push("../assets/images/votto1.jpg");
    this.ImageURLs.push("../assets/images/maysCatch1.jpg");
    this.ImageURLs.push("../assets/images/ruth2.jpeg");
    this.ImageURLs.push("../assets/images/ruth60th.jpg");
    this.ImageURLs.push("../assets/images/shotHeardRoundTheWorld.jpg");
    this.ImageURLs.push("../assets/images/rivera1.jpg");
    this.ImageURLs.push("../assets/images/aaron2.jpg");
    this.ImageURLs.push("../assets/images/aaron715.jpg");
    this.ImageURLs.push("../assets/images/maris61.jpg");
    this.ImageURLs.push("../assets/images/ryan2.jpg");
    this.ImageURLs.push("../assets/images/gehrig2.jpg");
    this.ImageURLs.push("../assets/images/williams2.jpg");
    this.ImageURLs.push("../assets/images/musial2.jpg");
    this.ImageURLs.push("../assets/images/musial3.jpg");
    this.ImageURLs.push("../assets/images/thomas1.jpg");
    this.ImageURLs.push("../assets/images/waino1.jpg");
    this.ImageURLs.push("../assets/images/carp1.jpg");
    this.ImageURLs.push("../assets/images/degrom1.jpg");
    this.ImageURLs.push("../assets/images/strawberry1.jpeg");
    this.ImageURLs.push("../assets/images/gooden1.jpg");
    this.ImageURLs.push("../assets/images/ripken1.jpg");
    this.ImageURLs.push("../assets/images/piazza1.jpg");
    this.ImageURLs.push("../assets/images/greenberg1.jpg");
    this.ImageURLs.push("../assets/images/schmidt1.jpg");
    this.ImageURLs.push("../assets/images/mauer1.jpg");
    this.ImageURLs.push("../assets/images/raines1.jpg");
    this.ImageURLs.push("../assets/images/dawson1.jpg");
    this.ImageURLs.push("../assets/images/cjones1.jpg");
    this.ImageURLs.push("../assets/images/glavine1.jpg");
    this.ImageURLs.push("../assets/images/murphy1.jpg");
    this.ImageURLs.push("../assets/images/lsmith1.jpg");
    this.ImageURLs.push("../assets/images/gossage1.jpg");
    this.ImageURLs.push("../assets/images/hoffman1.jpeg");
    this.ImageURLs.push("../assets/images/eckersley1.jpg");
    this.ImageURLs.push("../assets/images/molitor1.jpg");
    this.ImageURLs.push("../assets/images/yount1.jpg");
    this.ImageURLs.push("../assets/images/halladay1.jpg");
    this.ImageURLs.push("../assets/images/biggio1.jpg");
    this.ImageURLs.push("../assets/images/price1.jpg");
    this.ImageURLs.push("../assets/images/scherzer1.jpg");
    this.ImageURLs.push("../assets/images/strasburg1.jpg");
    this.ImageURLs.push("../assets/images/campanella1.jpg");
    this.ImageURLs.push("../assets/images/snyder1.jpg");
    this.ImageURLs.push("../assets/images/drysdale1.jpg");
    this.ImageURLs.push("../assets/images/paige1.jpg");
    this.ImageURLs.push("../assets/images/mantle2.jpg");
    this.ImageURLs.push("../assets/images/pujols2.jpg");
    this.ImageURLs.push("../assets/images/jeter2.jpg");
    this.ImageURLs.push("../assets/images/mays2.jpg");

    document.body.style.backgroundImage = "url('../assets/images/BaseballFieldBackground.jpg')";

    this.setNewImage();
  }

  ngOnInit() {
    setInterval(() => {
      this.setNewImage();
    }, 5000);
  }

  private setNewImage() {
    let randomIndex = Math.floor((Math.random() * this.ImageURLs.length - 1));
    this.ImageCarouselURL = this.ImageURLs[randomIndex];
  }

}
