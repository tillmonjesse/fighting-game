import Phaser from 'phaser';
export const attackCreate = (scene, config) => {
	if (config.punchKeys) 
	{
		let punchDirection = {
        	punchRight: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        	punchLeft: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        	punchUp: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        	punchDown: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)  
        };
        punchDirection.punchRight.sinceFirstPressed = 0;
    	punchDirection.punchLeft.sinceFirstPressed = 0;
    	punchDirection.punchUp.sinceFirstPressed = 0;
    	punchDirection.punchDown.sinceFirstPressed = 0;  
		return punchDirection;
	}
	else 
	{
		return {
			punchRight: {
				isUp: true,
				isDown: false,
				sinceFirstPressed: 0
			},
			punchLeft: {
				isUp: true,
				isDown: false,
				sinceFirstPressed: 0
			},
			punchUp: {
				isUp: true,
				isDown: false,
				sinceFirstPressed: 0
			},
			punchDown: {
				isUp: true,
				isDown: false,
				sinceFirstPressed: 0
			}
		};
	}
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
export const aiAttackCreate = () => {
	return {
		count: 0,
		direction: 'punchRight',
		possibleDirections: ['punchRight', 'punchLeft', 'punchUp', 'punchDown'],
		update: function(character) {
			if (this.count === 0) 
			{
				this.direction = this.possibleDirections[getRandomInt(0, this.possibleDirections.length)];
			}
			this.count++;
			character.punchKeys[this.direction].isDown = this.count <= 25;
			character.punchKeys[this.direction].isUp = !character.punchKeys[this.direction].isDown;
			if (this.count > 30)
			{
				this.count = 0
			}
		}
	}
}
