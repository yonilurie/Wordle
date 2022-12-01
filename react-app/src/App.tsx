import { useEffect, useState } from "react";
import StartPage from "./components/StartPage";
import GamePage from "./components/GamePage";
import words from "./words.js";
import "./App.css";

function App() {
	const [word, setWord] = useState("");
	const [showStartPage, setShowStartPage] = useState(true);
	const [gameOn, setGameOn] = useState(false);

	useEffect(() => {
		if (!word) getWord();
	}, [word]);

	const getWord = async (): Promise<void> => {
		await fetch("./assets/words");
		let randomNum = Math.floor(Math.random() * words.length);
		setWord(words[randomNum]);
	};

	const isWord = (word: string): boolean => {
		return words.includes(word);
	};

	return (
		<div className="App">
			{gameOn ? (
				<GamePage
					word={word}
					isWord={isWord}
					getWord={getWord}
				></GamePage>
			) : (
				<StartPage
					setShowStartPage={setShowStartPage}
					showStartPage={showStartPage}
					setGameOn={setGameOn}
				></StartPage>
			)}
		</div>
	);
}

export default App;
