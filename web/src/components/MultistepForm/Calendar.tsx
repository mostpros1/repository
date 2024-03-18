import React, { useState } from 'react';
import './DatePicker.css';
import Next from './arrowR.png';
import Prev from './arrowL.png';
import AWS from 'aws-sdk';

interface DateAndTimePickerProps {
  // onDateChange?: (selectedDates: string[]) => void;
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = ({ /* onDateChange */ }) => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleDateSelect = (_day: number, date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    if (date < today) return; // Voorkomt selectie van vorige dagen
    
    setSelectedDates((prevDates) => {
      if (prevDates.includes(dateString)) { // Als de dag al geselecteerd was, deselecteer het
        setSelectedDay(null); // Verwijder de selectie van de dag
        return prevDates.filter(d => d !== dateString); // Verwijder deze datum uit de geselecteerde datums
      } else { // Als de dag niet al geselecteerd was, selecteer het
        setSelectedDay(date); // Stel de nieuwe geselecteerde dag in
        return [...prevDates, dateString]; // Voeg deze datum toe aan de geselecteerde datums
      }
    });
    
    if (selectedDates.length === 1 && selectedDates[0] === dateString) {
      // Als de enige geselecteerde datum de datum is die net gedeselecteerd werd
      setSelectedDay(null); // Zet selectedDay op null
    }
  };
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const handleTimeSelect = (time: string) => {
    setSelectedTimes(prevTimes => {
      if (prevTimes.includes(time)) {
        // Verwijder de tijd als deze al geselecteerd was
        return prevTimes.filter(t => t !== time);
      } else {
        // Voeg de tijd toe als deze nog niet geselecteerd was
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

  const getWeekNumber = (d: Date) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const renderCalendar = () => {
    let weeks: JSX.Element[] = [];
    let weekDays: JSX.Element[] = [];
    let weekStartDates: Date[] = []; // Deze array zal de startdatum van elke week bevatten
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    
    // Bereken de dag van de week van de eerste dag van de maand
    let dayOfWeek = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Aanpassing voor Maandag als eerste dag van de week
    let previousMonthDisplay = dayOfWeek;
  
    // Voeg dagen van de vorige maand toe aan de kalender
    for (let i = previousMonthDisplay; i > 0; i--) {
      const day = prevMonthDays - i + 1;
      if (i === previousMonthDisplay) { // Voeg de startdatum van de eerste week toe
        weekStartDates.push(new Date(currentYear, currentMonth - 1, day));
      }
      weekDays.push(
        <div
          key={`prev-${day}`}
          className="days-past"
          onClick={() => handleDateSelect(day, new Date(currentYear, currentMonth - 1, day))}
        >
          {day}
        </div>
      );
    }

    
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(currentYear, currentMonth, day);
      const weekDay = dayDate.getDay();
      
      // Controleer of dit de start van een nieuwe week is
      if (weekDay === 1 || (day === 1 && weekDays.length === 0)) {
        weekStartDates.push(dayDate);
      }
      
      const isSelected = selectedDates.includes(dayDate.toISOString().split('T')[0]);
      const isPastDay = dayDate < today;
      const isToday = dayDate.getDate() === today.getDate() && dayDate.getMonth() === today.getMonth() && dayDate.getFullYear() === today.getFullYear();
      
      weekDays.push(
        <div
        key={day}
        className={`day ${isSelected ? 'selected' : ''} ${isPastDay ? 'past' : ''} ${weekDay === 0 || weekDay === 6 ? 'weekend' : ''} ${isToday ? 'today' : ''}`}
        onClick={() => handleDateSelect(day, dayDate)}
        >
          {day}
        </div>
      );
      
      if (weekDay === 0 || day === daysInMonth) {
        while (weekDays.length < 7) { // Vul de laatste week aan met dagen van de volgende maand
          let nextDay = weekDays.length - weekDay + 1;
          if (weekDay === 0 && weekDays.length === 1) { // Voeg de startdatum van de laatste week toe
            weekStartDates.push(dayDate);
          }
          weekDays.push(
            <div
            key={`next-${nextDay}`}
            className="days-next"
              onClick={() => handleDateSelect(nextDay, new Date(currentYear, currentMonth + 1, nextDay))}
              >
              {nextDay}
            </div>
          );
        }
        
        weeks.push(
          <div key={weekStartDates.length} className="days-container">
            {weekDays}
          </div>
        );
        weekDays = [];
      }
    }
    
    return weeks.map((week, index) => (
      <div key={index} className="week">
        <div className="week-number">{weekStartDates[index] ? getWeekNumber(weekStartDates[index]) : 'N/A'}</div>
        {week}
      </div>
    ));
  };
  
  
  const handleCurrentMonth = () => {
    setDate(new Date()); // Zet de datum terug naar vandaag
  };

  const submitDates = async () => {
    
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const item = {
      userId: "1", // Dit zou iets unieks moeten zijn, zoals een user-id
      dates: selectedDates, // Dit is de lijst van geselecteerde datums
    };
    
    const params = {
      TableName: "UserAvailability",
      Item: item, // Use the 'item' object instead of creating a new one
    };
  
    try {
      await dynamoDb.put(params).promise();
      alert("Beschikbaarheid succesvol opgeslagen!");
    } catch (error) {
      console.error("Er is een fout opgetreden bij het opslaan: ", error);
      alert("Fout bij het opslaan van beschikbaarheid.");
    }
  };
  
  return (
    <div className="date-time-picker">
      <div className="calendar">
        <div className="month-selector">
          <button type="button" className='prev-month' onClick={handlePrevMonth}><img src={Prev} className='fotoinButtonL'/></button>
          <button type="button" onClick={handleCurrentMonth} className='buttonToday'>Today</button> {/* Voeg deze regel toe */}
          <span>{months[currentMonth]} {currentYear}</span>
          <button type="button" className='next-month' onClick={handleNextMonth}><img src={Next} className='fotoinButtonR'/></button>
        </div>
        <div className="week-days">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="week">
          {renderCalendar()}
        </div>
      </div>
        {selectedDay && (
        <div className="time-selector">
        {['08:30', '09:00', '09:30', '10:00', '10:30', '11:00','11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'].map(time => (
          <div
            key={time}
            className={`time-slot ${selectedTimes.includes(time) ? 'selected' : ''}`}
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </div>
        ))}
      </div>
      )}
        <button type="button" className='submitBeschikbaarheid' onClick={submitDates}>Bevestig keuze</button>
      </div>
  );
};

export default DateAndTimePicker;
