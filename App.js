//사용자가 위치하는 좌표정보를 저장하여 그에 따른 날씨정보를 API_KEY를 통해 호출.
//현재 날씨정보를 제공

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    // 위치 권한 요청
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('위치 권한이 거부되었습니다.');
      return;
    }

    // 위치 정보 가져오기
    const { coords } = await Location.getCurrentPositionAsync();
    setLocation(coords);

    // 날씨 정보 가져오기
    fetchWeather(coords.latitude, coords.longitude);
  };

  const fetchWeather = async (latitude, longitude) => {
    const API_KEY = '937d5f5ac02447214fd5363f3aee246c';
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    try {
      const response = await fetch(weatherAPI);
      const data = await response.json();
      setWeather(data.weather[0]);
    } catch (error) {
      console.error('날씨 정보를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  } else if (weather) {
    return (
      <View style={styles.container}>
        <Text>현재 날씨: {weather.description}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>날씨 정보를 가져오는 중...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});