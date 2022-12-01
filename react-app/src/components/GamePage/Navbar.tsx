import { FC } from "react";
interface Props {
	darkMode: boolean;
	setDarkMode: Function;
	victory: boolean | null;
	errors: Array<string>;
	resetGame: Function;
	setShowHamburger: Function;
	word: string;
}

const Navbar: FC<Props> = ({
	darkMode,
	setDarkMode,
	victory,
	errors,
	resetGame,
	setShowHamburger,
	word,
}) => {
	return (
		<div className={`nav-bar ${darkMode ? "darkmode" : ""}`}>
			<div
				className="hamburger-toggle"
				onClick={() => setShowHamburger((state: boolean) => !state)}
			>
				<i
					className={`fa-solid fa-bars ${darkMode ? "darkmode" : ""}`}
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
					<div className="victory-box" onClick={() => resetGame()}>
						Congrats! Click to play again.
					</div>
				)}
				{victory === false && (
					<div className="victory-box" onClick={() => resetGame()}>
						<p>{` You lost! The correct word was ${word},`}</p>
						<p>{`Click to play again`}</p>
					</div>
				)}
			</div>
			<div onClick={() => setDarkMode((state: boolean) => !state)}>
				<i
					className={`fa-regular fa-lightbulb ${
						darkMode ? "darkmode" : ""
					}`}
				/>
			</div>
		</div>
	);
};
export default Navbar;
