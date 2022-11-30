import "./GamePage.css";
import GridRow from "./GridRow";
import { FC, useState, useEffect, useRef } from "react";
import { useEventListener } from "usehooks-ts";
interface Props {
	word: string;
}

const GamePage: FC<Props> = ({ word }) => {
	const documentRef = useRef<Document>(document);
	const gridRef = useRef(null);
	const [showHamburger, setShowHamburger] = useState(false);
	const [userWord, setUserWord] = useState("");
	const [currRow, setCurrRow] = useState(1);
	const [guesses, setGuesses] = useState<Array<string>>([]);
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

	useEffect(() => {
		console.log(gridRef);
	}, [gridRef]);

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
		console.log(userWord);
	};

	const attemptGuess = () => {
		// Will add animation later
		if (userWord.length < 5) return alert("Too short");
		// Will add animation later

		const letterObj = { ...usedLetters };
		for (let i = 0; i < 5; i++) {
			let userChar = userWord[i];
			let char = word[i];
			if (word.includes(userChar)) {
				if (letterObj[userChar] === "correct") break;
				letterObj[userChar] = "present";
			} else {
				letterObj[userChar] = "absent";
			}
			if (char === userChar) letterObj[char] = "correct";
		}
		setUsedLetters(letterObj);
		setCurrRow((currRow) => currRow + 1);
		setGuesses((guesses) => [...guesses, userWord]);
		setUserWord("");

		if (userWord === word) setTimeout(() => alert("congrats"), 1000);
	};

	const backSpace = () => {
		if (!userWord.length) return;

		setUserWord((userWord) => userWord.substring(0, userWord.length - 1));
	};

	useEventListener("keydown", type, documentRef);

	return (
		<div className="game-page">
			{word}
			<div
				className={`hamburger ${showHamburger ? "" : "stowed"}`}
				onClick={() => setShowHamburger(false)}
			>
				<div
					className={`hamburger-menu ${
						showHamburger ? "" : "stowed"
					}`}
				>
					<div
						className="hamburger-toggle"
						onClick={() => setShowHamburger(false)}
					>
						This is Wordle
					</div>
				</div>
			</div>
			<div className="nav-bar">
				<div
					className="hamburger-toggle"
					onClick={() => setShowHamburger((state) => !state)}
				>
					<i className="fa-solid fa-bars" />
				</div>
				<div className="game-title smaller-title">Wordle</div>
				<div>
					<i className="fa-solid fa-gear" />
				</div>
			</div>
			<div className="wordle-container">
				<div className="wordle-grid" ref={gridRef}>
					{[1, 2, 3, 4, 5, 6].map((gridRow, idx) => {
						return (
							<GridRow
								correctWord={word}
								word={userWord}
								row={gridRow}
								currRow={currRow}
								guess={guesses[idx]}
								usedLetters={usedLetters}
							/>
						);
					})}
				</div>
			</div>
			<div className="keyboard-container">
				<div className="keyboard-row">
					{["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(
						(keyboardKey) => (
							<button
								className={`keyboard-key ${usedLetters[keyboardKey]}`}
								key={keyboardKey}
								data-key={keyboardKey}
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
								className={`keyboard-key ${usedLetters[keyboardKey]}`}
								key={keyboardKey}
								data-key={keyboardKey}
							>
								{keyboardKey.toUpperCase()}
							</button>
						)
					)}
					<div className="keyboard-spacer"></div>
				</div>
				<div className="keyboard-row">
					<div className="keyboard-key action" id="enter">
						ENTER
					</div>
					{["z", "x", "c", "v", "b", "n", "m"].map((keyboardKey) => (
						<button
							className={`keyboard-key ${usedLetters[keyboardKey]}`}
							key={keyboardKey}
							data-key={keyboardKey}
						>
							{keyboardKey.toUpperCase()}
						</button>
					))}
					<div className="keyboard-key action">
						<i className="fa-solid fa-delete-left"></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GamePage;
