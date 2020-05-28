export const movementCreate = (scene, config) => {
	if (config.keyboardMovement) 
	{ 
		return scene.input.keyboard.createCursorKeys();
	}
	else 
	{
		//return ai controls

	}
}