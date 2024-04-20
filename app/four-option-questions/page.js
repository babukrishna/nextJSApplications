import React from "react";
import Styles from "./style.module.scss";
import Overlay from "@/components/Overlay";

const ThreeOptionQuestion = () => {
  const jsonData = {
    background: "bg.mp4",
    timing: 5,
    backgroundType: "video",
    fontFamily: "Arial",
    questionFontSize: "20",
    optionFontSize: "20",
    quiz: [
      {
        question: "Guess the Capital of Isreal 1",
        options: ["Jerusalem", "Tel Aviv", "Haifa"],
        correctAnswer: 1,
      },
      {
        question: "Guess the Capital of Isreal 2",
        options: ["Jerusalem", "Tel Aviv", "Haifa"],
        correctAnswer: 2,
      },
      {
        question: "Guess the Capital of Isreal 3",
        options: ["Jerusalem", "Tel Aviv", "Haifa"],
        correctAnswer: 3,
      },
      {
        question: "Guess the Capital of Isreal 4",
        options: ["Jerusalem", "Tel Aviv", "Haifa"],
        correctAnswer: 4,
      },
    ],
  };

  const getConfigData = () => {

  }

  return (
    <main className={Styles.layout}>
      <Overlay configData={jsonData} getData={getConfigData}></Overlay>
      <i className={Styles.info}>i</i>
      <video src="bg.mp4" autoPlay loop></video>
    </main>
  );
};

export default ThreeOptionQuestion;
