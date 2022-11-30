import { FC } from "react";

interface Props {
	isActiveRow: boolean;
	guessResult: Array<string>;
	usersGuess: string;
	guessedWord: string;
}
const GridRow: FC<Props> = ({
	guessResult,
	usersGuess,
	isActiveRow,
	guessedWord,
}) => {
	return (
		<div className="grid-row">
			{[0, 1, 2, 3, 4].map((idx) => (
				<div
					key={idx * 10}
					className={`grid-cell ${
						isActiveRow && usersGuess.length > idx ? "active" : ""
					} ${
						guessResult && guessResult[idx] ? guessResult[idx] : ""
					}`}
				>
					{isActiveRow
						? usersGuess[idx]
						: guessedWord && guessedWord[idx]}
				</div>
			))}
		</div>
	);
};

export default GridRow;
