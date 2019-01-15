import React, { Component } from "react";
import { connect } from "react-redux";
import StepBtn from "../step/step";
import Tempo from "../tempo/tempo";

import "./seq.css";
export class container extends Component {
  state = {
    drum: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]
  };
  seqBtn = {
    buttons: [
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />,
      <StepBtn />
    ]
  };
  INSTRUMENT_LIST = [
    "BassDrum",
    "SnareDrum",
    "Hi-Tom",
    "Mid-Tom",
    "Low-Tom",
    "RimShot",
    "HandClap",
    "Cowbell",
    "Cymbal",
    "OpenHihat",
    "ClosedHihat"
  ];

  play = () => {
    this.props.toggleSeq();
    if (this.props.run) {
      const intervalId = setInterval(this.sequence, this.props.bpm);
      this.setState({ intervalId: intervalId });
    } else {
      clearInterval(this.state.intervalId);
    }
  };

  sequence = () => {
    if (this.props.step >= 16) {
      this.props.reset();
    } else {
      this.props.incrementStep();
    }
  };

  handleBPM = e => {
    let bpm = 15000 / e.target.value;
    this.props.bpmChange(bpm);
  };
  stepSelect = index => {
    this.setState({
      drum: this.state.drum.map((el, i) => (i === index ? !el : el))
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="play" onClick={this.play}>
          {this.props.run ? "Stop" : "Start"}
        </div>
        <Tempo className="tempo" changeBPM={this.handleBPM} />
        <div className="seq">
          {this.seqBtn.buttons.map((el, index) =>
            this.props.step === index || this.state.drum[index] === true ? (
              <StepBtn
                addClassB="b"
                addClassC="c"
                key={index}
                handle={this.stepSelect.bind(this, index)}
              />
            ) : (
              <StepBtn
                handle={this.stepSelect.bind(this, index)}
                key={index}
                value={index}
              />
            )
          )}
        </div>
        <div className="labels">
          {this.INSTRUMENT_LIST.map((el, i) => (
            <div key={i}>{el}</div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    run: state.running,
    bpm: state.bpm,
    step: state.step
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSeq: () => dispatch({ type: "TOGGLE_SEQ" }),
    bpmChange: bpmChanged => dispatch({ type: "CHANGE_BPM", val: bpmChanged }),
    incrementStep: () => dispatch({ type: "INCREMENT" }),
    reset: () => dispatch({ type: "RESET_SEQ" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(container);
