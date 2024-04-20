import React from "react";
import Styles from "./overlay.module.scss";

const Overlay = ({ configData, getData }) => {
  
  return (
    <div className={Styles.overlay}>
      <div className={Styles["overlay-holder"]}>
        <i className={Styles.close}>x</i>
        <h4>Configuration</h4>
        <hr />
        <form>
          <div>
            <label>Background URL</label>
            <input value={configData.background} type="text" />
          </div>
          <div>
            <label>Background Type</label>
            <select>
              <option>Video</option>
              <option>Image</option>
            </select>
          </div>
          <div>
            <label>Timing in seconds</label>
            <input value={configData.timing} placeholder="Time is seconds" type="number" />
          </div>
          <div>
            <label>Font Family</label>
            <select>
              <option>Arial</option>
            </select>
          </div>
          <div>
            <label>Question Font Size</label>
            <select>
              {Array(21)
                .fill(0)
                .map((item, index) => (
                  <option value={index * 2 + 20}>{index * 2 + 20}</option>
                ))}
            </select>
          </div>
          <div>
            <label>Option Font Size</label>
            <select>
              {Array(21)
                .fill(0)
                .map((item, index) => (
                  <option value={index * 2 + 20}>{index * 2 + 20}</option>
                ))}
            </select>
          </div>
          <div>
            <label>Data</label>
            <textarea value={JSON.stringify(configData.quiz)} rows="20" />
          </div>
          <button className="btn primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Overlay;
