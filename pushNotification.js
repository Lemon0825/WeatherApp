// npm install expo-notifications


import { useState, useEffect, useRef } from 'react';
import { View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications'; //알림
import * as Location from 'expo-location' // 위치 정보
import axios from 'axios';
import moment from 'moment'; // 시간 

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function  PushNotification() {  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const day = moment().format("HH시 mm분");

  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  
  

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      
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
      const [weatherResponse] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=937d5f5ac02447214fd5363f3aee246c&units=metric&lang=kr`
        ),
      ]);
      setWeather(weatherResponse.data);
    } catch (error) {
      console.error('날씨 정보를 가져오는 중 오류가 발생했습니다.', error);
    }
  };
  const renderWeather = ()=>{
    const data = [
        { key: '위치', value: weather.name },
        { key: '현재 온도', value: `${weather.main.temp}°C` },
        { key: '현재 날씨', value: weather.weather[0].description },
    ];
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    {renderWeather()};
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${weather.weather[0].description}`,
        body: `${weather.main.temp}°C`
      },
      trigger: { seconds: 2 },
    });
  }
  
  
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Button
        title="날씨 알람 주기"
        onPress={async () => {
          await schedulePushNotification();
        }}
        color={"yellow"}
      />
    </View>
  );
}



async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}


export default  PushNotification;