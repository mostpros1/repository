import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import JoinChat from '../Chat/JoinChat';

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
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - timezoneOffset);
    const dateString = localDate.toISOString().split('T')[0];
    
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
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Dagen van de vorige maand toevoegen om de eerste week te vullen
  for (let i = firstDayOffset; i > 0; i--) {
    const prevMonthDay = new Date(currentYear, currentMonth - 1, prevMonthDays - i + 1);
    week.push(
        <View key={`prev-month-day-${i}`} style={[styles.day, styles.pastDay]}>
            <Text style={[styles.dayText, styles.pastDayText]}>{prevMonthDays - i + 1}</Text>
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
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = new Date(currentYear, currentMonth, day);
    const isPast = currentDay < today;

    if (currentDay.getDay() === 1 || day === 1) {
      week.unshift(addWeekNumber(currentDay)); // Add week number at the beginning of the week
    }

    week.push(
      <TouchableOpacity
        key={`current-month-day-${day}`}
        style={[
          styles.day, 
          selectedDates.includes(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`) && styles.selectedDay,
          isPast && styles.pastDay // Apply pastDay style if the day is in the past
        ]}
        onPress={() => !isPast && handleDateSelect(day, currentDay)} // Disable onPress for past days
        disabled={isPast} // Disable the button for past days
      >
        <Text style={[styles.dayText, isPast && styles.pastDayText]}>{day}</Text>
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
    marginLeft: 2,
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
    backgroundColor: '#a80505',
    margin: 3,
  },
  dayNietBeschikbaar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#a80505',
    margin: 3,
  },
  dayBeschikbaar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#20ce11',
    margin: 3,
  },
  selectedDay: {
    backgroundColor: '#308ae4',
    width: 40,
    height: 40,
    color: 'white',
  },
  dayText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
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
  pastDay: {
    backgroundColor: '#a80505', // Light grey background for past days
    borderColor: '#dcdcdc', // Slightly darker border for distinction
    borderWidth: 1,
    borderRadius: 5, // Assuming your days are shaped like this; adjust as needed
    margin: 3, // Adjust based on your layout
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  pastDayText: {
    color: '#a1a1a1', // Light grey text for past days, making it appear "disabled"
    fontSize: 16, // Adjust to match your design
  },
});

export default DateAndTimePicker;