"use client";
import Link from "next/link";
import Styles from "./form.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Modify() {
  const router = useRouter()
  const ISSERVER = typeof window === "undefined";
  const [nextQuestionTime, setNextQuestionTime] = useState('');
  const [answerViewTime, setAnswerViewTime] = useState('');
  const [title, setTitle] = useState('');
  const [list, setList] = useState('');

  const listOnChange = (e) => {
    setList(e.currentTarget.value);
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    if (!ISSERVER) {
      sessionStorage.setItem("nextQuestionTime", nextQuestionTime);
      sessionStorage.setItem("answerViewTime", answerViewTime);
      sessionStorage.setItem("title", title);
      sessionStorage.setItem("list", list);
      router.push("/guess-the-word");
    }
  };

  useEffect(()=>{
    setNextQuestionTime(!ISSERVER ? (sessionStorage.getItem("nextQuestionTime") || '') : "");
    setAnswerViewTime(!ISSERVER ? (sessionStorage.getItem("answerViewTime") || '') : "");
    setTitle(!ISSERVER ? (sessionStorage.getItem("title") || '') : "");
    setList(!ISSERVER ? (sessionStorage.getItem("list") || '') : "");
  },[])

  return (
    <main className={Styles.form}>
      <form>
        <label>
          <span>Next Question Time : </span>
          <input
            type="number"
            value={nextQuestionTime}
            onChange={(e) => setNextQuestionTime(e.currentTarget.value)}
          />
        </label>
        <label>
          <span>Answer View Time : </span>
          <input
            type="number"
            value={answerViewTime}
            onChange={(e) => setAnswerViewTime(e.currentTarget.value)}
          />
        </label>
        <label>
          <span>Title : </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </label>
        <label>
          <span>
            Data :
            <br />
            <sub>(Add data with comman separated)</sub>
          </span>
          <textarea rows={10} value={list} onChange={listOnChange}></textarea>
        </label>
        <div className={Styles.buttonGroup}>
          <Link href="/guess-the-word" className="btn primary">
            Cancel
          </Link>
          <button className="btn secondary" onClick={onSubmitClick}>
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
