"use client";
import React from "react";
import axios from "axios";
import Styles from "./style.module.scss";

export default function YoutubeTagSuggestion() {
  const [text, setText] = React.useState();
  const [tags, setTags] = React.useState();
  const [selectedTag, setSelectedTag] = React.useState([]);
  const textAreaRef = React.useRef(null);

  const onChange = (e) => {
    setText(e.currentTarget.value);
    axios
      .get(
        `https://clients1.google.com/complete/search?client=youtube&gs_ri=youtube&ds=yt&q=${e.currentTarget.value}`
      )
      .then((res) => {
        const obj = JSON.parse(
          res.data.replace("window.google.ac.h(", "").replace(")", "")
        )[1].map((item) => item[0]);
        setTags(obj);
      });
  };

  const selectTag = (index) => {
    let tempArr = [...selectedTag];
    const filterArr = tempArr.filter((item) => item === tags[index]);
    if (filterArr.length === 0) {
      tempArr.push(tags[index]);
      setSelectedTag(tempArr);
    }
    setTags(tags.filter((item, i) => i !== index));
  };

  const deleteTag = (index) => {
    setSelectedTag(selectedTag.filter((item, i) => i !== index));
  };

  const copyTag = async (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    console.log("Copied!");
  };

  const textAreaOnChange = (e) => {
    e.currentTarget.value = String(selectedTag);
  };

  return (
    <div className={Styles.container}>
      <h2 className={Styles.title}>Youtube Tag Suggestion</h2>

      <div>
        <input
          type={text}
          placeholder="search..."
          onChange={onChange}
          style={{
            display: "block",
            width: "100%",
            fontSize: "18px",
            padding: "5px",
          }}
        />
      </div>

      <h2 className={Styles.title}>Select Tag from here</h2>

      {tags && (
        <div className={Styles.tagContainer}>
          {tags?.map((tag, index) => (
            <span onClick={() => selectTag(index)} className={Styles.tag} key={index}>
              {tag}
              <span>✔</span>
            </span>
          ))}
        </div>
      )}

      <h2 className={Styles.title}>
        <span>Selected Tag</span> <button onClick={copyTag}>Copy Tag</button>
      </h2>

      {String(selectedTag) && (
        <sub className={Styles.tagLength}>
          Tag Length: {String(selectedTag)?.length}
        </sub>
      )}

      {selectedTag.length !== 0 && (
        <div
          className={Styles.tagContainer}
          style={{
            backgroundColor: `${
              String(selectedTag).length > 500 ? "red" : "transparent"
            }`,
          }}
        >
          {selectedTag?.map((tag, index) => (
            <span className={`${Styles.tag} ${Styles.selected}`} key={index}>
              {tag}
              <button onClick={() => deleteTag(index)}>x</button>
            </span>
          ))}
        </div>
      )}

      <br />
      <textarea
        ref={textAreaRef}
        onChange={textAreaOnChange}
        value={String(selectedTag)}
        style={{ opacity: 0 }}
      />
      <span>If not working please add CORS extention in chrome</span>
    </div>
  );
}
