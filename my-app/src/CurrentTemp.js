import React, { Component } from "react";

class CurrentTemp extends React.Component {
  // convert temperature to degree celsius
  toCelsius = fahrenheit => {
    const input = parseFloat(fahrenheit);
    if (Number.isNaN(input)) {
      return "";
    }
    const output = (input - 32) * 5 / 9;
    const rounded = Math.round(output);
    return rounded;
  };

  handleClick = e => {
    if (this.props.tempUnit === "C") {
      this.props.updateTempUnit("F");
    }
    if (this.props.tempUnit === "F") {
      this.props.updateTempUnit("C");
    }
  };

  render() {
    if (this.props.tempUnit === "C") {
      return (
        <div className="temp">
          {this.toCelsius(this.props.forecastTemp)}
          <span className="selectedUnitTemp">&deg;C |</span>
          <a href="#" className="unitTemp" onClick={this.handleClick}>
            {" "}&deg;F
          </a>
        </div>
      );
    }
    return (
      <div className="temp">
        {Math.round(this.props.forecastTemp)}
        <a href="#" className="unitTemp" onClick={this.handleClick}>
          &deg;C{" "}
        </a>
        <span href="#" className="selectedUnitTemp">
          | &deg;F
        </span>
      </div>
    );
  }
}

export default CurrentTemp;
