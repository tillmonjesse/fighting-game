import Phaser from 'phaser';
import {WIDTH, HEIGHT} from '../constant.js';
let allies;
let enemies;
let platform;
export const ALLY_TEAM_NAME = 'ally';
export const ENEMY_TEAM_NAME = 'enemy';
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
export const groupIdentifier = (config) => {
	if (config.team === 'ally')
	{
		return getAllies();
	}
	else
	{
		return getEnemies();
	}
};
export const enemyIdentifier = (config) => {
	if (config.team === 'ally') 
	{
		return getEnemies();
	}
	else
	{
		return getAllies();
	}
};