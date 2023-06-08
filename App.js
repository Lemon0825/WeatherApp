//npm install axios 패키지 설치

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('위치권한이 거부되었습니다.');
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords;

      setLocation({ latitude, longitude });
      fetchWeather(latitude, longitude);
    } catch (error) {
      console.error('Error fetching location', error);
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
      );

      setWeather(response.data);
    } catch (error) {
      console.error('날씨 정보를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <View style={styles.container}>
      {weather ? (
        <View>
          <Text>City: {weather.name}</Text>
          <Text>Temperature: {weather.main.temp}°C</Text>
          <Text>Description: {weather.weather[0].description}</Text>
        </View>
      ) : (
        <Text>날씨정보를 가져오는 중...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});