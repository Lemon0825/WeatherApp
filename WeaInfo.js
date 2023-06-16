//npm install axios 
//npm install moment  패키지 설치
//기온, 날씨, 습도, 풍속, 미세먼지 정보 표시
//현재 날짜를 기준으로 최대 5일까지의 날씨와 최대, 최소기온 출력

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import moment from 'moment';

const WeaInfo = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
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
      const [weatherResponse, forecastResponse, pollutionResponse] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=937d5f5ac02447214fd5363f3aee246c`
        ),
      ]);

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      setPollution(pollutionResponse.data);
    } catch (error) {
      console.error('날씨 정보를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  const renderForecast = () => {
    if (!forecast) {
      return null;
    }

    const currentDate = moment().format('YYYY-MM-DD');
    const forecastDates = forecast.list
      .map((item) => moment(item.dt_txt).format('YYYY-MM-DD'))
      .filter((date, index, self) => date !== currentDate && self.indexOf(date) === index)
      .slice(0, 5);

    return forecastDates.map((date) => {
      const forecastItems = forecast.list.filter((item) => moment(item.dt_txt).format('YYYY-MM-DD') === date);

      // 최대 기온과 최소 기온
      const maxTemp = Math.max(...forecastItems.map((item) => item.main.temp_max));
      const minTemp = Math.min(...forecastItems.map((item) => item.main.temp_min));

      // 대표 날씨 정보
      const representativeWeather = forecastItems[0];

      return (
        <View key={date}>
          <Text>{moment(date).format('MM월 DD일')}</Text>
          <Text>최고 기온: {maxTemp}°C</Text>
          <Text>최저 기온: {minTemp}°C</Text>
          <Text>날씨: {representativeWeather.weather[0].description}</Text>
          <Text></Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      {weather && pollution ? (
        <View>
          <Text>위치: {weather.name}</Text>
          <Text>현재 온도: {weather.main.temp}°C</Text>
          <Text>현재 날씨: {weather.weather[0].description}</Text>
          <Text>습도: {weather.main.humidity}%</Text>
          <Text>풍속: {weather.wind.speed} m/s</Text>
          <Text>미세먼지: {pollution.list[0].components.pm2_5} μg/m³</Text>

          <Text></Text>
          <Text>추가 날씨 예보</Text>
          {renderForecast()}
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

export default WeaInfo;