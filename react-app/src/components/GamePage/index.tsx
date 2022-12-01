import "./GamePage.css";
import GridRow from "./GridRow";
import Hamburger from "./Hamburger";
import { FC, useState, useEffect, useRef } from "react";
import { useEventListener } from "usehooks-ts";
import Navbar from "./Navbar";
import Keyboard from "./Keyboard";

interface Props {
	word: string;
	isWord: Function;
	getWord: Function;
}

const alphabet = {
	a: "inactive",
	b: "inactive",
	c: "inactive",
	d: "inactive",
	e: "inactive",
	f: "inactive",
	g: "inactive",
	h: "inactive",
	i: "inactive",
	j: "inactive",
	k: "inactive",
	l: "inactive",
	m: "inactive",
	n: "inactive",
	o: "inactive",
	p: "inactive",
	q: "inactive",
	r: "inactive",
	s: "inactive",
	t: "inactive",
	u: "inactive",
	v: "inactive",
	w: "inactive",
	x: "inactive",
	y: "inactive",
	z: "inactive",
};
const GamePage: FC<Props> = ({ word, isWord, getWord }) => {
	const documentRef = useRef<Document>(document);
	const gridRef = useRef(null);
	const [showHamburger, setShowHamburger] = useState<boolean>(false);
	const [userWord, setUserWord] = useState<string>("");
	const [victory, setVictory] = useState<null | boolean>(null);
	const [errors, setErrors] = useState<Array<string>>([]);
	const [currRow, setCurrRow] = useState<number>(1);
	const [guesses, setGuesses] = useState<Array<Array<string>>>([]);
	const [guessedWords, setGuessedWords] = useState<Array<string>>([]);

	const [darkMode, setDarkMode] = useState<boolean>(false);
	const [usedLetters, setUsedLetters] = useState<{
		[key: string]: string;
	}>(alphabet);

	const type = (e: { key: any; keyCode: number }) => {
		const key = e.key;
		const keyCode = e.keyCode;
		if (keyCode === 8) return backSpace();
		if (keyCode === 13) return attemptGuess();
		if (userWord.length === 5) return;
		const isAlpha =
			(keyCode >= 65 && keyCode <= 90) ||
			(keyCode >= 97 && keyCode <= 122);
		if (!isAlpha) return;
		setUserWord((userWord) => (userWord += key));
	};

	const attemptGuess = () => {
		if (currRow === 7) return;
		// If word is too short
		if (userWord.length < 5) return errorHandle("Not enough letters");
		// if word isnt valid
		if (!isWord(userWord)) return errorHandle("Not in word list");
		// Remove focus from keyboard
		//*Prevents new row from starting with the previous rows last letter
		document.getElementById("enter")?.focus();
		document.getElementById("enter")?.blur();
		//Array to track results of guess
		//This assists in styling the grid
		let guessResult: Array<string> = new Array(5).fill("absent");
		let possibleLtrs: Array<string | null> = word.split("");
		const letterObj = { ...usedLetters };
		//Find all letters in correct place
		for (let i = 0; i < 5; i++) {
			let userChar = userWord[i];
			let char = word[i];
			if (char !== userChar) continue;
			letterObj[char] = "correct";
			guessResult[i] = "correct";
			let idx = possibleLtrs.indexOf(char);
			possibleLtrs[idx] = null;
		}
		//Check rest of the letters
		for (let i = 0; i < 5; i++) {
			let userChar = userWord[i];
			if (guessResult[i] === "correct") continue;
			if (word.includes(userChar) && possibleLtrs.includes(userChar)) {
				let spliceIdx = possibleLtrs.indexOf(userChar);
				possibleLtrs.splice(spliceIdx, 1);
				letterObj[userChar] = "present";
				guessResult[i] = "present";
			} else if (!word.includes(userChar)) {
				letterObj[userChar] = "absent";
				guessResult[i] = "absent";
			}
		}
		setUsedLetters(letterObj);
		setCurrRow((currRow) => currRow + 1);
		setGuesses((guesses) => [...guesses, guessResult]);
		setGuessedWords((guessedWords) => [...guessedWords, userWord]);
		setUserWord("");
		if (userWord === word) setVictory(true);
	};

	//Handle error with user word input
	const errorHandle = (message: string) => {
		if (errors.length >= 10) return;
		setErrors((errors) => [...errors, message]);
		setTimeout(
			() =>
				setErrors((errors) => [...errors].slice(0, errors.length - 1)),
			1000
		);
		const row = document.querySelectorAll(`#grid-row-${currRow} > div`);
		for (let i = 0; i < row.length; i++) {
			row[i]?.classList.add("shake");
			row[i]?.classList.remove("active");
		}
		for (let i = 0; i < row.length; i++) {
			setTimeout(() => row[i]?.classList.remove("shake"), 500);
		}
		return;
	};

	//Delete a character
	const backSpace = (): void => {
		if (!userWord.length) return;
		setUserWord((userWord) => userWord.substring(0, userWord.length - 1));
	};

	//Reset the used letters object
	const resetUsedLetters = () => setUsedLetters(alphabet);

	const resetGame = () => {
		setUserWord("");
		setVictory(null);
		setErrors([]);
		setCurrRow(1);
		setGuesses([]);
		setGuessedWords([]);
		resetUsedLetters();
		getWord();
	};
	useEffect(() => {
		if (victory === null && currRow === 7) setVictory(false);
	}, [currRow]);

	useEventListener("keydown", type, documentRef);

	return (
		<div className={`game-page ${darkMode ? "darkmode" : ""}`}>
			<Hamburger
				showHamburger={showHamburger}
				setShowHamburger={setShowHamburger}
				darkMode={darkMode}
			></Hamburger>
			<Navbar
				darkMode={darkMode}
				setDarkMode={setDarkMode}
				victory={victory}
				errors={errors}
				resetGame={resetGame}
				setShowHamburger={setShowHamburger}
				word={word}
			></Navbar>
			<div className="wordle-container">
				<div className="wordle-grid" ref={gridRef}>
					{[1, 2, 3, 4, 5, 6].map((gridRow, idx) => (
						<GridRow
							key={idx}
							usersGuess={userWord}
							isActiveRow={gridRow === currRow}
							guessResult={guesses[idx]}
							guessedWord={guessedWords[idx]}
							id={gridRow}
							currRow={currRow}
							darkMode={darkMode}
						/>
					))}
				</div>
			</div>
			<Keyboard
				darkMode={darkMode}
				usedLetters={usedLetters}
				type={type}
				backSpace={backSpace}
				attemptGuess={attemptGuess}
			></Keyboard>
		</div>
	);
};

export default GamePage;
