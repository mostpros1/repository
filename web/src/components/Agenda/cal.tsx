import React, { useState, useEffect } from 'react';
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

interface Entry {
    text: string;
    time?: string;
    color: string;
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
    background-color: ${props => props.isCurrentMonth ? 'transparent' : 'transparent'};
    border: 1px solid ${props => props.hasAvailability ? 'transparent' : 'transparent'};
    color: ${props => props.isCurrentMonth ? '#308ae4' : 'gray'};
    cursor: pointer;
    font-size: 1.5rem;

    &:hover {
        border: 0.18rem solid ${props => props.hasAvailability ? '#17a1fa47' : '#17a1fa47'};
        background-color: ${props => props.isCurrentMonth ? '#3EA3E6' : '#3EA3E6'};
        color: ${props => props.isCurrentMonth ? 'blue' : 'blue'};
    }

    &.selected {
        border: 0.18rem solid ${props => props.hasAvailability ? '#17a1fa47' : '#17a1fa47'};
        background-color: ${props => props.isCurrentMonth ? '#3EA3E6' : '#3EA3E6'};
        color: ${props => props.isCurrentMonth ? 'blue' : 'blue'};
    }

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
    const [entries, setEntries] = useState<{ [key: string]: Entry[] }>({});
    const [availabilities, setAvailabilities] = useState<{ [key: string]: string[] }>({});
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    useEffect(() => {
        setSelectedDate(null); // Reset selectedDate whenever currentMonth changes
    }, [currentMonth]);

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

    const clearSelectedDates = () => {
        setSelectedDates([]);
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
                            className={selectedDates.some(selectedDate => selectedDate.getDate() === day.getDate() && selectedDate.getMonth() === day.getMonth() && selectedDate.getFullYear() === day.getFullYear()) ? 'selected' : ''}
                            onClick={() => {
                                if (selectedDates.some(selectedDate => selectedDate.getTime() === day.getTime())) {
                                    setSelectedDates(selectedDates.filter(selectedDate => selectedDate.getTime() !== day.getTime()));
                                } else {
                                    setSelectedDates([...selectedDates, day]);
                                }
                            }}
                        >
                            {format(day, 'd')}
                            {hasEntries && (
                                <div className="dropdown">
                                    {entries[formattedDate].map((entry, index) => (
                                        <div key={index} style={{ backgroundColor: entry.color, padding: '5px', margin: '2px 0', borderRadius: '5px' }}>
                                            {entry.text} {entry.time && `- ${entry.time}`}
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
            [formattedDate]: [...newEntries, { text, time, color }]
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
                    <label>Kleur: <input name="entryColor" type="color" required /></label>
                </div>
                <button className={`submitButton submitButtonStyling ${selectedDates.length >= 1 ? '' : 'disabled'}`} type="submit" disabled={selectedDates.length !== 1}>Toevoegen</button>
                <button className={`submitButtonStyling ${selectedDates.length >= 1 ? '' : 'disabled'}`} type='button' onClick={clearSelectedDates}>Verwijder geselecteerde</button>
            </form>
            <form className="availability-form" onSubmit={(e) => {
                e.preventDefault();
                const date = (e.target as any).elements.availDate.value;
                const time = (e.target as any).elements.availTime.value;
                const pattern = (e.target as any).elements.availPattern.value;
                addMultipleDays(date, time, pattern);
            }}>
                <div className='patternSection' >
                    <h4>Verwijder Beschikbaarheid</h4>
                    <button className={`submitButtonStyling ${selectedDates.length === 1 ? '' : 'disabled'}`} type='button'>Verwijder Datum</button>
                </div>
                <div className='patternSection' >
                    <br />
                    <b>Verwijder meerdere Dagen</b>
                    <br />
                    <label>Select Pattern:</label>
                    <select name="pattern">
                        <option value="weekday">Door de weeks</option>
                        <option value="weekend">Weekend</option>
                        <option value="daily">Elke Dag</option>
                    </select>
                    <br />
                    <button className='submitButtonStyling' type="submit">Verwijder Dagen</button>
                </div> {/* Here's the missing closing tag */}
            </form>
        </div >
    );
};

export default Cal;
