import React, { useState } from 'react';
import SetPicker from './SetPicker';

function setDate() {
  const [selectedDate, setSelectedDate] = useState('');

  const getSelectedDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <SetPicker getSelectedDate={getSelectedDate} />
      <Text>Selected Date: {selectedDate}</Text>
    </View>
  );
}



export default setDate;