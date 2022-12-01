import "./StartPage.css";
import { Dispatch, SetStateAction, FC } from "react";

interface Props {
	showStartPage: boolean;
	setShowStartPage: Dispatch<SetStateAction<boolean>>;
	setGameOn: Dispatch<SetStateAction<boolean>>;
}

const StartPage: FC<Props> = ({
	showStartPage,
	setShowStartPage,
	setGameOn,
}) => {
	// Transition from home page to game
	const transition = () => {
		setShowStartPage(false);
		setTimeout(() => {
			setGameOn(true);
		}, 300);
	};
	document.documentElement.style.backgroundColor = "var(--background-beige)";
	return (
		<div className={`start-page ${showStartPage ? "" : "hidden"}`}>
			<div className="start-page-content">
				<div className="start-page-one">
					<div className="icon"></div>
					<div className="game-title">Wordle</div>
				</div>
				<div className="start-page-two">
					Get 6 chances to guess a 5-letter word.
				</div>
				<div className="start-page-three">
					<div>
						<button className="button play" onClick={transition}>
							Play
						</button>
					</div>
				</div>
				<div className="start-page-four">
					<div className="todays-date">
						{new Date().toDateString()}
					</div>
					<div className="start-page-created-by">
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
		</div>
	);
};

export default StartPage;
