import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {

	const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };
	const SNIPPETS = [
		'To understand what recursion is... You must first understand what recursion is',
  		'What do you call a belt made out of watches? A waist of time.',
		'Where do programmers like to hangout? The Foo Bar',
		'Bears, beets, battlestar galactica.'
	];

	const [snippet, setSnippet] = useState('');
	const [userText, setUserText] = useState('');
	const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

	const updateUserText = event => {
		setUserText(event.target.value);
		console.log('Current userText', userText);

		if(event.target.value === snippet){
			setGameState({
				...gameState,
				victory: true,
				endTime: new Date().getTime() - gameState.startTime
			})
		}
	}

	const chooseSnippet = snippetIndex => {
		console.log('setSnippet', snippetIndex);
		setSnippet(SNIPPETS[snippetIndex]);
		setGameState({ ...gameState, startTime: new Date().getTime() });
	}

	const startNewRace = () => {
		setGameState(INITIAL_GAME_STATE);
	}

	useEffect(() => {
		if (gameState.victory){
			document.title = 'Victory!';
			setUserText('');
		}
	});

	return (
		<div>
			<h2>Type Race</h2>
			<div>
				<div className="typerace-text">
					{snippet}
				</div>
				<br></br>
				<div> 
					<input 
						type="textarea" 
						className="typerace-input" 
						value={userText}
						onChange={updateUserText} />
				</div>
				<br></br>
				<div>{ gameState.victory ? `Done Time: ${gameState.endTime}ms` : null }</div>
				<br></br>
			</div>
			<div>
				<button className="typerace-button" onClick={startNewRace}>Start a new race!</button>
			</div>
			<h3>Or select your favorite race</h3>
			<div>
				{
					SNIPPETS.map((SNIPPET, index) => (
						<button className="typerace-button" onClick={() => chooseSnippet(index)} key={index}>
							{ SNIPPET.substring(0, 10) }...
						</button>
					))
				}
			</div>
		</div>
	)
}

export default App;
