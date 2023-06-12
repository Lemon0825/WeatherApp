//npm install axios 패키지 설치
//기온, 날씨, 습도, 풍속, 미세먼지 정보 표시

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import DatePicker from './DatePicker'


export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [pollution, setPollution] = useState(null);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('위치 권한이 거부되었습니다.');
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords;

      setLocation({ latitude, longitude });
      fetchWeather(latitude, longitude);
    } catch (error) {
      console.error('위치 정보를 가져오는 중에 오류가 발생했습니다.', error);
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      const [weatherResponse, pollutionResponse] = await Promise.all([
        axios.get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=473438be829c07872a6f933caba87a50&units=metric&lang=kr`
        ),
        axios.get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=473438be829c07872a6f933caba87a50`
        ),
      ]);

      setWeather(weatherResponse.data);   //날씨 정보 
      setPollution(pollutionResponse.data);   //미세먼지 정보
    } catch (error) {
      console.error('날씨 정보를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <View style={styles.container}>
      {weather && pollution ? (
        <View>
          <Text>위치: {weather.name}</Text>
          <Text>온도: {weather.main.temp}°C</Text>
          <Text>날씨: {weather.weather[0].description}</Text>
          <Text>습도: {weather.main.humidity}%</Text>
          <Text>풍속: {weather.wind.speed} m/s</Text>
          <Text>미세먼지: {pollution.list[0].components.pm2_5} μg/m³</Text>
          <DatePicker/>
        </View>
      ) : (
        <Text>날씨 정보를 가져오는 중...</Text>
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