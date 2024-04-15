import React, { useState } from "react";
import { StyleSheet, Button, View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import appStyles from "../styles";

export default function DateTime(props) {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [dateTime, setDateTime] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setDate(date);
    setDateTime(date);
    props.onDateTimeSelect(dateTime);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    setTime(time);
    setDateTime(time);
    props.onDateTimeSelect(dateTime);
    hideTimePicker();
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes + " " + ampm;
  };

  return (
    <View style={{ flexDirection: "row", alignSelf: "center", columnGap: 5 }}>
      <View style={styles.container}>
        <Text style={[styles.text, appStyles.fonts.paragraph]}>
          {date.toDateString()}
        </Text>
        <TouchableOpacity
          style={appStyles.buttons.blackNoWidth}
          onPress={showDatePicker}
        >
          <Text style={[appStyles.fonts.paragraph, { color: "white" }]}>
            Set Date
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={styles.container}>
        <Text style={[styles.text, appStyles.fonts.paragraph]}>
          {formatTime(time)}
        </Text>
        <TouchableOpacity
          style={appStyles.buttons.blackNoWidth}
          onPress={showTimePicker}
        >
          <Text style={[appStyles.fonts.paragraph, { color: "white" }]}>
            Set Time
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  container: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
    width: "40%",
    padding: 8,
  },
});
