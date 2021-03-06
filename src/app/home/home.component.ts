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
    this.ImageURLs.push("../assets/images/cobb1.jpg");
    this.ImageURLs.push("../assets/images/nolanryan1.jpg");
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
