////npm install @react-navigation/native
////npm install @react-navigation/bottom-tabs 패키지 설치
////탭바 구현

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import WeaInfo from "./WeaInfo"
import MapScreen from './MapScreen';
import DatePushAlram from "./DatePushAlram"
import PushNotification from './pushNotification';


const Tab = createBottomTabNavigator();

function App () {
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen
          name="날씨정보"
          component={WeaInfo}
          options={{
            tabBarIcon: ({}) => (
              <Image
                source={require('./assets/Home.png')}
                style={{ width: 25, height: 25 }}
              />
            ),
          }}
        />
      <Tab.Screen
          name="알람설정"
          component={DatePushAlram}
          options={{
            tabBarIcon: ({}) => (
              <Image
                source={require('./assets/Alarm.png')}
                style={{ width: 25, height: 25 }}
              />
            ),
          }}
        />
      <Tab.Screen
          name="로컬맵"
          component={MapScreen}
          options={{
            tabBarIcon: ({}) => (
              <Image
                source={require('./assets/LocalMap.png')}
                style={{ width: 25, height: 25 }}
              />
            ),
          }}
        />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App