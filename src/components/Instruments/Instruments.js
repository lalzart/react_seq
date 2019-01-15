import React from "react";
import "./Instruments.css";
export default function Instruments(props) {
  const instrumentList = [
    "BassDrum",
    "Snare",
    "Hi-Tom",
    "Mid-Tom",
    "Lo-Tom",
    "Rim",
    "Clap",
    "Cowbell",
    "Crash",
    "Open-HH",
    "Clsd-HH"
  ];
  return <div>{instrumentList[props.instrIndex]}</div>;
}
