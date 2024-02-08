import React, { useState } from 'react';
import './DatePicker.css'; // Assuming your CSS is here

const DateAndTimePicker: React.FC = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const [selectedDates, setSelectedDates] = useState<number[]>([]);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const handleDateSelect = (day: number, date: Date) => {
    if (date < today) return;
    setSelectedDates((prevDates) => {
      return prevDates.includes(day) ? prevDates.filter(d => d !== day) : [...prevDates, day];
    });
  };

  const handlePrevMonth = () => {
    setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  // Function to calculate the week number
  const getWeekNumber = (d: Date) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  };

  // Generate the days for the chosen month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const renderCalendar = () => {

    let weeks: JSX.Element[][] = [];
    let weekDays: JSX.Element[] = [];
    let weekStartDates: Date[] = []; // Store the start date of each week
  
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(currentYear, currentMonth, day);
      const weekDay = dayDate.getDay();
      const isMonday = weekDay === 1 || day === 1;
  
      if (isMonday) {
        if (weekDays.length > 0) {
          weeks.push([...weekDays]);
          weekDays = [];
        }
        weekStartDates.push(dayDate); // Store the start date of the new week
      }
  
      const isSelected = selectedDates.includes(day);
      const isPastDay = dayDate < today;
      weekDays.push(
        <div key={day} className={`day ${isSelected ? 'selected' : ''} ${isPastDay ? 'past' : ''}`} onClick={() => handleDateSelect(day, dayDate)}>
          {day}
        </div>
      );
  
      if (day === daysInMonth && weekDays.length > 0) {
        weeks.push([...weekDays]);
      }
    }
  
    return weeks.map((week, index) => (
      <div key={index} className="week">
        <div className="week-number">{getWeekNumber(weekStartDates[index])}</div>
        {week}
      </div>
    ));
  };
  
  return (
    <div className="date-time-picker">
      <div className="calendar">
        <div className="month-selector">
          <button onClick={handlePrevMonth} className='prev-month'>&lt;</button>
          <span>{months[currentMonth]} {currentYear}</span>
          <button onClick={handleNextMonth} className='next-month'>&gt;</button>
        </div>
        <div className="week-days">
          {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map(day => (
            <div key={day} className="week-day">{day}</div>
          ))}
        </div>
        <div className="weeks">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default DateAndTimePicker;
