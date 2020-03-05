# Side Scrolling Fighting Game

- 2d game engine
	- physics
	- asset management
	- game loop
		- rendering
		- game logic
			- combos
			- weapons
			- jumping
			 
- 2d physics engine

## Movement

- player character should should have momentum
	- when letting go either left or right the will skid for a moment before coming to a complete stop
		- setting the right and left movement to thrust and having max velocity with friction
- jumping
	- when setting the controls for up the character must be touching the ground and having a negative velocity as the value to the movement
- when in the air if you press down the player character will come down to the ground faster
	- adding negative velocity to the down key