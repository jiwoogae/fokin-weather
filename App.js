import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "e47b8c450114edc33b8d98a8984aeeee";

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
    );
    console.log(data);
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { altitude, latitude }
      } = await Location.getCurrentPositionAsync();
      this.getWeather(altitude, latitude);
    } catch (error) {
      Alert.alert("Cant find Location", "so sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    return <Loading />;
  }
}
