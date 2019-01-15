import React from "react";
import "./tempo.css";

function tempo(props) {
  return (
    <div className="bpm">
      <h3>BPM: </h3>
      <input onChange={props.changeBPM} type="number" />
    </div>
  );
}
export default tempo;
