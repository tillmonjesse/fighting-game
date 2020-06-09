import React, { useState } from 'react';
export default function WaitForGame(props) {
	const [isRunning, setIsRunning] = useState(props.game.isRunning);
	const interval = setInterval(() => {
		if (props.game.isRunning) 
		{
			setIsRunning(true);
			clearInterval(interval);
		}
	}, 20);
	return (
		<div>
			{isRunning ? props.children : 'not ready'}
		</div>
		);
}
