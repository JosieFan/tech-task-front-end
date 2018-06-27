import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import CurrentTemp from "./CurrentTemp";
import WeatherIcon from "./WeatherIcon";
import Geocode from "react-geocode";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretKey: "4edd1ce6938a15ff87f212d10290c57f",
      error: "",
      latitude: "",
      longitude: "",
      forecast: "",
      address: "",
      tempUnit: "C"
    };
  }

  // To call dark sky api to get forecast then update state
  fetchForecast = (secretKey, latitude, longitude) => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${secretKey}/${latitude},${longitude}`
      )
      .then(res => {
        this.setState({
          latitude: latitude,
          longitude: longitude,
          forecast: res.data.currently
        });
      });
  };

  // To call google geocode to get address data then update state
  fetchAddress = (latitude, longitude) => {
    Geocode.fromLatLng(latitude, longitude).then(response => {
      let relevantComponents = {};
      // loop through each component for relevant component needed for address
      for (
        var count = 0;
        count < response.results[0].address_components.length;
        count++
      ) {
        var component = response.results[0].address_components[count];
        if (
          component.types.includes("sublocality") ||
          component.types.includes("locality")
        ) {
          relevantComponents.city = component.long_name;
        } else if (component.types.includes("administrative_area_level_1")) {
          relevantComponents.state = component.short_name;
        } else if (component.types.includes("postal_code")) {
          relevantComponents.postalCode = component.long_name;
        }
      }
      this.setState({ address: relevantComponents });
    });
  };

  // To update selected temperature unit
  updateTempUnit = updatedUnit => {
    this.setState({ tempUnit: updatedUnit });
  };

  componentDidMount() {
    // Gets the coordinates and pass it through to fetchForecast and fetchAddress to get data
    navigator.geolocation.getCurrentPosition(position => {
      this.fetchForecast(
        this.state.secretKey,
        position.coords.latitude,
        position.coords.longitude
      );
      this.fetchAddress(position.coords.latitude, position.coords.longitude);
    });
  }

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Weather app</h1>
          </header>
        </div>
        <div className="wrapper">
          <h1 className="location">
            {this.state.address.city} {this.state.address.state}{" "}
            {this.state.address.postalCode}
          </h1>
          <h2 className="date">
            {moment.unix(this.state.forecast.time).format("dddd h:mm a")}
          </h2>
          <p className="weather-desc">
            {this.state.forecast.summary}
          </p>
          <div>
            <WeatherIcon forecastIcon={this.state.forecast.icon} />
            <CurrentTemp
              forecastTemp={this.state.forecast.temperature}
              tempUnit={this.state.tempUnit}
              updateTempUnit={this.updateTempUnit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
