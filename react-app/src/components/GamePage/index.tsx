import "./GamePage.css";
import GridRow from "./GridRow";
import { FC, useState, useEffect, useRef } from "react";
import { useEventListener } from "usehooks-ts";
import { faL } from "@fortawesome/free-solid-svg-icons";
interface Props {
	word: string;
	isWord: Function;
}

const GamePage: FC<Props> = ({ word, isWord }) => {
	const documentRef = useRef<Document>(document);
	const gridRef = useRef(null);
	const [showHamburger, setShowHamburger] = useState(false);

	const [userWord, setUserWord] = useState("");
	const [victory, setVictory] = useState<null | boolean>(null);
	const [errors, setErrors] = useState<Array<string>>([]);
	const [currRow, setCurrRow] = useState(1);
	const [guesses, setGuesses] = useState<Array<Array<string>>>([]);
	const [guessedWords, setGuessedWords] = useState<Array<string>>([]);
	const [shake, setShake] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const [usedLetters, setUsedLetters] = useState<{
		[key: string]: string;
	}>({
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
	});

	const type = (e: { key: any; keyCode: number }) => {
		const key = e.key;
		const keyCode = e.keyCode;
		const isAlpha =
			(keyCode >= 65 && keyCode <= 90) ||
			(keyCode >= 97 && keyCode <= 122);

		if (keyCode === 8) return backSpace();
		if (keyCode === 13) return attemptGuess();
		if (!isAlpha) return;
		if (userWord.length === 5) return;
		setUserWord((userWord) => (userWord += key));
	};

	const attemptGuess = () => {
		if (currRow === 7) return;
		// If word is too short
		if (userWord.length < 5) {
			if (errors.length < 10) {
				setErrors((errors) => [...errors, "Not enough letters"]);
				setTimeout(
					() =>
						setErrors((errors) =>
							[...errors].slice(0, errors.length - 1)
						),
					1000
				);
			}

			const row = document.querySelectorAll(`#grid-row-${currRow} > div`);
			for (let i = 0; i < row?.length; i++) {
				row[i]?.classList.add("shake");
				row[i]?.classList.remove("active");
			}
			for (let i = 0; i < row?.length; i++) {
				setTimeout(() => row[i]?.classList.remove("shake"), 500);
			}
			return;
		}
		// if word isnt valid
		if (!isWord(userWord)) {
			if (errors.length < 10) {
				setErrors((errors) => [...errors, "Not in word list"]);
				setTimeout(
					() =>
						setErrors((errors) =>
							[...errors].slice(0, errors.length - 1)
						),
					1000
				);
			}
			const row = document.querySelectorAll(`#grid-row-${currRow} > div`);
			for (let i = 0; i < row?.length; i++) {
				row[i]?.classList.add("shake");
				row[i]?.classList.remove("active");
			}
			for (let i = 0; i < row?.length; i++) {
				setTimeout(() => row[i]?.classList.remove("shake"), 500);
			}
			return;
		}
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
			if (char === userChar) {
				letterObj[char] = "correct";
				guessResult[i] = "correct";
				let idx = possibleLtrs.indexOf(char);
				possibleLtrs[idx] = null;
			}
		}

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
		if (userWord === word) {
			setVictory(true);
		}
	};

	const backSpace = (): void => {
		if (!userWord.length) return;
		setUserWord((userWord) => userWord.substring(0, userWord.length - 1));
	};

	const resetUsedLetters = () => {
		setUsedLetters({
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
		});
	};

	useEffect(() => {
		if (currRow === 7) {
			setVictory(false);
		}
	}, [currRow]);

	useEventListener("keydown", type, documentRef);

	return (
		<div className={`game-page ${darkMode ? "darkmode" : ""}`}>
			<div
				className={`hamburger ${showHamburger ? "" : "stowed"} `}
				onClick={() => setShowHamburger(false)}
			>
				<div
					className={`hamburger-menu ${
						showHamburger ? "" : "stowed"
					} ${darkMode ? "darkmode" : ""}`}
				>
					<div className="hamburger-header">
						<h2 className="header-title">
							Created By: Yonatan Lurie
						</h2>
						<button
							className={`hamburger-header-toggle ${
								darkMode ? "darkmode" : ""
							}`}
							onClick={() => setShowHamburger(false)}
						>
							<i className="fa-solid fa-xmark"></i>
						</button>
					</div>
					<div className="technologies">
						<div>Technologies Used:</div>
						<div>
							<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></img>
						</div>
						<div>
							<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"></img>
						</div>

						<div>
							<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"></img>
							<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white"></img>
						</div>
						<div>
							<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"></img>
							<img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"></img>
						</div>
					</div>
					<div className="socials">
						<a
							href="https://github.com/yonilurie"
							target="_blank"
							rel="noreferrer"
							className="social-link"
						>
							<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"></img>
						</a>

						<a
							href="https://www.linkedin.com/in/yonilurie/"
							target="_blank"
							rel="noreferrer"
							className="social-link"
						>
							<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"></img>
						</a>
					</div>
				</div>
			</div>
			<div className={`nav-bar ${darkMode ? "darkmode" : ""}`}>
				<div
					className="hamburger-toggle"
					onClick={() => setShowHamburger((state) => !state)}
				>
					<i
						className={`fa-solid fa-bars ${
							darkMode ? "darkmode" : ""
						}`}
					/>
				</div>
				<div
					className={`game-title smaller-title ${
						darkMode ? "darkmode" : ""
					}`}
				>
					Wordle
				</div>
				<div className="errors">
					{errors.length > 0 &&
						errors.map((err, idx) => (
							<div key={`${err}${idx}`} className="word-err">
								{err}
							</div>
						))}
					{victory === true && (
						<div
							className="victory-box"
							onClick={() => {
								setUserWord("");
								setVictory(null);
								setErrors([]);
								setCurrRow(1);
								setGuesses([]);
								setGuessedWords([]);
								resetUsedLetters();
							}}
						>
							Congrats! Click to play again.
						</div>
					)}
					{victory === false && (
						<div
							className="victory-box"
							onClick={() => {
								setUserWord("");
								setVictory(null);
								setErrors([]);
								setCurrRow(1);
								setGuesses([]);
								setGuessedWords([]);
								resetUsedLetters();
							}}
						>
							<p>{` You lost! The correct word was ${word},`}</p>
							<p>{`Click to play again`}</p>
						</div>
					)}
				</div>
				<div onClick={() => setDarkMode((darkMode) => !darkMode)}>
					<i
						className={`fa-regular fa-lightbulb ${
							darkMode ? "darkmode" : ""
						}`}
					/>
				</div>
			</div>
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
							shake={shake}
							currRow={currRow}
							darkMode={darkMode}
						/>
					))}
				</div>
			</div>
			<div className="keyboard-container">
				<div className="keyboard-row">
					{["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(
						(keyboardKey) => (
							<button
								className={`keyboard-key ${
									usedLetters[keyboardKey]
								} ${darkMode ? "darkmode" : ""}`}
								key={keyboardKey}
								data-key={keyboardKey}
								onClick={() => {
									type({
										key: keyboardKey,
										keyCode: keyboardKey.charCodeAt(0),
									});
								}}
							>
								{keyboardKey.toUpperCase()}
							</button>
						)
					)}
				</div>
				<div className="keyboard-row">
					<div className="keyboard-spacer"></div>
					{["a", "s", "d", "f", "g", "h", "j", "k", "l"].map(
						(keyboardKey) => (
							<button
								className={`keyboard-key ${
									usedLetters[keyboardKey]
								} ${darkMode ? "darkmode" : ""}`}
								key={keyboardKey}
								data-key={keyboardKey}
								onClick={() => {
									type({
										key: keyboardKey,
										keyCode: keyboardKey.charCodeAt(0),
									});
								}}
							>
								{keyboardKey.toUpperCase()}
							</button>
						)
					)}
					<div className="keyboard-spacer"></div>
				</div>
				<div className="keyboard-row">
					<button
						className={`keyboard-key action ${
							darkMode ? "darkmode" : ""
						}`}
						id="enter"
						onClick={attemptGuess}
					>
						ENTER
					</button>
					{["z", "x", "c", "v", "b", "n", "m"].map((keyboardKey) => (
						<button
							className={`keyboard-key ${
								usedLetters[keyboardKey]
							} ${darkMode ? "darkmode" : ""}`}
							key={keyboardKey}
							data-key={keyboardKey}
							onClick={() => {
								type({
									key: keyboardKey,
									keyCode: keyboardKey.charCodeAt(0),
								});
							}}
						>
							{keyboardKey.toUpperCase()}
						</button>
					))}
					<button
						className={`keyboard-key action ${
							darkMode ? "darkmode" : ""
						}`}
						onClick={backSpace}
					>
						<i className="fa-solid fa-delete-left"></i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default GamePage;
