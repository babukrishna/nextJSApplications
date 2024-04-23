import React, { useEffect, useState } from "react";
import Styles from "./overlay.module.scss";
import axios from "axios";

const Overlay = ({ configData, getData, toggleOverlay }) => {
	const [backgroundUrl, setBackgroundUrl] = useState(configData.backgroundUrl);
	const [timing, setTiming] = useState(configData.timing);
	const [stayTiming, setStayTiming] = useState(configData.stayTiming);
	const [quiz, setQuiz] = useState(JSON.stringify(configData.quiz));
	const [questionTextColor, setQuestionTextColor] = useState(configData.questionTextColor);
	const [optionTextColor, setOptionTextColor] = useState(configData.questionTextColor);
	const [optionBackgroundColor, setOptionBackgroundColor] = useState(configData.optionBackgroundColor);
	const [optionBorderColor, setOptionBorderColor] = useState(configData.optionBorderColor);
	const [optionActiveBackgroundColor, setOptionActiveBackgroundColor] = useState(configData.optionActiveBackgroundColor);
	const [loaderTextColor, setLoaderTextColor] = useState(configData.loaderTextColor || '#fff');
	const [loaderBackgroundColor, setLoaderBackgroundColor] = useState(configData.loaderBackgroundColor || '#ebb447');
	const [loaderBorderColor, setLoaderBorderColor] = useState(configData.loaderBorderColor || '#fff');

	const [fontList, setFontList] = useState();
	const APIKey = "AIzaSyA4DXT7ba_W-JXkjo9SllDZ60YszlFDZU8"; //API from QuizAndFacts

	useEffect(() => {
		axios
			.get(
				`https://www.googleapis.com/webfonts/v1/webfonts?key=${APIKey}&sort=popularity&capability=WOFF2`
			)
			.then((res) => setFontList(res.data));
	}, []);

	const onFormSubmit = ($event) => {
		$event.preventDefault();
		let tempObj = {};
		for (let item in $event.target.elements) {
			if (isNaN(item) && item !== "namedItem" && item !== "item") {
				tempObj[item] = $event.target.elements[item].value;
			}
		}

		localStorage.setItem(
			"jsonData",
			JSON.stringify({ ...configData, ...tempObj })
		);
		toggleOverlay();
		getData();
	};

	return (
		<div className={Styles.overlay}>
			<div className={Styles["overlay-holder"]}>
				<i className={Styles.close} onClick={toggleOverlay}>
					x
				</i>
				<h4>Configuration</h4>
				<hr />
				<form onSubmit={onFormSubmit}>
					<div>
						<label>Background URL</label>
						<input
							value={backgroundUrl}
							type="text"
							name="backgroundUrl"
							onChange={(e) =>
								setBackgroundUrl(e.currentTarget.value)
							}
						/>
					</div>
					<div>
						<label>Background Type</label>
						<select name="backgroundType">
							<option value="image">Image</option>
							<option value="video">Video</option>
						</select>
					</div>
					<div>
					<label>Quiz Timing</label>
						<input
							name="timing"
							value={timing}
							placeholder="Time is seconds"
							type="number"
							onChange={(e) => setTiming(e.currentTarget.value)}
						/>
					</div>
					<div>
					<label>Gap Timing</label>
						<input
							name="stayTiming"
							value={stayTiming}
							placeholder="Time is seconds"
							type="number"
							onChange={(e) => setStayTiming(e.currentTarget.value)}
						/>
					</div>
					<hr />
					<h4>Loader Styling</h4>
					<div>
						<label>Text Color</label>
						<input 
							type="color" 
							name="loaderTextColor" 
							value={loaderTextColor} 
							onChange={ e => setLoaderTextColor(e.currentTarget.value)} />
					</div>
					<div>
						<label>Background Color</label>
						<input 
							type="color" 
							name="loaderBackgroundColor"
							value={loaderBackgroundColor}
							onChange={e => setLoaderBackgroundColor(e.currentTarget.value)} />
					</div>
					<div>
						<label>Border Color</label>
						<input 
							type="color" 
							name="loaderBorderColor"
							value={loaderBorderColor}
							onChange={e => setLoaderBorderColor(e.currentTarget.value)} />
					</div>
					<hr />
					<h4>Question Styling</h4>
					<div>
						<label>Font Family</label>
						<select name="questionFontFamily">
							{fontList &&
								fontList.items.map((item, index) => (
									<option key={index} value="arial">
										{item.family}
									</option>
								))}
						</select>
					</div>
					<div>
						<label>Font Size</label>
						<select name="questionFontSize">
							{Array(30)
								.fill(0)
								.map((item, index) => (
									<option key={index} value={index * 2 + 20}>
										{index * 5 + 20}
									</option>
								))}
						</select>
					</div>
					<div>
						<label>Text Color</label>
						<input
							type="color"
							value={questionTextColor}
							name="questionTextColor"
							onChange={(e) =>
								setQuestionTextColor(e.currentTarget.value)
							}
						/>
					</div>
					<hr />
					<h4>Options Styling</h4>
					<div>
						<label>Font Family</label>
						<select name="optionFontFamily">
							{fontList &&
								fontList.items.map((item, index) => (
									<option key={index} value="arial">
										{item.family}
									</option>
								))}
						</select>
					</div>
					<div>
						<label>Font Size</label>
						<select name="optionFontSize">
							{Array(30)
								.fill(0)
								.map((item, index) => (
									<option key={index} value={index * 2 + 20}>
										{index * 5 + 20}
									</option>
								))}
						</select>
					</div>
					<div>
						<label>Text Color</label>
						<input 
							type="color" 
							name="optionTextColor" 
							value={optionTextColor} 
							onChange={ e => setOptionTextColor(e.currentTarget.value)} />
					</div>
					<div>
						<label>Background Color</label>
						<input 
							type="color" 
							name="optionBackgroundColor"
							value={optionBackgroundColor}
							onChange={e => setOptionBackgroundColor(e.currentTarget.value)} />
					</div>
					<div>
						<label>Border Color</label>
						<input 
							type="color" 
							name="optionBorderColor"
							value={optionBorderColor}
							onChange={e => setOptionBorderColor(e.currentTarget.value)} />
					</div>
					<div>
						<label>Active Background Color</label>
						<input 
							type="color" 
							name="optionActiveBackgroundColor"
							value={optionActiveBackgroundColor}
							onChange={e => setOptionActiveBackgroundColor(e.currentTarget.value)} />
					</div>
					<hr />
					<h4>JSON data</h4>
					<div>
						<label>Data</label>
						<textarea
							name="quiz"
							value={quiz}
							rows="20"
							onChange={(e) => setQuiz(e.currentTarget.value)}
						/>
					</div>
					<button
						type="submit"
						className="btn primary"
						style={{ fontSize: "20px" }}
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Overlay;
