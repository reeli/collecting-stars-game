import imgSky from '../assets/sky.png';
import imgStar from '../assets/star.png';
import imgPlatform from '../assets/platform.png';
import imgDude from '../assets/dude.png';

export class Preloader extends Phaser.Scene {
  platforms: Phaser.Physics.Arcade.StaticGroup | null;
  player: Phaser.Physics.Arcade.Sprite | null;

  constructor() {
    super({
      key: "Preloader"
    });
    this.platforms = null;
    this.player = null;
  }

  preload() {
    this.load.image("sky", imgSky);
    this.load.image("star", imgStar);
    this.load.image("ground", imgPlatform);
    this.load.image("dude", imgDude);
  }

  create() {
    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "sky");
    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "star");

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');


    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setGravityY(100000);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{key: 'dude', frame: 4}],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
      frameRate: 10,
      repeat: -1
    });
  }
}
