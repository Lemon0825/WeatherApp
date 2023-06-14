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
  const [busanWeather, setBusanWeather] = useState(null);
  const [incheonWeather, setIncheonWeather] = useState(null);
  const [gangneungWeather, setGangneungWeather] = useState(null);
  const [chuncheonWeather, setChuncheonWeather] = useState(null);
  const [daejeonWeather, setDaejeonWeather] = useState(null);
  const [andongWeather, setAndongWeather] = useState(null);
  const [daeguWeather, setDaeguWeather] = useState(null);
  const [ulsanWeather, setUlsanWeather] = useState(null);
  const [yeosuWeather, setYeosuWeather] = useState(null);
  const [gwangjuWeather, setGwangjuWeather] = useState(null);
  const [mokpoWeather, setMokpoWeather] = useState(null);


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
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const seoulWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const busanWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Busan&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const incheonWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Incheon&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const gangneungWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Gangneung&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const chuncheonWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Chuncheon&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const daejeonWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Daejeon&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const andongWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Andong&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const daeguWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Daegu&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const ulsanWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Ulsan&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const yeosuWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Yeosu&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const gwangjuWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Gwangju&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        const mokpoWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Mokpo&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        );

        if (userWeatherResponse.status === 200 || 
          seoulWeatherResponse.status === 200 || 
          busanWeatherResponse.status === 200 ||
          incheonWeatherResponse.status === 200 ||
          gangneungWeatherResponse.status === 200 ||
          chuncheonWeatherResponse.status === 200 ||
          daejeonWeatherResponse.status === 200 ||
          andongWeatherResponse.status === 200 ||
          daeguWeatherResponse.status === 200 ||
          ulsanWeatherResponse.status === 200 ||
          yeosuWeatherResponse.status === 200 ||
          gwangjuWeatherResponse.status === 200 ||
          mokpoWeatherResponse.status === 200) {

          setUserWeather(userWeatherResponse.data);
          setSeoulWeather(seoulWeatherResponse.data);
          setBusanWeather(busanWeatherResponse.data);
          setIncheonWeather(incheonWeatherResponse.data);
          setGangneungWeather(gangneungWeatherResponse.data);
          setChuncheonWeather(chuncheonWeatherResponse.data);
          setDaejeonWeather(daejeonWeatherResponse.data);
          setAndongWeather(andongWeatherResponse.data);
          setDaeguWeather(daeguWeatherResponse.data);
          setUlsanWeather(ulsanWeatherResponse.data);
          setYeosuWeather(yeosuWeatherResponse.data);
          setGwangjuWeather(gwangjuWeatherResponse.data);
          setMokpoWeather(mokpoWeatherResponse.data);

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
    latitude: location ? location.latitude : 37.5665,
    longitude: location ? location.longitude : 126.9780,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const seoulCoordinates = {
    latitude: 37.5665,
    longitude: 126.9780,
  };

  const busanCoordinates = {
    latitude: 35.1795,
    longitude: 129.0756,
  };

  const incheonCoordinates = {
    latitude: 37.4562,
    longitude: 126.7052,
  };

  const gangneungCoordinates = {
    latitude: 37.7518,
    longitude: 128.8760,
  };

  const chuncheonCoordinates = {
    latitude: 37.8813,
    longitude: 127.7299,
  };

  const daejeonCoordinates = {
    latitude: 36.3504,
    longitude: 127.3845,
  };

  const andongCoordinates = {
    latitude: 36.5683,
    longitude: 128.7293,
  };

  const daeguCoordinates = {
    latitude: 35.8714,
    longitude: 128.6014,
  };

  const ulsanCoordinates = {
    latitude: 35.5383,
    longitude: 129.3113,
  };

  const yeosuCoordinates = {
    latitude: 34.7603,
    longitude: 127.6622,
  };

  const gwangjuCoordinates = {
    latitude: 35.1595,
    longitude: 126.8526,
  };

  const mokpoCoordinates = {
    latitude: 34.8118,
    longitude: 126.3921,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="현재 위치"
            description={userWeather ? `${userWeather.name}: ${userWeather.main.temp}°C, ${userWeather.weather[0].description}` : '날씨 정보를 불러오는 중...'}
          />
        )}

        {seoulWeather && (
          <Marker
            coordinate={seoulCoordinates}
            title="서울"
            description={`${seoulWeather.main.temp}°C, ${seoulWeather.weather[0].description}`}
          />
        )}
        
        {busanWeather && (
          <Marker
            coordinate={busanCoordinates}
            title="부산"
            description={`${busanWeather.main.temp}°C, ${busanWeather.weather[0].description}`}
          />
        )}

        {incheonWeather && (
          <Marker
            coordinate={incheonCoordinates}
            title="인천"
            description={`${incheonWeather.main.temp}°C, ${incheonWeather.weather[0].description}`}
          />
        )}

        {gangneungWeather && (
          <Marker
            coordinate={gangneungCoordinates}
            title="강릉"
            description={`${gangneungWeather.main.temp}°C, ${gangneungWeather.weather[0].description}`}
          />
        )}

        {chuncheonWeather && (
          <Marker
            coordinate={chuncheonCoordinates}
            title="춘천"
            description={`${chuncheonWeather.main.temp}°C, ${chuncheonWeather.weather[0].description}`}
          />
        )}
        
        {daejeonWeather && (
          <Marker
            coordinate={daejeonCoordinates}
            title="대전"
            description={`${daejeonWeather.main.temp}°C, ${daejeonWeather.weather[0].description}`}
          />
        )}

        {andongWeather && (
          <Marker
            coordinate={andongCoordinates}
            title="안동"
            description={`${andongWeather.main.temp}°C, ${andongWeather.weather[0].description}`}
          />
        )}

        {daeguWeather && (
          <Marker
            coordinate={daeguCoordinates}
            title="대구"
            description={`${daeguWeather.main.temp}°C, ${daeguWeather.weather[0].description}`}
          />
        )}

        {ulsanWeather && (
          <Marker
            coordinate={ulsanCoordinates}
            title="울산"
            description={`${ulsanWeather.main.temp}°C, ${ulsanWeather.weather[0].description}`}
          />
        )}

        {yeosuWeather && (
          <Marker
            coordinate={yeosuCoordinates}
            title="여수"
            description={`${yeosuWeather.main.temp}°C, ${yeosuWeather.weather[0].description}`}
          />
        )}

        {gwangjuWeather && (
          <Marker
            coordinate={gwangjuCoordinates}
            title="광주"
            description={`${gwangjuWeather.main.temp}°C, ${gwangjuWeather.weather[0].description}`}
          />
        )}

        {mokpoWeather && (
          <Marker
            coordinate={mokpoCoordinates}
            title="목포"
            description={`${mokpoWeather.main.temp}°C, ${mokpoWeather.weather[0].description}`}
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