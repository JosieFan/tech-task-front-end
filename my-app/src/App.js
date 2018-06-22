import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import CurrentTemp from "./CurrentTemp";
import WeatherIcon from "./WeatherIcon";
import Geocode from "react-geocode";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretKey: "f3350bba0811688e8ea65915ed692496",
      error: "",
      latitude: "",
      longitude: "",
      forecast: ""
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
  }
  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.watchId);
  }

  fetchForecast = (secretKey, latitude, longitude) => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${secretKey}/${latitude},${longitude}`
      )
      .then(res => {
        this.setState({ forecast: res.data.currently });
      });
    const forecastPack = {
      temperature: this.state.forecast.temperature,
      weatherIcon: this.state.forecast.icon,
      shortWeatherDesc: this.state.forecast.summary
    };
    return forecastPack;
  };

  render() {
    const forecastPack = this.fetchForecast(
      this.state.secretKey,
      this.state.latitude,
      this.state.longitude
    );
    /* 
    Work In Progress
    Get location details for address component

    const address = Geocode.fromLatLng(this.state.latitude, this.state.longitude).then(
      response => {
        const addressData = response.results[0].formatted_address;
        console.log(addressData);
      },
      error => {
        console.error(error);
      }
    );*/
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Weather app</h1>
          </header>
        </div>
        <div className="wrapper">
          <h1 className="location">Address</h1>
          <h2 className="date">Day and Time</h2>
          <p className="weather-desc">{forecastPack.shortWeatherDesc}</p>
          <WeatherIcon forecastIcon={forecastPack.weatherIcon} />
          <CurrentTemp forecastPack={forecastPack.temperature} />
        </div>
      </div>
    );
  }
}

export default App;
