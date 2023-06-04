import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapScreen from './MapScreen';
import DatePicker from './DatePicker' ;

export default function App() {
  return (
    <View style={styles.container}>
      
      <DatePicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});