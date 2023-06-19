import React, { useState } from 'react';
import { View, Text, Button,Alert, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import PushNotification from './pushNotification';

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
    <ScrollView>
      <View style = {{flexDirection:'row', justifyContent:"center", padding:3,}}>
        <Text style = {styles.fontStyle}>{item.date}</Text>
        <Button title="삭제" onPress={() => removeItemFromList(item.id)} color={"red"} />
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button title="날짜 선택" onPress={showDatePicker} color={"black"} />
      <View style = {{flexDirection: 'row', alignContent: 'space-between', width:300,height:55, borderWidth:2,marginTop:4,}}>
        <View style = {{flex: 5, alignItems:'center', justifyContent:"center"}}>
         <Text style = {styles.fontStyle}>{selectedDate ? format(selectedDate, 'MM월 dd일 / HH시 mm분') : '날짜를 선택해주세요.'}</Text>
        </View>
        
        <TouchableOpacity onPress={addItemToList}>
          <View style = {styles.arlContanier}>
            <Text> 알람 추가 </Text>
          </View>
        </TouchableOpacity>
        
      
      </View>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View>
        <PushNotification/>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop:10,
    },
    fontStyle:{
        fontSize: 20,
    },
    arlContanier:{
      flex: 1, 
      alignItems: "flex-end", 
      backgroundColor: "#c17ecd", 
      justifyContent:'center', 
      width:47, 
    },
    
})


export default DatePushAlram;