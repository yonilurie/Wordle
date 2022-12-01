import { FC } from "react";
interface Props {
	darkMode: boolean;
	usedLetters: { [key: string]: string };
	type: Function;
	backSpace: Function;
	attemptGuess: Function;
}

const Keyboard: FC<Props> = ({
	darkMode,
	usedLetters,
	type,
	backSpace,
	attemptGuess,
}) => {
	return (
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
					onClick={() => attemptGuess()}
				>
					ENTER
				</button>
				{["z", "x", "c", "v", "b", "n", "m"].map((keyboardKey) => (
					<button
						className={`keyboard-key ${usedLetters[keyboardKey]} ${
							darkMode ? "darkmode" : ""
						}`}
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
					onClick={() => backSpace()}
				>
					<i className="fa-solid fa-delete-left"></i>
				</button>
			</div>
		</div>
	);
};

export default Keyboard;
