import { FC } from "react";
import Victory from "./Victory";
interface Props {
	darkMode: boolean;
	setDarkMode: Function;
	victory: boolean | null;
	errors: Array<string>;
	setErrors: Function;
	resetGame: Function;
	setShowHamburger: Function;
	word: string;
	setShowHelp: Function;
	guessedWords: Array<string>;
	guesses: Array<Array<string>>;
}

const Navbar: FC<Props> = ({
	darkMode,
	setDarkMode,
	victory,
	errors,
	setErrors,
	resetGame,
	setShowHamburger,
	word,
	setShowHelp,
	guessedWords,
	guesses,
}) => {
	//Function for sharing user results
	const shareResults = () => {
		const map: { [key: string]: string } = {
			absent: "⬜",
			present: "🟨",
			correct: "🟩",
		};
		let shareResult: string = `Wordle ${guessedWords.length}/6 \n`;

		guesses.forEach((guess: Array<string>) => {
			let wordAttempt: string = "";
			guess.forEach((letter: string) => (wordAttempt += map[letter]));
			shareResult += wordAttempt + "\n";
		});
		navigator.clipboard.writeText(shareResult);
		setErrors(["Copied to Clipboard"]);
		setTimeout(() => setErrors([]), 3000);
	};
	return (
		<div className={`nav-bar ${darkMode ? "darkmode" : ""}`}>
			<button
				className="hamburger-toggle"
				onClick={() => setShowHamburger((state: boolean) => !state)}
			>
				<i
					className={`fa-solid fa-bars ${darkMode ? "darkmode" : ""}`}
				/>
			</button>
			<div
				className={`game-title smaller-title ${
					darkMode ? "darkmode" : ""
				}`}
			>
				Wordle
			</div>
			{victory === true && (
				<Victory
					tries={guessedWords.length}
					shareResults={shareResults}
					resetGame={resetGame}
					darkMode={darkMode}
				/>
			)}
			<div className="errors">
				{errors.length > 0 &&
					errors.map((err, idx) => (
						<div key={`${err}${idx}`} className="word-err">
							{err}
						</div>
					))}
				{victory === false && (
					<button className="victory-box" onClick={() => resetGame()}>
						<p>{` You lost! The correct word was ${word},`}</p>
						<p>{`Click to play again`}</p>
					</button>
				)}
			</div>
			<div className="nav-bar-right-options">
				<button onClick={() => setShowHelp(true)}>
					<i
						className={`fa-regular fa-circle-question ${
							darkMode ? "darkmode" : ""
						}`}
					></i>
				</button>
				<button onClick={() => setDarkMode((state: boolean) => !state)}>
					<i
						className={`fa-regular fa-lightbulb ${
							darkMode ? "darkmode" : ""
						}`}
					/>
				</button>
			</div>
		</div>
	);
};
export default Navbar;
