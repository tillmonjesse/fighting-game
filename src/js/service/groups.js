import Phaser from 'phaser';
import {WIDTH, HEIGHT} from '../constant.js';
let allies;
let enemies;
let platform;
export const groupCreate = (scene) => {
	allies = scene.physics.add.group();
	enemies = scene.physics.add.group();
	platform = scene.physics.add.staticGroup();
    platform.create(WIDTH/2, HEIGHT, 'ground');
    scene.physics.add.collider(platform, [enemies, allies]);
    scene.physics.add.collider(allies, enemies);
};

export const getAllies = () => {
	return allies;
};
export const getEnemies = () => {
	return enemies;
};
export const getPlatform = () => {
	return platform;
};