import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

Date.prototype.format = function(f) {
  if (!this.valueOf()) return '';

  var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
  var d = this;
  return f.replace(/(yyyy|yy|MM|dd|E|HH|hh|mm|ss|a\/p)/gi, function($1) {
    switch ($1) {
      case "yyyy": return d.getFullYear(); 
      case "yy": return String(d.getFullYear() % 1000).padStart(2, '0');
      case "MM": return String(d.getMonth() + 1).padStart(2, '0');
      case "dd": return String(d.getDate()).padStart(2, '0');
      case "E": return weekName[d.getDay()];
      case "HH": return String(d.getHours()).padStart(2, '0');
      case "hh": return String((d.getHours() % 12) || 12).padStart(2, '0');
      case "mm": return String(d.getMinutes()).padStart(2, '0');
      case "ss": return String(d.getSeconds()).padStart(2, '0');
      case "a/p": return d.getHours() < 12 ? "오전" : "오후";
      default: return $1;
    }
  });
};

const SetPicker = ({ getSelectedDate }) => {
  const [visible, setVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState('');
  const [isDate, setDate] = useState(new Date());
  const [isTime, setTime] = useState(new Date());
  const [isDateTime, setDateTime] = useState(new Date());

  const handleSetDate = () => {
    setVisible(true);
    setPickerMode('date');
  };

  const handleSetTime = () => {
    setVisible(true);
    setPickerMode('time');
  };

  
  const handleCancel = () => {
    setVisible(false);
  };

  const handleDate = (date) => {
    const formattedDate = date.format('yyyy/MM/dd'); //넘겨 받을 값 지정
    getSelectedDate(formattedDate);
  };
  const handleTime = (time) => {
    const formattedTime = date.format('HH/mm'); //넘겨 받을 값 지정
    getSelectedDate(formattedTime);
  };
  const handleDateTime = () => {
    setVisible(false);
    setDate(date);
    const formattedTime = date.format('HH/mm'); //넘겨 받을 값 지정
    getSelectedDate(formattedTime);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Button onPress={handleSetDate} title="날짜" />
        <Button onPress={handleSetTime} title="시간" />
      </View>
      <DateTimePickerModal
        isVisible={visible}
        value={isDate}
        mode={pickerMode}
        onConfirm={handleDate}
        onCancel={handleCancel}
      />
      <Text>{isDateTime.format('yyyy/MM/dd/ hh시mm분 a/p')}</Text>
      <Text>{isDateTime.format('yyyy|yy|MM|dd|E|HH|hh|mm|ss|a/p')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SetPicker;
