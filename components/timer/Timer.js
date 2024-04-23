import React, { useEffect, useState } from "react";
import Styles from "./timer.module.scss";
import { countdownTimer } from "../Utils";

const Timer = ({
	clickHandler,
	onCompleted,
	guessTimer,
	stayTime,
	totalQuiz,
	onRestart,
	borderColor,
	textColor,
	backgroundColor
}) => {
	const [count, setCount] = useState(guessTimer);
	const time = guessTimer * 1000;
	const gap = stayTime * 1000;
	let totalTurn = 0;
	useEffect(() => {
		countdownTimer(
			time,
			gap,
			(count) => {
				// Trigger after every second
				// console.log("Timer !", count);
				if (totalTurn < totalQuiz) {
					setCount(count);
				}
			},
			() => {
				// Trigger after complete
				// console.log("Timer completed!");
				if (totalTurn < totalQuiz) {
					if (onCompleted) {
						onCompleted();
					}
					totalTurn++;
				}
			},
			() => {
                // Trigger after buggering time complete
                // console.log('Timer restart!')
				if (totalTurn < totalQuiz) {
					if (onRestart) {
						onRestart();
					}
				}
			}
		);
	}, []);

	return (
		<div style={{borderColor: borderColor, backgroundColor: backgroundColor}} className={Styles.timer} onClick={clickHandler}>
			<i style={{color: textColor}}>{count}</i>
		</div>
	);
};

export default Timer;
