import config from './config.js';
import Phaser from 'phaser';
/*document.getElementById('gravity').value = config.physics.arcade.gravity.y;
function gravityChange(input) {
    console.log(input.valueAsNumber);
    game.scene.scenes[0].physics.world.gravity.y = input.valueAsNumber;
}
document.getElementById('width').value = config.width;
function widthChange(input) {
    console.log(input.valueAsNumber);
    game.config.width = input.valueAsNumber;
}*/

var game = new Phaser.Game(config);
