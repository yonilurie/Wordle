import { useEffect, useState } from "react";
import StartPage from "./components/StartPage";
import GamePage from "./components/GamePage";
import "./App.css";

function App() {
	const [word, setWord] = useState("");
	const [showStartPage, setShowStartPage] = useState(true);
	const [gameOn, setGameOn] = useState(false);
	useEffect(() => {
		if (!word) getWord();
	}, []);

	const getWord = async (): Promise<void> => {
		await fetch("./words.txt")
			.then((response) => response.text())
			.then((text) => {
				let num: number = randomNum(text.length / 5);
				setWord(text.substring(num, num + 5));
			});
	};
	const randomNum = (size: number): number => {
		let randomNumber: number = Math.floor(Math.random() * size);
		return randomNumber * 5;
	};

	return (
		<div className="App">
			{!gameOn && (
				<StartPage
					setShowStartPage={setShowStartPage}
					showStartPage={showStartPage}
					setGameOn={setGameOn}
				></StartPage>
			)}
			<GamePage word={word}></GamePage>
		</div>
	);
}

export default App;
