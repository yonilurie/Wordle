import { FC, useState } from "react";
interface Props {
	tries: number;
	shareResults: Function;
	resetGame: Function;
	darkMode: boolean;
}
const Victory: FC<Props> = ({ tries, shareResults, resetGame, darkMode }) => {
	const [showVictory, setShowVictory] = useState<boolean>(false);
	setTimeout(() => setShowVictory(true), 100);

	return (
		<div className={`victory-overlay ${darkMode ? "darkmode" : ""}`}>
			<div
				className={`victory-modal ${showVictory ? "show-victory" : ""} ${darkMode ? "darkmode" : ""}`}
			>
				<h1 className="victory-title">You Win!</h1>
				<h2 className="victory-sub-title">
					It took you {tries} {tries === 1 ? "try" : "tries"} to
					guess the Wordle.
				</h2>
				<div className="victory-buttons">
					<button
						className="victory-play-again"
						onClick={() => resetGame()}
					>
						Play Again
					</button>
					<button
						className="victory-share"
						onClick={() => shareResults()}
					>
						<p>Share</p>
						<i className="fa-solid fa-share-nodes"></i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Victory;
