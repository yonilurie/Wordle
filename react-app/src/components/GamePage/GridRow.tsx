import { FC } from "react";

interface Props {
	correctWord: string;
	word: string;
	row: number;
	currRow: number;
	guess: string;
	usedLetters: {
		[key: string]: string;
	};
}
const GridRow: FC<Props> = ({ word, row, currRow, guess, correctWord }) => {
	return (
		<div className="grid-row">
			{[0, 1, 2, 3, 4].map((idx) => {
				return (
					<div
						className={`grid-cell ${
							currRow === row && word.length >= idx + 1
								? "active"
								: ""
						} ${
							guess && correctWord[idx] === guess[idx]
								? "correct"
								: `${
										row < currRow &&
										correctWord.includes(guess[idx])
											? "present"
											: `${row < currRow ? "absent" : ""}`
								  }`
						} `}
					>
						{currRow === row
							? word.length > idx && word[idx]
							: guess && guess[idx]}
					</div>
				);
			})}
		</div>
	);
};

export default GridRow;
