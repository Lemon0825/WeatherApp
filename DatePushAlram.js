import React, { useState } from 'react';
import { View, Text, Button,Alert, FlatList, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

const DatePushAlram = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [listData, setListData] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const addItemToList = () => {
    if (!selectedDate) {
      Alert.alert ("알람 추가", "날짜를 선택해 주세요")
      return;
    }

    const formattedDate = format(selectedDate, 'MM월 dd일 / HH시 mm분');
    const newItem = {
      id: Date.now().toString(),
      date: formattedDate,
    };

    setListData((prevData) => [...prevData, newItem]);
    setSelectedDate(null);
  };

  const removeItemFromList = (itemId) => {
    setListData((prevData) => prevData.filter((item) => item.id !== itemId));
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.date}</Text>
      <Button title="삭제" onPress={() => removeItemFromList(item.id)} />
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button title="날짜 선택" onPress={showDatePicker} />
      <View style = {{flexDirection: 'row', alignContent: 'space-between'}}>
        <View style = {{flex: 1}}>
         <Text>{selectedDate ? format(selectedDate, 'MM월 dd일 / HH시 mm분') : '날짜를 선택해주세요.'}</Text>
        </View>
        <View>
         <Button title="알람 추가" onPress={addItemToList} />
        </View>
      </View>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default DatePushAlram;
