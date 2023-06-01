//npm install axios
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
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');   //위치권한 허용 안할시 발생
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);

      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=937d5f5ac02447214fd5363f3aee246c&units=metric`
        );

        if (response.status === 200) {
          setWeather(response.data);
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
    latitude: location ? location.latitude : 37.566, // 초기 지도 중심 위치의 위도 (대한민국 서울)
    longitude: location ? location.longitude : 126.978, // 초기 지도 중심 위치의 경도 (대한민국 서울)
    latitudeDelta: 0.0922, // 지도 영역의 세로 길이
    longitudeDelta: 0.0421, // 지도 영역의 가로 길이
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="현재 위치"
            description={weather ? `${weather.main.temp}°C, ${weather.weather[0].description}` : '날씨 정보를 불러오는 중...'}
          />
        )}
        {/* 추가적인 마커들을 원하는 만큼 추가할 수 있습니다 */}
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