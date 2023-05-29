//위치정보 서비스
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();  //위치 엑세스 권한을 요청하기 위한 비동기 함수
      if (status !== 'granted') {                        //위치 엑세스 권한이 허용되지 않을 시 콘솔창에 출력
        console.log('위치 권한이 허용되지 않았습니다.');   
        return;
      }

      let location = await Location.getCurrentPositionAsync({});  //현재 위치정보를 가져오는 비동기 함수
      setLocation(location);   //location에 위치정보 저장
    })();
  }, []);

  //위치권한 허용 시 위도, 경도 출력
  return (
    <View>
      {location ? (
        <Text>
          Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
        </Text>
      ) : (
        <Text>위치정보를 가져오는 중...</Text>
      )}
    </View>
  );
}