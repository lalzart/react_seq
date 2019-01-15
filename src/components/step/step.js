import React, { Component } from "react";
import "./step.css";

export class step extends Component {
  render() {
    return (
      <div>
        <div
          className={this.props.addClassB ? this.props.addClassB : "step"}
          onClick={this.props.handle}
        >
          <div className={this.props.addClassC ? this.props.addClassC : null} />
        </div>
      </div>
    );
  }
}

export default step;
