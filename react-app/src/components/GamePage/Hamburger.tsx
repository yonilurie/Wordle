import { FC } from "react";
interface Props {
	showHamburger: boolean;
	setShowHamburger: Function;
	darkMode: boolean;
}

const Hamburger: FC<Props> = ({
	showHamburger,
	setShowHamburger,
	darkMode,
}) => {
	<div
		className={`hamburger ${showHamburger ? "" : "stowed"} `}
		onClick={() => setShowHamburger(false)}
	>
		<div
			className={`hamburger-menu ${showHamburger ? "" : "stowed"} ${
				darkMode ? "darkmode" : ""
			}`}
		>
			<div className="hamburger-header">
				<h2 className="header-title">Created By: Yonatan Lurie</h2>
				<button
					className={`hamburger-header-toggle ${
						darkMode ? "darkmode" : ""
					}`}
					onClick={() => setShowHamburger(false)}
				>
					<i className="fa-solid fa-xmark"></i>
				</button>
			</div>
			<div className="technologies">
				<div>Technologies Used:</div>
				<div>
					<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"></img>
				</div>
				<div>
					<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"></img>
				</div>

				<div>
					<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"></img>
					<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white"></img>
				</div>
				<div>
					<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"></img>
					<img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"></img>
				</div>
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
	</div>;
};

export default Hamburger;
