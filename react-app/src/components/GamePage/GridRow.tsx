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
const GridRow: FC<Props> = ({
	word,
	row,
	currRow,
	guess,
	correctWord,
	usedLetters,
}) => {
	return (
		<div className="grid-row">
			{[0, 1, 2, 3, 4].map((idx) => {
				return (
					<div
						className={`grid-cell ${
							currRow === row && word.length > idx ? "filled" : ""
						} ${
							guess && correctWord[idx] === guess[idx]
								? "correct"
								: ``
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
