import React, { Component } from "react";
import clear from "./images/clear.png";
import clearnight from "./images/clearnight.png";
import rain01 from "./images/rain01.png";
import snow01 from "./images/snow01.png";
import cloudywindy02 from "./images/cloudywindy02.png";
import fog from "./images/fog.png";
import sleet from "./images/sleet.png";
import partlycloudy from "./images/partlycloudy.png";
import partlycloudynight from "./images/partlycloudynight.png";
import unknown from "./images/unknown.png";

class WeatherIcon extends React.Component {
  importAll = r => {
    return r.keys().map(r);
  };
  // match and get weather icon
  getWeatherImage = weatherDesc => {
    let IconPaths = [
      { name: "clear-day", file: clear },
      { name: "clear-night", file: clearnight },
      { name: "rain", file: rain01 },
      { name: "snow", file: snow01 },
      { name: "sleet", file: sleet },
      { name: "wind", file: cloudywindy02 },
      { name: "fog", file: fog },
      { name: "cloudy", file: partlycloudy },
      {
        name: "partly-cloudy-night",
        file: partlycloudynight
      },
      { name: "unknown", file: unknown }
    ];
    let obj = IconPaths.find(o => o.name === weatherDesc);
    // check if there is an icon for the describe weather
    if (obj !== undefined) {
      return obj.file;
    } else {
      return IconPaths[IconPaths.length - 1].file;
    }
  };

  render() {
    const style = {
      height: "50px",
      align: "top"
    };

    return (
      <span style={style}>
        <img
          alt="weather"
          src={this.getWeatherImage(this.props.forecastIcon)}
        />
      </span>
    );
  }
}

export default WeatherIcon;
