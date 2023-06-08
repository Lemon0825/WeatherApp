//npm install axios
//npm install react-native-maps
//expo install expo-location 패키지 설치
//로컬맵 구현 코드
//사용자의 위치정보를 기반으로 로컬맵 상에 마커 표시.
//마커에는 그 장소의 기온과 날씨정보 표시

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userWeather, setUserWeather] = useState(null);
  const [seoulWeather, setSeoulWeather] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);

      try {
        const userWeatherResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const seoulWeatherResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        if (userWeatherResponse.status === 200 && seoulWeatherResponse.status === 200) {
          setUserWeather(userWeatherResponse.data);
          setSeoulWeather(seoulWeatherResponse.data);
        } else {
          setErrorMsg('Failed to fetch weather data');
        }
      } catch (error) {
        console.log(error);
        setErrorMsg('Failed to fetch weather data');
      }
    })();
  }, []);

  const initialRegion = {
    latitude: location ? location.latitude : 37.566,
    longitude: location ? location.longitude : 126.978,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const seoulCoordinates = {
    latitude: 37.5665,
    longitude: 126.9780,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="현재 위치"
            description={userWeather ? `${userWeather.main.temp}°C, ${userWeather.weather[0].description}` : '날씨 정보를 불러오는 중...'}
          />
        )}

        {seoulWeather && (
          <Marker
            coordinate={seoulCoordinates}
            title="서울"
            description={`${seoulWeather.name}: ${seoulWeather.main.temp}°C, ${seoulWeather.weather[0].description}`}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;