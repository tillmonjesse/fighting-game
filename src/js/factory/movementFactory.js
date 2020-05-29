export const movementCreate = (scene, config) => {
	if (config.keyboardMovement) 
	{ 
		return scene.input.keyboard.createCursorKeys();
	}
	else 
	{
		return {
			right: {
				isDown: false
			},
			left: {
				isDown: false
			},
			up: {
				isDown: false
			},
			down: {
				isDown: false
			}
		};
	}
}
export const aiMovementCreate = () => {
	return {
		count: 0,
		direction: 'right',
		jump: 'up',
		update: function(character) {
			if (this.count === 0) 
			{
				if (Math.round(Math.random())) 
				{
					this.direction = 'right';
				}
				else
				{
					this.direction = 'left';
				}
			}
			if (this.count === 0) 
			{
				if (Math.round(Math.random())) 
				{
					this.jump = 'up';
				}
				else
				{
					this.jump = 'down';
				}
			}
			this.count++;
			character.cursors[this.jump].isDown = this.count <= 30;
			character.cursors[this.direction].isDown = this.count <= 30;
			if (this.count > 30) 
			{
				this.count = 0;
			}
		}
	}
}