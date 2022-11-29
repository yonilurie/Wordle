import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
	const [word, setWord] = useState("");

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

	return <div className="App"></div>;
}

export default App;
