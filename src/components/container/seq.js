import React, { Component } from "react";
import { connect } from "react-redux";
import StepBtn from "../step/step";
import Tempo from "../tempo/tempo";
import * as actionTypes from "../../store/actions";

import "./seq.css";
export class container extends Component {
  state = {
    running: false
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

  play = () => {
    this.setState({ running: !this.state.running }, () => {
      if (this.state.running) {
        const intervalId = setInterval(this.sequence, this.props.bpm);
        this.setState({ intervalId: intervalId });
      } else {
        clearInterval(this.state.intervalId);
      }
    });
  };

  sequence = () => {
    if (this.props.step >= 15) {
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
  };
  instrSelect = e => {
    const selected = e.target.innerHTML;
    this.props.activeInstrument(selected);
    this.props.activateInstrument(selected);
  };
  trigger = currentStep => {
    if (this.props.trigger) {
      console.log("boom");
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="play" onClick={this.play}>
            {this.state.running ? "Stop" : "Start"}
          </div>
          <Tempo className="tempo" changeBPM={this.handleBPM} />
          <div className="seq">
            {this.seqBtn.buttons.map((el, index) =>
              this.props.step === index ||
              this.props.currentInstr[index] === true ? (
                (this.trigger(),
                (
                  <StepBtn
                    addClassB="b"
                    addClassC="c"
                    key={index}
                    handle={this.stepSelect.bind(this, index)}
                  />
                ))
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
              this.props.aI === el ? (
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
    currentInstr: state.instruments[state.activeInstrument].track,
    intervalID: state.intervalID,
    aI: state.activeInstrument,
    trigger: state.instruments.BassDrum.track[state.step]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // toggleSeq: () => dispatch({ type: actionTypes.TOGGLE_SEQ }),
    bpmChange: bpmChanged =>
      dispatch({ type: actionTypes.BPM_CHANGE, val: bpmChanged }),
    incrementStep: () => dispatch({ type: actionTypes.INCREMENT }),
    reset: () => dispatch({ type: actionTypes.RESET_SEQ }),
    activeInstrument: instr =>
      dispatch({ type: actionTypes.ACTIVE_INSTRUMENT, pl: instr }),
    activateInstrument: instr =>
      dispatch({ type: actionTypes.ACTIVATE_INSTRUMENT, pl: instr }),
    activateStep: step =>
      dispatch({ type: actionTypes.ACTIVATE_STEP, pl: step }),
    manageInterval: int =>
      dispatch({ type: actionTypes.MANAGE_INTERVAL, pl: int })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(container);
