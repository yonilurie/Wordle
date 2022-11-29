import "./GamePage.css";
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
					onClick={() => setShowHamburger(true)}
				>
					Hamburger toggle
				</div>
			</div>
			<div className="wordle-container">
				<div className="wordle-grid"></div>
			</div>
			<div className="keyboard-container"></div>
		</div>
	);
};

export default GamePage;
