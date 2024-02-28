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

  const getWeekNumber = (date: Date): number => {
    const currentDate = new Date(date).getTime();
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1).getTime();

    const pastDaysOfYear = (currentDate - firstDayOfYear) / (86400000);

    const current = new Date(date);
    current.setUTCDate(current.getUTCDate() - current.getUTCDay() + 1);

    const startOfYear = new Date(date.getFullYear(), 0, 1);
    startOfYear.setUTCDate(startOfYear.getUTCDate() - startOfYear.getUTCDay() + 1);

    const weekNumber = Math.ceil(((current.getTime() - startOfYear.getTime()) / 86400000 + 1) / 7);

    return weekNumber;
};



const renderCalendarDays = () => {
  let days = [];
  const weeks = [];
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let week = [];
  const firstDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust if your week starts on Monday

  // Calculate the number of days in the previous month
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // Add trailing days from the previous month
  for (let i = 0; i < firstDayOffset; i++) {
      week.push(
          <View key={`prev-month-day-${i}`} style={styles.day}>
              <Text style={styles.dayText}>{prevMonthDays - firstDayOffset + i + 1}</Text>
          </View>
      );
  }

  // Add the actual days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
      week.push(
          <TouchableOpacity
              key={`current-month-day-${day}`}
              style={[styles.day, selectedDates.includes(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`) && styles.selectedDay]}
              onPress={() => handleDateSelect(day, new Date(currentYear, currentMonth, day))}
          >
              <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
      );

      // When a week is complete or the month ends, add the week to the weeks array
      if ((firstDayOffset + day) % 7 === 0 || day === daysInMonth) {
          const weekStartDate = new Date(currentYear, currentMonth, day - week.length + 1);
          const weekNumber = getWeekNumber(weekStartDate);
          weeks.push(
              <View key={`week-${weekNumber}`} style={styles.week}>
                  <Text style={styles.weekNumber}>{weekNumber}</Text>
                  <View style={styles.daysRow}>{[...week]}</View>
              </View>
          );
          week = []; // Reset for the next week
      }
  }

  // Calculate and add leading days for the next month to complete the final week
  const totalDays = firstDayOffset + daysInMonth; // Total days that have been rendered
  const endBlanks = (7 - totalDays % 7) % 7; // Calculate remaining days to fill the last week

  for (let i = 1; i <= endBlanks; i++) {
      days.push(
          <View key={`next-month-day-${i}`} style={styles.day}>
              <Text style={styles.dayText}>{i}</Text>
          </View>
      );
  }

  // Add the last week if there were any days (including the next month's leading days)
  if (days.length > 0) {
      weeks.push(
          <View key={`week-${weeks.length + 1}`} style={styles.week}>
              {days}
          </View>
      );
  }

  // If there were days added for the next month, add the final week

  return weeks;
};

  const renderWeekDays = () => {
    return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
      <Text key={day} style={styles.weekDay}>{day}</Text>
    ));
  };

  return (
  <View style={styles.container}>
    <TouchableOpacity onPress={handlePrevMonth}>
      <Image source={require('./arrowL.png')} style={styles.arrowBack} />
    </TouchableOpacity>
  <Text style={styles.headerTitle}>Selecteer een beschikbare datum</Text>
  <View style={styles.header}>
    <TouchableOpacity onPress={handlePrevMonth}>
      <Image source={require('./arrowL.png')} style={styles.arrow} />
    </TouchableOpacity>
    <TouchableOpacity onPress={handleNextMonth}>
      <Image source={require('./arrowR.png')} style={styles.arrow} />
    </TouchableOpacity>
  </View>
  <View style={styles.monthSelector}>
    <Text style={styles.monthText}>{months[currentMonth]} {currentYear}</Text>
  </View>
  <View style={styles.weekDays}>
        {renderWeekDays()}
      </View>
      <View style={styles.daysContainer}>
        {renderCalendarDays()}
      </View>
      
  <TouchableOpacity style={styles.confirmButton}>
    <Text style={styles.confirmButtonText}>Bevestig keuze</Text>
  </TouchableOpacity>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Assuming a white background
    
  },
  arrowBack:{
    width: 40,
    height: 40,
    marginBottom: 40,
    right: 140,
    top: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff', // Light grey background for the header
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Dark text for better readability
    textAlign: 'center',
    marginBottom: 10,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FFFFFF', // White background for month selector
    borderRadius: 20,
    padding: 10,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Adjust based on your layout
    alignItems: 'center', // Ensures all items in the row are aligned vertically
    // Add any additional styling you need for the container of a week's days
  },
  arrow: {
    width: 50,
    height: 50,
    marginRight: 40,
    marginLeft: 40,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  week: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  weekNumber: {
    width: 30, // Adjust size accordingly
    textAlign: 'center', // Center the week number text
    marginRight: 2.5, // Add some space between the week number and the days
    backgroundColor: '#308ae4',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    color: 'white',
    lineHeight: 30,
    overflow: 'hidden',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    marginBottom: 5,
    marginLeft: 38,
  },
  weekDay: {
    fontSize: 16,
    color: '#333333',
    width: '14%',
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // or 'start' if you want them aligned to the left
    width: '100%', // Adjust this as necessary
    padding: 16, // Add some padding around the grid
},
  day: {
    width: '12.28%', // 100% divided by 7 days
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    height: 48,
    borderRadius: 10, // Circular days
    backgroundColor: '#f0f0f0', // Light grey background for day
    margin: 2,
  },
  selectedDay: {
    backgroundColor: '#3a72ffd4', // Blue background for selected day
  },
  dayText: {
    fontSize: 16,
    color: '#333333',
  },
  confirmButton: {
    width: '90%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff', // Blue background for confirm button
    borderRadius: 20,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#FFFFFF', // White text for confirm button
    fontWeight: 'bold',
  },
});


export default DateAndTimePicker;
