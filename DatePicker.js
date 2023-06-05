import React, {useState} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

Date.prototype.format = function(f) {
  if(!this.valueOf()) return"";

  var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"]
  var d = this;
  return f.replace(/(yyyy|yy|MM|dd|E|HH|hh|mm|ss|a\/p)/gi, function($1){
    switch ($1){ //ex 2023년 12월 3일 19시 35분 00초 월요일
    // 모든 자리는 2자리(yyyy를 제외하고) 표시 빈자리는 0을 채워서 표시됨 ex)02
      case "yyyy": return d.getFullYear(); //년도 4자리 표시 2023
      case "yy": return String(d.getFullYear() %1000).padStart(2,'0'); //년도 2자리 표시 23
      case "MM": return String(d.getMonth() + 1).padStart(2,'0'); //월 표시 12
      case "dd": return String(d.getDate()).padStart(2,'0'); //일 표시 03
      case "E": return weekName[d.getDay()]; // 요일 표시
      case "HH": return String(d.getHours()).padStart(2, '0'); //24시간 형식으로 표시 19
      case "hh": return String((d.getHours() % 12) || 12).padStart(2,'0'); //12시간 형식으로 표시 07
      case "mm": return String(d.getMinutes()).padStart(2,'0'); //분 표시 35
      case "ss": return String(d.getSeconds()).padStart(2,'0'); //초 표시 00
      case "a/p": return d.getHours() <12 ? "오전" : "오후" // 오전 오후 표시
      default: return $1;

    }
  });
}

const SetPicker = () => {
  const [visible,setVisible] = useState(false)
  const [pickerMode,setPickerMode] = useState('')
  const [isdate, setDate] = useState(new Date());
  
  const handleSetDate = () =>{ //date버튼 입력시 
    setVisible(true)
    setPickerMode('date')
  }
  const handleSetTime = () =>{ //Time버튼 입력시 
    setVisible(true)
    setPickerMode('time')
  }
  const handleDate = (date) =>{ //수정 버튼을 눌렀을때 실행될 것
    setVisible(false)
    setDate(date)

  }

  const handleCancel =() =>{ //취소 
    setVisible(false)
  }

  return (
    <View style ={styles.container}>
        <View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center', alignContent:'center', padding: 20,}}>
            <Button 
                onPress = {handleSetDate} 
                title = "날짜"
            />

            <Button 
                onPress = {handleSetTime}
                title = "시간"
            />
        </View>
      <DateTimePickerModal
        isVisible={visible}
        value = {isdate}
        mode={pickerMode}
        onConfirm={handleDate}
        onCancel={handleCancel}
      />
      <Text> {isdate.format('yyyy/MM/dd/  hh시mm분  a/p')}</Text> 
      <Text> {isdate.format('yyyy|yy|MM|dd|E|HH|hh|mm|ss|a\/p')}</Text>
    </View>

   
  );
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
})



export default SetPicker;