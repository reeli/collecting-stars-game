import logoImg from '../assets/logo.png';

export class Preloader extends Phaser.Scene {
  constructor() {
    super({
      key: "Preloader"
    });
  }

  preload() {
    this.load.image("logo", logoImg);
  }

  create() {
    this.add.image(this.sys.canvas.width/2, this.sys.canvas.height/2, "logo")
  }
}
