"use client";
import Styles from "./wordQuiz.module.scss";
import data from "./countryList.json";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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

    if (!sessionStorage.getItem("nextQuestionTime")) {
      sessionStorage.setItem("nextQuestionTime", data.nextQuestionTime);
    }
    if (!sessionStorage.getItem("answerViewTime")) {
      sessionStorage.setItem("answerViewTime", data.answerViewTime);
    }
    if (!sessionStorage.getItem("title")) {
      sessionStorage.setItem("title", data.title);
    } else {
      setTitle(sessionStorage.getItem("title"));
    }

    if (!sessionStorage.getItem("list")) {
      sessionStorage.setItem("list", data.list);
    } else {
      data.list = !ISSERVER
        ? sessionStorage.getItem("list").split(",")
        : data.list;
    }
    
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
          gap = Number(sessionStorage.getItem("answerViewTime"));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const soundFile = `/sound/words/${data.list[count]}.mp3`;
    console.log(soundFile);
    setWordPlayerSound(soundFile);
    wordPlayerRef.current.load();
  },[count])

  return (
    <main className={Styles.wordQuiz}>
      <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80">
        <path
          fill="#9b5de5"
          className={Styles["out-top"]}
          d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
        />
        <path
          fill="#f15bb5"
          className={Styles["in-top"]}
          d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
        />
        <path
          fill="#00bbf9"
          className={Styles["out-bottom"]}
          d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
        />
        <path
          fill="#00f5d4"
          className={Styles["in-bottom"]}
          d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
        />
      </svg>
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
              style={{
                transitionDuration:
                  `${
                    addClass ? sessionStorage.getItem("nextQuestionTime") : 0
                  }s` || String(`${addClass ? data.nextQuestionTime : 0}s`),
              }}
            ></div>
          </div>
          <div className={Styles.logo}>
            <Link href="/guess-the-word/modify">E</Link>
            <button
              onClick={() => {
                clockPlayerRef.current.play();
                donePlayerRef.current.play();
              }}
            >
              P
            </button>
          </div>
        </div>
        <audio src="/sound/tic-tac.mp3" loop autoPlay ref={clockPlayerRef}></audio>
        <audio src="/sound/glockenspiel.mp3" ref={donePlayerRef}></audio>
        <audio src={wordPlayerSound} ref={wordPlayerRef}></audio>
      </div>
    </main>
  );
}

//
