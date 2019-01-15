import React, { Component } from "react";
import StepBtn from "../step/step";
import Tempo from "../tempo/tempo";
import Instruments from "../Instruments/Instruments";
import "./seq.css";
export class container extends Component {
  state = {
    bpm: 500,
    currentStep: null,
    running: false,
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

  play = () => {
    this.setState({ running: !this.state.running }, () => {
      if (this.state.running) {
        const intervalId = setInterval(this.sequence, this.state.bpm);
        this.setState({ intervalId: intervalId });
      } else {
        clearInterval(this.state.intervalId);
      }
    });
  };

  sequence = () => {
    if (this.state.currentStep >= 16) {
      this.setState({ currentStep: 0 });
    } else {
      this.setState({ currentStep: this.state.currentStep + 1 });
    }
  };

  handleBPM = e => {
    let bpm = 15000 / e.target.value;
    this.setState({ bpm: bpm });
  };
  stepSelect = index => {
    this.setState({
      drum: this.state.drum.map((el, i) => (i === index ? !el : el))
    });
  };
  render() {
    return (
      <React.Fragment>
        <Tempo changeBPM={this.handleBPM} />
        <div className="seq">
          <div className="play" onClick={this.play}>
            {this.state.running ? "Stop" : "Start"}
          </div>
          {this.seqBtn.buttons.map((el, index) =>
            this.state.currentStep === index ||
            this.state.drum[index] === true ? (
              <StepBtn
                addClassB="b"
                addClassC="c"
                key={index}
                handle={this.stepSelect.bind(this, index)}
              />
            ) : (
              ((
                <StepBtn
                  handle={this.stepSelect.bind(this, index)}
                  key={index}
                  value={index}
                />
              ),
              <Instruments instrIndex={this.state.currentStep} />)
            )
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default container;
