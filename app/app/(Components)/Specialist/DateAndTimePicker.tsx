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
  const weeks = [];
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let week = [];
  const firstDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  let weekCount = 0;
  // Dagen van de vorige maand toevoegen om de eerste week te vullen
  for (let i = firstDayOffset; i > 0; i--) {
    week.push(
      <View key={`prev-month-day-${i}`} style={styles.day}>
        <Text style={styles.dayText}>{prevMonthDays - i + 1}</Text>
      </View>
    );
  }
  // Voeg de weeknummer aan het begin van elke week toe
  const addWeekNumber = (date) => {
    const weekNumber = getWeekNumber(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    return (
      <View style={styles.weekNumber}>
        <Text style={styles.weekNumber}>{weekNumber}</Text>
      </View>
    );
  };
  // Dagen van de huidige maand toevoegen
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = new Date(currentYear, currentMonth, day);
    if (currentDay.getDay() === 1 || day === 1) {
      week.unshift(addWeekNumber(currentDay)); // Voeg weeknummer toe aan het begin van de week
    }
    week.push(
      <TouchableOpacity
        key={`current-month-day-${day}`}
        style={[styles.day, selectedDates.includes(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`) && styles.selectedDay]}
        onPress={() => handleDateSelect(day, currentDay)}
      >
        <Text style={styles.dayText}>{day}</Text>
      </TouchableOpacity>
    );
    if (currentDay.getDay() === 0 || day === daysInMonth) {
      weeks.push(
        <View key={`week-${currentYear}-${currentMonth}-${weekCount++}`} style={styles.week}>
          <View style={styles.daysRow}>{[...week]}</View>
        </View>
      );
      week = [];
    }
  }
  return weeks;
};
  const renderWeekDays = () => {
    return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
      <Text key={day} style={styles.weekDay}>{day}</Text>
    ));
  };
  return (
  <View style={styles.container}>
    <TouchableOpacity>
      <Image source={require('../../../assets/images/arrowL.png')} style={styles.arrowBack} />
    </TouchableOpacity>
  <Text style={styles.headerTitle}>Selecteer een beschikbare datum</Text>
  <View style={styles.header}>
    <TouchableOpacity onPress={handlePrevMonth}>
      <Image source={require('../../../assets/images/arrowL.png')} style={styles.arrow} />
    </TouchableOpacity>
    <TouchableOpacity onPress={handleNextMonth}>
      <Image source={require('../../../assets/images/arrowR.png')} style={styles.arrow} />
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
    backgroundColor: '#FFFFFF',
  },
  arrowBack: {
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
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  arrow: {
    width: 60,
    height: 60,
    marginRight: 40,
    marginLeft: 40,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#308ae4',
    width: 160,
    borderRadius: 10,
    lineHeight: 30,
    overflow: 'hidden',
    textAlign: 'center',
  },
  week: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  weekNumber: {
    width: 30,
    textAlign: 'center',
    marginRight: 3,
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
    width: '82%',
    marginBottom: 5,
    marginLeft: 32,
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
    justifyContent: 'space-around',
    width: '100%',
    padding: 16,
  },
  day: {
    width: 40, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    margin: 3,
  },
  selectedDay: {
    backgroundColor: '#3a72ffd4',
    width: 40,
    height: 40, 
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
    backgroundColor: '#007bff',
    borderRadius: 20,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
export default DateAndTimePicker;