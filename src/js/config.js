import Phaser from 'phaser';
import initialScene from './scene/initial.js';
import {WIDTH, HEIGHT} from './constant.js';
const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 }
        }
    },
    scene: initialScene,
    parent: 'game'
};
export default config;