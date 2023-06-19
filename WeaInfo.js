//npm install axios 
//npm install moment  패키지 설치
//기온, 날씨, 습도, 풍속, 미세먼지 정보 표시
//현재 날짜를 기준으로 최대 5일까지의 날씨와 최대, 최소기온 출력
//날씨 이미지 추가

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import moment from 'moment';
import PushNotification from './pushNotification';
const WeatherInfo = () => {
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
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=937d5f5ac02447214fd5363f3aee246c&units=metric`
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=937d5f5ac02447214fd5363f3aee246c&units=metric`
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

  const renderItem = ({ item }) => {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.infoKey}>{item.key}</Text>
        <Text style={styles.infoValue}>{item.value}</Text>
      </View>
    );
  };
  
  ////현재 날씨
  const weatherImages = {
    'clear sky': require('./assets/clear.png'),

    'light rain': require('./assets/rain.png'),
    'moderate rain': require('./assets/rain.png'),
    'heavy rain': require('./assets/rain.png'),
    'drizzle': require('./assets/rain.png'),
    'light drizzle': require('./assets/rain.png'),
    'moderate drizzle': require('./assets/rain.png'),

    'thunderstorm with light rain': require('./assets/thunder.png'),
    'thunderstorm with rain': require('./assets/thunder.png'),
    'thunderstorm with heavy rain': require('./assets/thunder.png'),

    'few clouds': require('./assets/sun_cloud.png'),
    'scattered clouds': require('./assets/sun_cloud.png'),
    'broken clouds': require('./assets/sun_cloud.png'),
    'overcast clouds': require('./assets/sun_cloud.png'),

    'light snow': require('./assets/snow.png'),
    'moderate snow': require('./assets/snow.png'),
    'heavy snow': require('./assets/snow.png'),

    'mist': require('./assets/mist.png'),
    'fog': require('./assets/mist.png'),
    'haze': require('./assets/mist.png'),
    'smoke': require('./assets/mist.png'),
  };

  const renderForecastItem = ({ item }) => {
    let weatherIcon;

    switch (item.weatherDescription.toLowerCase()) {
      case 'clear sky':
        weatherIcon = require('./assets/clear.png');
        break;
      case 'light rain':
      case 'moderate rain':
      case 'heavy rain':
      case 'drizzle':
      case 'light drizzle':
      case 'moderate drizzle':
        weatherIcon = require('./assets/rain.png');
        break;
      case 'thunderstorm with light rain':
      case 'thunderstorm with rain':
      case 'thunderstorm with heavy rain':
        weatherIcon = require('./assets/thunder.png');
        break;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
        weatherIcon = require('./assets/sun_cloud.png');
        break;
      case 'light snow':
      case 'moderate snow':
      case 'heavy snow':
        weatherIcon = require('./assets/snow.png');
        break;
      case 'mist':
      case 'fog':
      case 'haze':
      case 'smoke':
        weatherIcon = require('./assets/mist.png');
        break;
    }

    return (
      <View style={styles.forecastItem}>
        <Text style={styles.forecastDate}>{moment(item.date).format('MM월 DD일')}</Text>
        <Image source={weatherIcon} style={styles.weatherIcon} />
        <Text>최고 기온: {item.maxTemp}°C 최저 기온: {item.minTemp}°C</Text>             
      </View>
    );
  };

  const renderWeatherInfo = () => {
    const data = [
      { key: '위치', value: weather.name },
      { key: '현재 온도', value: `${weather.main.temp}°C` },
      { key: '현재 날씨', value: weather.weather[0].description },
      { key: '습도', value: `${weather.main.humidity}%` },
      { key: '풍속', value: `${weather.wind.speed} m/s` },
      { key: '미세먼지', value: `${pollution.list[0].components.pm2_5} μg/m³` }
    ];
<PushNotification weaData={data}/>
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const renderForecast = () => {
    if (!forecast) {
      return null;
    }

    console.log(weather);
    const currentDate = moment().format('YYYY-MM-DD');
    const forecastDates = forecast.list
      .map((item) => moment(item.dt_txt).format('YYYY-MM-DD'))
      .filter((date, index, self) => date !== currentDate && self.indexOf(date) === index)
      .slice(0, 5);

    const forecastData = forecastDates.map((date) => {
      const forecastItems = forecast.list.filter((item) => moment(item.dt_txt).format('YYYY-MM-DD') === date);

      const maxTemp = Math.max(...forecastItems.map((item) => item.main.temp_max));
      const minTemp = Math.min(...forecastItems.map((item) => item.main.temp_min));
      const representativeWeather = forecastItems[0].weather[0].description;

      return {
        date,
        maxTemp,
        minTemp,
        weatherDescription: representativeWeather
      };
    });

    return (
      <FlatList
        data={forecastData}
        renderItem={renderForecastItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  return (
    <View style={styles.container}>
      {weather && pollution ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.title}>현재 날씨 정보</Text>
          <Image source={weatherImages[weather.weather[0].description]} style={{ width: 150, height: 150 }}/>
          {renderWeatherInfo()}
          <Text></Text>
          <Text></Text>
          <Text style={styles.title}>추가 날씨 예보</Text>
          {renderForecast()}
        </View>
      ) : (
        <Text style={styles.loadingText}>날씨 정보를 가져오는 중...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Change this color to set the background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoKey: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoValue: {
    flex: 1,
  },
  forecastItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 20,
  },
  forecastDate: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
});

export default WeatherInfo;

