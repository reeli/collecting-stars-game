import imgSky from '../assets/sky.png';
import imgStar from '../assets/star.png';
import imgPlatform from '../assets/platform.png';
import imgDude from '../assets/dude.png';
import imgBomb from '../assets/bomb.png';

export class Preloader extends Phaser.Scene {
  platforms: Phaser.Physics.Arcade.StaticGroup | null;
  player: Phaser.Physics.Arcade.Sprite | null;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;
  scoreText: Phaser.GameObjects.Text | null;
  score: number;
  gameOver: boolean;
  stars: Phaser.Physics.Arcade.Group | null;
  bombs: Phaser.Physics.Arcade.Group | null;

  constructor() {
    super({
      key: "Preloader"
    });
    this.platforms = null;
    this.player = null;
    this.cursors = null;
    this.scoreText = null;
    this.score = 0;
    this.gameOver = false;
    this.stars = null;
    this.bombs = null;
  }

  preload() {
    this.load.image("sky", imgSky);
    this.load.image("star", imgStar);
    this.load.image("ground", imgPlatform);
    this.load.image("bomb", imgBomb);
    this.load.spritesheet("dude", imgDude, {frameWidth: 32, frameHeight: 48});
  }

  create() {
    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "sky");
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');


    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

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

    // ?
    this.physics.add.collider(this.player, this.platforms);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: {x: 12, y: 0, stepX: 70}
    });

    // TODO: remove any here
    this.stars.children.iterate((child: any) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this);

    this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});

    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, undefined, this);
  }

  update() {
    const cursors = this.cursors!;
    const player = this.player!;

    if (cursors.left!.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
    } else if (cursors.right!.isDown) {
      player.setVelocityX(160);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }

    if (cursors.up!.isDown && player.body.touching.down) {
      player.setVelocityY(-350);
    }
  }

  // TODO: remove any here
  collectStar(player: any, star: any) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText!.setText('Score: ' + this.score);

    if (this.stars!.countActive(true) === 0) {
      // TODO: remove any here
      this.stars!.children.iterate((child: any) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      let bomb = this.bombs!.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  // TODO: remove any here
  hitBomb(player: any) {
    this.physics.pause();
    player!.setTint(0xff0000);
    player!.anims.play("turn");
    this.gameOver = true;
    this.add.text(300, 260, "Game Over!", {
      fontSize: '32px',
      fill: '#000'
    });
  }
}
