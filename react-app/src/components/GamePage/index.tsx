import "./GamePage.css";
import GridRow from "./GridRow";
import { FC, useState } from "react";
interface Props {
	word: string;
}
const GamePage: FC<Props> = ({ word }) => {
	const [showHamburger, setShowHamburger] = useState(false);
	return (
		<div className="game-page">
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
				<div className="wordle-grid">
					<GridRow />
					<GridRow />
					<GridRow />
					<GridRow />
				</div>
			</div>
			<div className="keyboard-container">
				<div className="keyboard-row">
					{["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(
						(keyboardKey) => (
							<button className="keyboard-key" key={keyboardKey}>
								{keyboardKey.toUpperCase()}
							</button>
						)
					)}
				</div>
				<div className="keyboard-row">
					<div className="keyboard-spacer"></div>
					{["a", "s", "d", "f", "g", "h", "j", "k", "l"].map(
						(keyboardKey) => (
							<button className="keyboard-key" key={keyboardKey}>
								{keyboardKey.toUpperCase()}
							</button>
						)
					)}
					<div className="keyboard-spacer"></div>
				</div>
				<div className="keyboard-row">
					<div className="keyboard-key action" id='enter'>ENTER</div>
					{["z", "x", "c", "v", "b", "n", "m"].map((keyboardKey) => (
						<button className="keyboard-key" key={keyboardKey}>
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
