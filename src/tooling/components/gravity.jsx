import React, { useState } from 'react';
export default function Gravity(props) {
	const id = 'gravity';
	const onChange = (event) => {
		console.log(event.target.valueAsNumber);
		setGravity(event.target.valueAsNumber);
		props.game.scene.scenes[0].physics.world.gravity.y = event.target.valueAsNumber;
	};
	const [gravity, setGravity] = useState(props.game.scene.scenes[0].physics.world.gravity.y);
	return (
		<div>
			<label htmlFor={id}>Gravity</label>
			<input id={id} type="number" onChange={onChange} value={gravity}/>
		</div>
	);
}