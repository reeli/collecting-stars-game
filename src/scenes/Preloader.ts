import imgSky from '../assets/sky.png';
import imgStar from '../assets/star.png';
import imgPlatform from '../assets/platform.png';

export class Preloader extends Phaser.Scene {
  platforms: Phaser.Physics.Arcade.StaticGroup | null;

  constructor() {
    super({
      key: "Preloader"
    });
    this.platforms = null;
  }

  preload() {
    this.load.image("sky", imgSky);
    this.load.image("star", imgStar);
    this.load.image("ground", imgPlatform);
  }

  create() {
    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "sky");
    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "star");

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
  }
}
