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

  render() {
    return (
      <span className="temp">
        {this.toCelsius(this.props.forecastTemp)}
        <span className="degree-celius">&#8451;</span>
      </span>
    );
  }
}

export default CurrentTemp;
