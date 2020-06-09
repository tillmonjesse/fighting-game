import React from 'react';
import ReactDOM from "react-dom";
import Gravity from './components/gravity.jsx';
import WaitForGame from './components/waitForGame.jsx';
const tooling = document.getElementById('tooling');
tooling.setGame = (game) => {
	ReactDOM.render(<WaitForGame game={game}>
		<Gravity game={game}/>
	</WaitForGame>, tooling);
};

