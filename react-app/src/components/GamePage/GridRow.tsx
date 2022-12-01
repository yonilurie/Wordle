import { FC, useEffect } from "react";

interface Props {
	isActiveRow: boolean;
	guessResult: Array<string>;
	usersGuess: string;
	guessedWord: string;
	id: number;
	shake: boolean;
	currRow: number;
	darkMode: boolean;
}
const GridRow: FC<Props> = ({
	guessResult,
	usersGuess,
	isActiveRow,
	guessedWord,
	id,
	shake,
	currRow,
	darkMode,
}) => {
	useEffect(() => {
		if (usersGuess.length && isActiveRow) {
			const row = document.querySelectorAll(`#grid-row-${currRow} > div`);
			let i = usersGuess.length - 1;

			row[i]?.classList.add("active");

			const timeout = setTimeout(
				() => row[i]?.classList.remove("active"),
				100
			);
			return () => clearTimeout(timeout);
		}
	}, [usersGuess]);

	return (
		<div className={`grid-row`} id={`grid-row-${id}`}>
			{[0, 1, 2, 3, 4].map((idx) => (
				<div
					key={idx * 10}
					className={`grid-cell ${
						isActiveRow && usersGuess.length > idx ? "past" : ""
					} ${
						guessResult && guessResult[idx] ? guessResult[idx] : ""
					}${shake && isActiveRow ? "past" : ""} ${
						darkMode ? "darkmode" : ""
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
