import React, { useState } from 'react';
import styled from 'styled-components';
import { eachDayOfInterval, endOfMonth, format, startOfMonth, startOfWeek, endOfWeek, addMonths, subMonths } from 'date-fns';
import { nl } from 'date-fns/locale';
import arrowL from '../../assets/arrowL.png';
import arrowR from '../../assets/arrowR.png';
import './cal.css';



interface DayProps {
    isCurrentMonth: boolean;
    hasAvailability: boolean;
    hasEntries: boolean;
}

interface NavButtonProps {
    image: string;
}

const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background-color: #f5f5f5;
    width: 100%;
`;

const Day = styled.button<DayProps>`
    position: relative;
    padding: 10px;
    background-color: ${props => props.isCurrentMonth ? 'white' : '#e0e0e0'};
    border: 1px solid ${props => props.hasAvailability ? 'green' : '#939395'};
    color: ${props => props.isCurrentMonth ? 'black' : 'gray'};
    cursor: pointer;
    font-size: 12px;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${props => props.hasEntries ? 'red' : 'transparent'};
    }

    .dropdown {
        display: none;
        position: absolute;
        top: calc(100% - 1px);
        left: 50%;
        transform: translate(-50%, 0);
        background-color: white;
        border: 1px solid #ccc;
        padding: 10px;
        z-index: 1000;
        height: 200px;
        overflow-y: auto;
    }
    
    &:hover .dropdown {
        display: block;
    }
`;

const DaysOfWeekContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: #178feb;
`;

const DayOfWeek = styled.div`
    text-align: center;
    color: white;
    padding: 10px;
    font-size: 12px;
    font-weight: bold;
`;

const MonthYearDisplay = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`;

const NavButton = styled.button<NavButtonProps>`
    background: none;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    background-image: url(${props => props.image});
    background-size: cover;
`;

const Cal = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [entries, setEntries] = useState<{ [key: string]: { text: string; color: string }[] }>({});
    const [availabilities, setAvailabilities] = useState<{ [key: string]: string[] }>({});

    const renderDaysOfWeek = () => {
        const daysOfWeek = ['Maa', 'Din', 'Woe', 'Don', 'Vri', 'Zat', 'Zon'];
        return (
            <DaysOfWeekContainer>
                {daysOfWeek.map(day => (
                    <DayOfWeek key={day}>{day}</DayOfWeek>
                ))}
            </DaysOfWeekContainer>
        );
    };

    const renderCalendarDays = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

        const days = eachDayOfInterval({ start: startDate, end: endDate });

        return (
            <CalendarContainer>
                {days.map(day => {
                    const formattedDate = format(day, 'yyyy-MM-dd');
                    const isCurrentMonth = day.getMonth() === monthStart.getMonth();
                    const hasAvailability = !!availabilities[formattedDate];
                    const hasEntries = !!entries[formattedDate];

                    return (
                        <Day
                            key={formattedDate}
                            isCurrentMonth={isCurrentMonth}
                            hasAvailability={hasAvailability}
                            hasEntries={hasEntries}
                            onClick={() => setSelectedDate(day)}
                        >
                            {format(day, 'd')}
                            {hasEntries && (
                                <div className="dropdown">
                                    {entries[formattedDate].map((entry, index) => (
                                        <div key={index} style={{ backgroundColor: entry.color, padding: '5px', margin: '2px 0', borderRadius: '5px' }}>
                                            {entry.text}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Day>
                    );
                })}
            </CalendarContainer>
        );
    };

    const navigateToPreviousMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const navigateToNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const goToCurrentMonth = () => {
        setCurrentMonth(new Date());
    };

    const addEntry = (text: string, time: string, color: string) => {
        if (!selectedDate) return;

        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const newEntries = entries[formattedDate] || [];
        setEntries({
            ...entries,
            [formattedDate]: [...newEntries, { text, color }]
        });
    };

    const addAvailability = (date: string, time: string) => {
        const newAvailabilities = availabilities[date] || [];
        setAvailabilities({
            ...availabilities,
            [date]: [...newAvailabilities, time]
        });
    };

    const addMultipleDays = (date: string, time: string, pattern: 'weekday' | 'weekend' | 'daily') => {
        const selectedDate = new Date(date);
        const endDate = endOfMonth(selectedDate);
        let currentDate = selectedDate;

        while (currentDate <= endDate) {
            const dayOfWeek = currentDate.getDay();
            const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            if ((pattern === 'weekday' && isWeekday) || (pattern === 'weekend' && isWeekend) || pattern === 'daily') {
                const formattedDate = format(currentDate, 'yyyy-MM-dd');
                addAvailability(formattedDate, time);
            }

            currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        }
    };

    return (
        <div className="calendar-container">
            <ButtonContainer>
                <NavButton image={arrowL} onClick={navigateToPreviousMonth} />
                <MonthYearDisplay>{format(currentMonth, 'MMMM yyyy', { locale: nl })}</MonthYearDisplay>
                <NavButton image={arrowR} onClick={navigateToNextMonth} />
            </ButtonContainer>
            <button className="current-month-button" onClick={goToCurrentMonth}>Ga naar huidige maand</button>
            {renderDaysOfWeek()}
            {renderCalendarDays()}
            <form className="entry-form" onSubmit={(e) => {
                e.preventDefault();
                const text = (e.target as any).elements.entryText.value;
                const time = (e.target as any).elements.entryTime.value;
                const color = (e.target as any).elements.entryColor.value;
                addEntry(text, time, color);
            }}>
                <div className="form-group">
                    <label>Tekst: <input name="entryText" type="text" required /></label>
                </div>
                <div className="form-group">
                    <label>Tijd: <input name="entryTime" type="time" required /></label>
                </div>
                <div className="form-group">
                    <label className='colorgroup'>Kleur: <input className='colorgroupInput' name="entryColor" type="color" required /></label>
                </div>
                <button type="submit">Toevoegen</button>
            </form>
            <form className="availability-form" onSubmit={(e) => {
                e.preventDefault();
                const date = (e.target as any).elements.availDate.value;
                const time = (e.target as any).elements.availTime.value;
                const pattern = (e.target as any).elements.availPattern.value;
                addMultipleDays(date, time, pattern);
            }}>
                <div className="form-group">
                    <label>Datum: <input name="availDate" type="date" required /></label>
                </div>
                <div className="form-group">
                    <label>Tijd: <input name="availTime" type="time" required /></label>
                </div>
                <div className="form-group">
                    <label>Herhaalpatroon:
                        <select name="availPattern" required>
                            <option value="weekday">Weekdagen</option>
                            <option value="weekend">Weekend</option>
                            <option value="daily">Dagelijks</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Toevoegen</button>
            </form>
        </div>
    );
};

export default Cal;
