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
						<button
							className="button play"
							onClick={() => {
								setShowStartPage(false);
								setTimeout(() => {
									setGameOn(true);
								}, 500);
							}}
						>
							Play
						</button>
					</div>
				</div>
				<div className="start-page-four">
					<div className="todays-date">November, 28, 2022</div>

					<div className="edition">No. 1</div>
					<div className="start-page-created-by">
						Created by Yonatan Lurie
					</div>
				</div>
			</div>
		</div>
	);
};

export default StartPage;
