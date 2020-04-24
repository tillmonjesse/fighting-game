# Side Scrolling Fighting Game

* 2d game engine
	* physics
	- asset management
	- game loop
		- rendering
		- game logic
			- combos
			- weapons
			* jumping
			 
* 2d physics engine

## Movement

* player character should should have momentum
	* when letting go either left or right the character will skid for a moment before coming to a complete stop
		* setting the right and left movement to thrust and having max velocity with friction
* jumping
	* when setting the controls for up the character must be touching the ground and having a negative velocity as the value to the movement
* when in the air if you press down the player character will come down to the ground faster
	* adding negative velocity to the down key

## NPC

- Will add both enemies and friendly NPC's
 - enemies will be able to cause damage to the player with different degrees of attacks. All of the attacts will stun or push the player back. The lighter the attack the less amount of time the palayer will have to react and the harder the attack there will be a longer wind up time.
 - friendly NPC's won't attack or respond to player attacks. They will either have dialog or sell the the player helpful items
 	- enemies will be objects that can collide with the player. The player and the enemies will have mass that will beable to push the player with enough speed and vice versa

## Combat 

 * direction for attacks
 	* pressing a key in a direction will cause an attack in that direction
 		- to have an object be created with a key push and use the collision of the other object will decide if that hits
 - health/ damage
 	- when an enemy's health is depleted they will blink for a second and then disappear