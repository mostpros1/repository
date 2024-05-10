import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths } from 'date-fns';
import { nl } from 'date-fns/locale';
import styled from 'styled-components';
import arrowL from './arrowL.png'; // Adjust the path as needed
import arrowR from './arrowR.png'; // Adjust the path as needed
import { Auth } from 'aws-amplify';
import { dynamo } from '../../../declarations';

const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background-color: #f5f5f5;
    width: 100%; 
`;

interface DayProps {
    isCurrentMonth: boolean;
    isPreviousMonth: boolean; 
    isNextMonth: boolean; 
    onClick: () => void; 
    hasEntries: boolean; 
    hasAvailability: boolean;
}

const Day = styled.button<DayProps>`
    position: relative;
    padding: 20px;
    background-color: ${props => props.isCurrentMonth ? 'white' : '#e0e0e0'};
    border: 5px solid ${props => props.hasAvailability ? 'green' : 'red'};
    color: ${props => props.isCurrentMonth ? 'black' : 'gray'};
    cursor: pointer;

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




const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const CheckboxLabel = styled.label`
    margin-bottom: 5px;
`;

const Checkbox = styled.input`
    margin-right: 5px;
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
    const [entries, setEntries] = useState<{ [date: string]: { text: string, time: string, color: string }[] }>({});

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
    };

    async function getEntriesFromDB() {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const email = authenticatedUser.attributes.email;
        dynamo.query({
            TableName: "Calendar",
            IndexName: "emailIndex",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email 
            },
        }).promise().then((data) => {
            if (data.Items && data.Items.length > 0) {
                setEntries(data.Items[0].availibility);
                console.log(data);
            } else {
                console.log("No items found in the query result.");
            }
        });
    }
    getEntriesFromDB();

    const addEntry = (entry: string, time: string, color: string) => {
        if (selectedDate === null) {
            console.error("Selected date is null. Cannot add entry.");
            return;
        }
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        setEntries(prev => ({
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), { text: entry, time: time, color: color }]
        }));
    };

    const renderDaysOfWeek = () => {
        const date = new Date(1970, 0, 4);
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
            const hasAvailability = true;
            const hasEntries = !!entries[dateKey]?.length;
    
            // Conditionally render the form based on whether the day has entries
            const form = hasAvailability? (
                <div className="dropdown">
                    <Form>
                        <CheckboxLabel>
                            <Checkbox type="checkbox" name="option1" onChange={() => {}} />
                            Option 1
                        </CheckboxLabel>
                        <CheckboxLabel>
                            <Checkbox type="checkbox" name="option2" onChange={() => {}} />
                            Option 2
                        </CheckboxLabel>
                        {/* Add more checkboxes as needed */}
                        <button type="submit">Submit</button>
                    </Form>
                </div>
            ) : null;
    
            days.push(
                <Day key={d.getTime()} isCurrentMonth={isCurrentMonth} isPreviousMonth={isPreviousMonth} isNextMonth={isNextMonth} onClick={() => handleDayClick(d)} hasEntries={hasEntries} hasAvailability={hasAvailability}>
                    {format(d, 'd')}
                    {form} {/* Render the form if it exists */}
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

    const addAvailibility = async (date: string, time: string, color: string) => {
        if (selectedDate === null) {
            console.error("Selected date is null. Cannot add entry.");
            return;
        }
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        setEntries(prev => ({
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), { text: date, time, color: color }]
        }));
        console.log(entries);
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const email = authenticatedUser.attributes.email;
        console.log(email);
        console.log(date);
        console.log(time);
        dynamo.query({
            TableName: "Professionals",
            IndexName: "emailIndex",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            }
        }).promise().then((data) => {
            if (data.Items && data.Items.length > 0) {
                console.log(data.Items[0]);

                const newItem = { date: date, time: time };
                const availibilityArray = Array.isArray(data.Items[0].availability) ? data.Items[0].availability : [data.Items[0].availability];
                const updatedAvailability = [...availibilityArray, newItem];

                dynamo.update({
                    TableName: "Professionals",
                    Key: {
                        id: data.Items[0].id,
                    },
                    UpdateExpression: `set availability = :availability`,
                    ExpressionAttributeValues: {
                        ":availability": updatedAvailability,
                    },
                }).promise()
                    .then(output => console.log(output.Attributes))
                    .catch(console.error);
            } else {
                console.error("No items found in the query result.");
            }
        }).catch((err) => {
            console.error(err);
        });
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
            <button onClick={goToCurrentMonth}>Go to current month</button>
            {selectedDate && (
                <div>
                    <h3>Entries for {format(selectedDate, 'yyyy-MM-dd')}</h3>
                    <ul>
                        {entries[format(selectedDate, 'yyyy-MM-dd')]?.map((entry, index) => (
                            <li key={index}>
                                <div style={{ backgroundColor: entry.color, opacity: 0.5, padding: '5px', margin: '2px 0', borderRadius: '5px' }}>
                                    <>
                                        {entry.text}
                                        {' '}
                                        {entry.time}
                                    </>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            const entry = (e.target as HTMLFormElement).elements.namedItem('entry') as HTMLInputElement;
                            const color = (e.target as HTMLFormElement).elements.namedItem('color') as HTMLSelectElement;
                            addEntry(entry.value, '', color.value);
                            entry.value = '';
                        }}
                    >
                        <input type="text" name="entry" placeholder="Add an entry" />
                        <select name="color">
                            <option value="rgba(0,0,0,0.5)">Black</option>
                            <option value="rgba(255,0,0,0.5)">Red</option>
                            <option value="rgba(0,255,0,0.5)">Green</option>
                            <option value="rgb(52, 143, 255)">Blue</option>
                        </select>
                        <button type="submit">Add</button>
                    </form>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            const date = (e.target as HTMLFormElement).elements.namedItem('date') as HTMLInputElement;
                            const time = (e.target as HTMLFormElement).elements.namedItem('time') as HTMLInputElement;
                            addAvailibility(date.value, time.value, '');
                            date.value = '';
                            time.value = '';
                        }}
                    >
                        <b>Add availability</b>
                        <br></br>
                        <input type="date" name="date" />
                        <input type="time" name="time" />
                        <button type="submit">Add</button>
                    </form>
                </div>
            )}
        </div >
    );
};

export default Cal;
