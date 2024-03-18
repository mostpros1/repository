import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StyleSheet } from 'react-native';

const DateAndTimePicker = ({ /* onDateChange */ }) => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleDateSelect = (_day, date) => {
    const dateString = date.toISOString().split('T')[0];
    if (date < today) return;
    
    setSelectedDates((prevDates) => {
      if (prevDates.includes(dateString)) {
        setSelectedDay(null);
        return prevDates.filter(d => d !== dateString);
      } else {
        setSelectedDay(date);
        return [...prevDates, dateString];
      }
    });
  };

  const handleTimeSelect = (time) => {
    setSelectedTimes(prevTimes => {
      if (prevTimes.includes(time)) {
        return prevTimes.filter(t => t !== time);
      } else {
        return [...prevTimes, time];
      }
    });
  };

  const handlePrevMonth = () => {
    setDate(prevDate => {
      const year = prevDate.getMonth() === 0 ? prevDate.getFullYear() - 1 : prevDate.getFullYear();
      const month = prevDate.getMonth() === 0 ? 11 : prevDate.getMonth() - 1;
      return new Date(year, month, 1);
    });
  };

  const handleNextMonth = () => {
    setDate(prevDate => {
      const year = prevDate.getMonth() === 11 ? prevDate.getFullYear() + 1 : prevDate.getFullYear();
      const month = prevDate.getMonth() === 11 ? 0 : prevDate.getMonth() + 1;
      return new Date(year, month, 1);
    });
  };

  const renderCalendarDays = (daysInMonth, firstDayOfMonth) => {
    let days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.day, selectedDates.includes(`${currentYear}-${currentMonth + 1}-${day}`) && styles.selectedDay]}
          onPress={() => handleDateSelect(day, new Date(currentYear, currentMonth, day))}
        >
          <Text>{day}</Text>
        </TouchableOpacity>
      );
    }
    return days;
  };

  const renderWeekDays = () => {
    return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
      <Text key={day} style={styles.weekDay}>{day}</Text>
    ));
  };

//   const submitDates = async () => {
//     const dynamoDb = new AWS.DynamoDB.DocumentClient();
//     const item = {
//       userId: "1",
//       dates: selectedDates,
//     };

//     const params = {
//       TableName: "UserAvailability",
//       Item: item,
//     };

//     try {
//       await dynamoDb.put(params).promise();
//       Alert.alert("Success", "Availability saved successfully!");
//     } catch (error) {
//       console.error("Error saving availability: ", error);
//       Alert.alert("Error", "There was an error saving your availability.");
//     }
//   };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Image source={require("./arrowL.png")} style={styles.arrow} />
        </TouchableOpacity>
        <Text>{months[currentMonth]} {currentYear}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Image source={require("./arrowR.png")} style={styles.arrow} />
        </TouchableOpacity>
      </View>
      <View style={styles.weekDays}>
        {renderWeekDays()}
      </View>
      <View style={styles.daysContainer}>
        {renderCalendarDays(new Date(currentYear, currentMonth + 1, 0).getDate(), new Date(currentYear, currentMonth, 1).getDay())}
      </View>
      {selectedDay && (
        <View style={styles.timeSelector}>
          {['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'].map(time => (
            <TouchableOpacity
              key={time}
              style={[styles.timeSlot, selectedTimes.includes(time) && styles.selectedTime]}
              onPress={() => handleTimeSelect(time)}
            >
              <Text>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {/* <Button title="Confirm Choices" onPress={submitDates} /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  day: {
    width: '13%', // Adjust size as needed
    height: 40, // Adjust size as needed
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  selectedDay: {
    backgroundColor: 'skyblue',
  },
  timeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  timeSlot: {
    width: '20%', // Adjust size as needed
    margin: 2,
    padding: 5,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: 'skyblue',
  },
  arrow: {
    width: 20, // Adjust size as needed
    height: 20, // Adjust size as needed
  },
  weekDay: {
    width: '14%',
    textAlign: 'center',
  },
});

export default DateAndTimePicker;
