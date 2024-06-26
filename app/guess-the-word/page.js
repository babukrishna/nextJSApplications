"use client";
import Styles from "./wordQuiz.module.scss";
// import data from "./fruitList.json";
import data from "./threeLetterList.json";
import { useEffect, useRef, useState } from "react";
// import Link from "next/link";

export default function GuessTheCountry() {
  const [count, setCount] = useState(0);
  const [addClass, setAddClass] = useState(false);
  const [result, setResult] = useState(false);
  const [arr, setArr] = useState([]);
  const [wordPlayerSound, setWordPlayerSound] = useState("");
  const [title, setTitle] = useState("Guess the Word");
  const barRef = useRef();
  const clockPlayerRef = useRef();
  const donePlayerRef = useRef();
  const wordPlayerRef = useRef();
  const ISSERVER = typeof window === "undefined";
  const soundFilePath = '/sound/threeLetterWords/';

  const generateUniqueRandomNumbers = (min, max, count) => {
    const numbers = [];
    while (numbers.length < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  };

  const cardGenerator = (count) => {
    const charLength = data.list[count].length - 1;
    let tempArr = new Array();

    if (charLength < 4 || charLength < 3) {
      tempArr = generateUniqueRandomNumbers(0, charLength, 1);
    } else if (charLength < 6) {
      tempArr = generateUniqueRandomNumbers(0, charLength, 2);
    } else if (charLength < 8) {
      tempArr = generateUniqueRandomNumbers(0, charLength, 3);
    } else {
      tempArr = generateUniqueRandomNumbers(0, charLength, 4);
    }

    setArr(tempArr);
  };

  useEffect(() => {
    let gap = 5;
    const listLength = data.list.length;
    cardGenerator(count);
    setTitle(data.title);

    const interval = setInterval(() => {
      if (barRef.current.clientWidth !== 0) {
        setAddClass(true);

        if(clockPlayerRef.current.paused){
          clockPlayerRef.current.play();
        }
      } else {
        setResult(true);
        
        if(donePlayerRef.current.paused){
          donePlayerRef.current.load();
          donePlayerRef.current.play();
          clockPlayerRef.current.pause();
          wordPlayerRef.current.play();
        }
        
        gap -= 1;

        if (gap === 0) {
          setAddClass(false);
          setResult(false);
          setCount((prev) => {
            if ((prev === listLength - 1) && (barRef.current.clientWidth === 0)) {
              clearInterval(interval);
              setAddClass(true);
              setResult(true);
              return listLength - 1;
            } else {
              return prev + 1;
            }
          });
          cardGenerator(count);
          gap = data.answerViewTime;
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const soundFile = `${soundFilePath}${data.list[count]}.mp3`;
    setWordPlayerSound(soundFile);
    wordPlayerRef.current.load();
  },[count])

  return (
    <main className={Styles.wordQuiz}>
      <span className={Styles.count}>{count + 1}</span>
      <div className={Styles.container}>
        <div className={Styles.title}>{title}</div>
        <ul className={`${result && Styles.result} ${Styles.cards}`}>
          {data.list[count]
            .trim()
            .split("")
            .map((i, index) => (
              <li
                key={index}
                className={(
                  (String(arr).includes(index) && Styles.off) ||
                  (arr.length === 0 && Styles.off)
                ).toString()}
              >
                {i}
              </li>
            ))}
        </ul>
        <div className={Styles.footer}>
          <div className={Styles.level}> </div>
          <div className={Styles.progressBar}>
            <div
              ref={barRef}
              className={`${Styles.bars} ${addClass ? Styles.done : ""}`}
              style={{transitionDuration:`${addClass ? data.nextQuestionTime : 0}s`}}
            ></div>
          </div>
          <div className={Styles.logo}></div>
        </div>
        <audio src="/sound/tic-tac.mp3" loop autoPlay ref={clockPlayerRef}></audio>
        <audio src="/sound/glockenspiel.mp3" ref={donePlayerRef}></audio>
        <audio src={wordPlayerSound} ref={wordPlayerRef}></audio>
      </div>
      <video src="bg.mp4" autoPlay loop></video>
    </main>
  );
}

//
