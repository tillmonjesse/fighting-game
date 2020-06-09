import config from './config.js';
import Phaser from 'phaser';
var game = new Phaser.Game(config);
const tooling = document.getElementById('tooling');
if (tooling && typeof tooling.setGame === 'function') 
{
	tooling.setGame(game);
}

