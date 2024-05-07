import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths } from 'date-fns';
import styled from 'styled-components';
import arrowL from './arrowL.png'; // Adjust the path as necessary
import arrowR from './arrowR.png'; // Adjust the path as necessary

const CalendarContainer = styled.div`
 display: grid;
 grid-template-columns: repeat(7, 1fr);
 gap: 1px;
 background-color: #f5f5f5;
 width: 100%; // Ensure the calendar spans the full width
`;

interface DayProps {
    isCurrentMonth: boolean;
    isPreviousMonth: boolean; // Added
    isNextMonth: boolean; // Added
}

const Day = styled.div<DayProps>`
 padding: 20px; // Increase padding to make the day boxes bigger
 background-color: ${props => props.isCurrentMonth ? 'white' : '#e0e0e0'};
 border: 1px solid #e0e0e0;
 color: ${props => props.isCurrentMonth ? 'black' : 'gray'};
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

    const renderDaysOfWeek = () => {
        const date = new Date(1970, 0, 4); // January 4th 1970, Sunday
        const days: React.ReactElement[] = [];
    
        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i}>{format(addDays(date, i), 'E')}</div>
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

            days.push(
                <Day key={d.getTime()} isCurrentMonth={isCurrentMonth} isPreviousMonth={isPreviousMonth} isNextMonth={isNextMonth}>
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

    return (
        <div>
            <ButtonContainer>
                <NavButton image={arrowL} onClick={navigateToPreviousMonth} />
                <MonthYearDisplay>{format(currentMonth, 'MMMM yyyy')}</MonthYearDisplay>
                <NavButton image={arrowR} onClick={navigateToNextMonth} />
            </ButtonContainer>
            {renderDaysOfWeek()}
            {renderCalendarDays()}
        </div>
    );
};

export default Cal;
