import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths } from 'date-fns';
import { nl } from 'date-fns/locale';
import styled from 'styled-components';
import arrowL from './arrowL.png'; // Pas het pad aan naar nodig
import arrowR from './arrowR.png'; // Pas het pad aan naar nodig

const CalendarContainer = styled.div`
 display: grid;
 grid-template-columns: repeat(7, 1fr);
 gap: 1px;
 background-color: #f5f5f5;
 width: 100%; // Zorg ervoor dat de kalender de volledige breedte beslaat
`;

interface DayProps {
    isCurrentMonth: boolean;
    isPreviousMonth: boolean; // Toegevoegd
    isNextMonth: boolean; // Toegevoegd
    onClick: () => void; // Add this line
    hasEntries: boolean; // Add this line to indicate if there are entries
}

const Day = styled.button<DayProps>`
 padding: 20px; // Verhoog de padding om de dagvakken groter te maken
 background-color: ${props => props.isCurrentMonth ? 'white' : '#e0e0e0'};
 border: 1px solid #e0e0e0;
 color: ${props => props.isCurrentMonth ? 'black' : 'gray'};
 cursor: pointer; // Make the cursor change to a pointer when hovering over a day
 position: relative; // Allow positioning of child elements
 &::after {
     content: '';
     position: absolute;
     bottom: 0;
     left: 50%;
     transform: translateX(-50%);
     width: 10px;
     height: 10px;
     border-radius: 50%;
     background-color: ${props => props.hasEntries ? 'red' : 'transparent'}; // Change color as needed
 }
`;

const DaysOfWeek = styled.div`
 display: flex;
 justify-content: space-around;
 background-color: #178feb;
 color: white;
 padding: 10px;
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

interface NavButtonProps {
    image: string;
    onClick: () => void;
}

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
    const [entries, setEntries] = useState<{ [date: string]: { text: string, color: string }[] }>({});

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
    };

    const addEntry = (entry: string, color: string) => {
        if (selectedDate === null) {
            // Handle the case where selectedDate is null, e.g., by logging an error or setting a default date
            console.error("Selected date is null. Cannot add entry.");
            return;
        }
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        setEntries(prev => ({
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), { text: entry, color: color }]
        }));
    };

    const renderDaysOfWeek = () => {
        const date = new Date(1970, 0, 4); // 4 januari 1970, zondag
        const days: React.ReactElement[] = [];
    
        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i}>{format(addDays(date, i), 'eeee', { locale: nl })}</div>
            );
        }
    
        return <DaysOfWeek>{days}</DaysOfWeek>;
    };

    const renderCalendarDays = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);

        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const days: React.ReactElement[] = [];

        for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
            const isCurrentMonth = d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
            const isPreviousMonth = d.getMonth() < currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
            const isNextMonth = d.getMonth() > currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
            const dateKey = format(d, 'yyyy-MM-dd');
            const hasEntries = !!entries[dateKey]?.length;

            days.push(
                <Day key={d.getTime()} isCurrentMonth={isCurrentMonth} isPreviousMonth={isPreviousMonth} isNextMonth={isNextMonth} onClick={() => handleDayClick(d)} hasEntries={hasEntries}>
                    {format(d, 'd')}
                </Day>
            );
        }

        return <CalendarContainer>{days}</CalendarContainer>;
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

    return (
        <div>
            <ButtonContainer>
                <NavButton image={arrowL} onClick={navigateToPreviousMonth} />
                <MonthYearDisplay>{format(currentMonth, 'MMMM yyyy', { locale: nl })}</MonthYearDisplay>
                <NavButton image={arrowR} onClick={navigateToNextMonth} />
            </ButtonContainer>
            {renderDaysOfWeek()}
            {renderCalendarDays()}
            <button onClick={goToCurrentMonth}>Ga naar huidige maand</button>
            {selectedDate && (
                <div>
                    <h3>Entries for {format(selectedDate, 'yyyy-MM-dd')}</h3>
                    <ul>
                        {entries[format(selectedDate, 'yyyy-MM-dd')]?.map((entry, index) => (
                            <li key={index}>
                                <div style={{ backgroundColor: entry.color, opacity: 0.5, padding: '5px', margin: '2px 0', borderRadius: '5px' }}>{entry.text}</div>
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={e => {
                        e.preventDefault();
                        const entry = (e.target as HTMLFormElement).elements.namedItem('entry') as HTMLInputElement;
                        const color = (e.target as HTMLFormElement).elements.namedItem('color') as HTMLSelectElement;
                        addEntry(entry.value, color.value);
                        entry.value = '';
                    }}>
                        <input type="text" name="entry" placeholder="Add an entry" />
                        <select name="color">
                            <option value="rgba(0,0,0,0.5)">Zwart</option>
                            <option value="rgba(255,0,0,0.5)">Rood</option>
                            <option value="rgba(0,255,0,0.5)">Groen</option>
                            <option value="rgb(52, 143, 255)">Blauw</option>
                            {/* Add more colors as needed */}
                        </select>
                        <button type="submit">Add</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Cal;