"use client";
import React, { useEffect, useState } from "react";
import Styles from "./style.module.scss";
import Overlay from "@/components/overlay/Overlay";
import Image from "next/image";
import Timer from "@/components/timer/Timer";

const ThreeOptionQuestion = () => {
	const [showOverlay, setShowOverlay] = useState(false);
	const [configData, setConfigData] = useState({});
	const [questionIndex, setQuestionIndex] = useState(0);
	const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

	let counter = 0;
	let jsonData = {
		backgroundUrl: "/images/magic-bg.gif",
		timing: 10,
		stayTiming: 5,
		backgroundType: "image",
		questionFontFamily: "Arial",
		questionFontSize: "20",
		questionTextColor: "#000",
		optionFontFamily: "Arial",
		optionFontSize: "20",
		optionTextColor: "#000",
		optionBackgroundColor: "#d5d5d5",
		optionBorderColor: "#fff",
		optionActiveBackgroundColor:'#fee440',
		loaderTextColor:'#fff',
		loaderBackgroundColor:'#ebb447',
		loaderBorderColor:'#fff',
		quiz: [
			{
				question: "Guess the Capital of Isreal 1",
				options: ["Jerusalem", "Tel Aviv", "Haifa", "Wafiz"],
				correctAnswer: 1,
			},
			{
				question: "Guess the Capital of Isreal 2",
				options: ["Jerusalem", "Tel Aviv", "Haifa", "Wafiz"],
				correctAnswer: 2,
			},
			{
				question: "Guess the Capital of Isreal 3",
				options: ["Jerusalem", "Tel Aviv", "Haifa", "Wafiz"],
				correctAnswer: 3,
			},
			{
				question: "Guess the Capital of Isreal 4",
				options: ["Jerusalem", "Tel Aviv", "Haifa", "Wafiz"],
				correctAnswer: 4,
			},
		],
	};

	useEffect(() => {
		if (localStorage.getItem("jsonData")) {
			const tempObj = JSON.parse(localStorage.getItem("jsonData"));
			tempObj.quiz = JSON.parse(tempObj.quiz);
			setConfigData(tempObj);
		} else {
			setConfigData(jsonData);
		}
	}, []);

	const getConfigData = () => {
		const tempObj = JSON.parse(localStorage.getItem("jsonData"));
		tempObj.quiz = JSON.parse(tempObj.quiz);
		setConfigData(tempObj);
	};

	const toggleOverlay = () => setShowOverlay((prev) => !prev);
	const onTimerCompleted = () =>
		setCorrectAnswerIndex(jsonData.quiz[counter].correctAnswer);

	const onTimerRestart = () => {
		counter++;
		setQuestionIndex(counter);
		setCorrectAnswerIndex(null);
	};

	if (!configData?.quiz) {
		return <div>Data is loading...</div>;
	}

	return (
		<main className={Styles.layout}>
			{showOverlay && (
				<Overlay
					configData={configData}
					getData={getConfigData}
					toggleOverlay={toggleOverlay}
				></Overlay>
			)}
			<div className={Styles.holder}>
				<Timer
					clickHandler={toggleOverlay}
					guessTimer={configData.timing}
					stayTime={configData.stayTiming}
					totalQuiz={configData.quiz.length}
					onCompleted={onTimerCompleted}
					onRestart={onTimerRestart}
					borderColor={configData.loaderBorderColor}
					textColor={configData.loaderTextColor}
					backgroundColor={configData.loaderBackgroundColor}
				/>
				<h2
					className={Styles.question}
					style={{ color: configData.questionTextColor }}
				>
					{questionIndex + 1}.{" "}
					{configData?.quiz[questionIndex]?.question}
				</h2>

				<div className={Styles.answer}>
					<div>
						<div
							className={`${Styles.options} ${correctAnswerIndex === 1 && Styles.active}`}
							style={{backgroundColor:configData.optionBackgroundColor}}>
							<i style={{ color: configData.optionTextColor, backgroundColor:configData.optionBackgroundColor }}>1</i>
							<div style={{ color: configData.optionTextColor }}>
								{configData.quiz[questionIndex].options[0]}
							</div>
							<span style={{backgroundColor:configData.optionActiveBackgroundColor}}></span>
						</div>
						<div
							className={`${Styles.options} ${correctAnswerIndex === 2 && Styles.active}`}
							style={{backgroundColor:configData.optionBackgroundColor}}>
							<i style={{ color: configData.optionTextColor, backgroundColor:configData.optionBackgroundColor }}>2</i>
							<div style={{ color: configData.optionTextColor }}>
								{configData.quiz[questionIndex].options[1]}
							</div>
							<span style={{backgroundColor:configData.optionActiveBackgroundColor}}></span>
						</div>
					</div>
					<div>
						<div
							className={`${Styles.options} ${correctAnswerIndex === 3 && Styles.active}`}
							style={{backgroundColor:configData.optionBackgroundColor}}>
							<i style={{ color: configData.optionTextColor, backgroundColor:configData.optionBackgroundColor }}>3</i>
							<div style={{ color: configData.optionTextColor }}>
								{configData.quiz[questionIndex].options[2]}
							</div>
							<span style={{backgroundColor:configData.optionActiveBackgroundColor}}></span>
						</div>
						<div
							className={`${Styles.options} ${correctAnswerIndex === 4 && Styles.active}`}
							style={{backgroundColor:configData.optionBackgroundColor}}>
							<i style={{ color: configData.optionTextColor, backgroundColor:configData.optionBackgroundColor }}>4</i>
							<div style={{ color: configData.optionTextColor }}>
								{configData.quiz[questionIndex].options[3]}
							</div>
							<span style={{backgroundColor:configData.optionActiveBackgroundColor}}></span>
						</div>
					</div>
				</div>
			</div>

			{configData.backgroundType === "image" && (
				<img
					className={Styles.backgroundImage}
					src={configData.backgroundUrl}
					alt=""
					width={1920}
					height={1080}
				/>
			)}
			{configData.backgroundType === "video" && (
				<video
					className={Styles.backgroundVideo}
					src={configData.backgroundUrl}
					autoPlay
					loop
				></video>
			)}
		</main>
	);
};

export default ThreeOptionQuestion;
