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
					<i className="fa-solid fa-bars"></i>
				</div>
				<div className="game-title smaller-title">Wordle</div>
				<div>
					<i className="fa-solid fa-gear"></i>
				</div>
			</div>
			<div className="wordle-container">
				<div className="wordle-grid">
					<GridRow></GridRow>
					<GridRow></GridRow>
					<GridRow></GridRow>
					<GridRow></GridRow>
					<GridRow></GridRow>
				</div>
			</div>
			<div className="keyboard-container"></div>
		</div>
	);
};

export default GamePage;
