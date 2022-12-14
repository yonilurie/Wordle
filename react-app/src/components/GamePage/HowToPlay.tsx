import { FC, useState, useEffect } from "react";
interface Props {
	showHelp: boolean;
	setShowHelp: Function;
	darkMode: boolean;
}

const HowToPlay: FC<Props> = ({ showHelp, setShowHelp, darkMode }) => {
	const [showInfo, setShowInfo] = useState(false);

	useEffect(() => {
		setShowInfo(true);
	}, []);
	const hideInfo = () => {
		setShowInfo(false);
		setTimeout(() => setShowHelp(false), 300);
	};
	return (
		<div className={`how-to-overlay ${darkMode ? "darkmode" : ""}`}>
			<div
				className={`how-to-modal ${showInfo ? "show-help" : ""} ${
					darkMode ? "darkmode" : ""
				}`}
			>
				<button
					className={`how-to-exit ${darkMode ? "darkmode" : ""}`}
					onClick={() => hideInfo()}
				>
					<i className="fa-solid fa-xmark"></i>
				</button>
				<h1 className="how-to-title">How to Play</h1>
				<h2 className="how-to-subtitle">
					Guess the Wordle in 6 tries.
				</h2>
				<ul className="how-to-list">
					<li>Each guess must be a valid 5-letter word.</li>
					<li>
						The color of the tiles will change to show how close
						your guess was to the word.
					</li>
				</ul>
				<div className="how-to-examples">
					<div className="strong-example">Examples</div>
					<div className="how-to-example">
						<div
							className={`how-to-weary ${
								darkMode ? "darkmode" : ""
							}`}
						>
							<div className="weary-green">W</div>
							<div>E</div>
							<div>A</div>
							<div>R</div>
							<div>Y</div>
						</div>
						<p>
							<b>W</b> is in the word and in the correct spot.
						</p>
					</div>
					<div className="how-to-example">
						<div
							className={`how-to-pills ${
								darkMode ? "darkmode" : ""
							}`}
						>
							<div>P</div>
							<div className="pills-gold">I</div>
							<div>L</div>
							<div>L</div>
							<div>S</div>
						</div>
						<p>
							<b>I</b> is in the word but in the wrong spot.
						</p>
					</div>
					<div className="how-to-example">
						<div
							className={`how-to-vague ${
								darkMode ? "darkmode" : ""
							}`}
						>
							<div>V</div>
							<div>A</div>
							<div>G</div>
							<div className="vague-grey">U</div>
							<div>E</div>
						</div>
						<p>
							<b>U</b> is not in the word in any spot.
						</p>
					</div>
				</div>
				<div className="how-to-line"></div>
				<div className="how-to-created-by">
					Created by Yonatan Lurie
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
	);
};
export default HowToPlay;
