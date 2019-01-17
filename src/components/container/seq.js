import React, { Component } from "react";
import { connect } from "react-redux";
import StepBtn from "../step/step";
import Tempo from "../tempo/tempo";

import "./seq.css";
export class container extends Component {
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
    this.props.activateStep(index);
    this.setState({
      drum: this.state.drum.map((el, i) => (i === index ? !el : el))
    });
  };
  instrSelect = e => {
    const selected = e.target.innerHTML;
    this.props.activeInstrument(selected);
    this.props.activateInstrument(selected);
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
            this.props.step === index ||
            this.props.currentInstr[index] === true ? (
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
          {Object.keys(this.props.instruments).map((el, i) =>
            this.props.instruments[el].active ? (
              <div
                className="instrSelected"
                onClick={this.instrSelect}
                value={el}
                key={i}
              >
                {el}
              </div>
            ) : (
              <div
                className="instrUnselected"
                onClick={this.instrSelect}
                value={el}
                key={i}
              >
                {el}
              </div>
            )
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    run: state.running,
    bpm: state.bpm,
    step: state.step,
    instruments: state.instruments,
    currentInstr: state.instruments[state.activeInstrument].track
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSeq: () => dispatch({ type: "TOGGLE_SEQ" }),
    bpmChange: bpmChanged => dispatch({ type: "CHANGE_BPM", val: bpmChanged }),
    incrementStep: () => dispatch({ type: "INCREMENT" }),
    reset: () => dispatch({ type: "RESET_SEQ" }),
    activeInstrument: instr =>
      dispatch({ type: "ACTIVE_INSTRUMENT", pl: instr }),
    activateInstrument: instr =>
      dispatch({ type: "ACTIVATE_INSTRUMENT", pl: instr }),
    activateStep: step => dispatch({ type: "ACTIVATE_STEP", pl: step })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(container);
