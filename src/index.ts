import Phaser from 'phaser';
import {Preloader} from "src/scenes/Preloader";
import {Main} from "src/scenes/Main";

new Phaser.Game({
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: [
    Preloader,
    Main
  ]
});
