import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths } from 'date-fns';
import { nl } from 'date-fns/locale';
import styled from 'styled-components';
import arrowL from './arrowL.png'; // Adjust the path as needed
import arrowR from './arrowR.png'; // Adjust the path as needed
import { Auth } from 'aws-amplify';
import { dynamo } from '../../../declarations';
import { BorderAll } from '@mui/icons-material';

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
    border: 5px solid ${props => props.hasAvailability ? 'green' : '939395'};
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

interface Availability {
    date: string;
    time: string;
}

const Cal = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [entries, setEntries] = useState<{ [date: string]: { text: string, time: string, color: string }[] }>({});
    const [availability, setAvailability] = useState<{ date: string, time: string }[]>([]);
    //const [selectedOptions, setSelectedOptions] = useState("");
    const [checkedItems, setCheckedItems] = useState<{ date: string; time: string; }[]>([]);
    const [uncheckedItems, setUncheckedItems] = useState<{ date: string; time: string; }[]>([]);


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
            if (data && data.Items && data.Items.length > 0) {
                const dateKey = format(data.Items[0].enrtys.date, 'yyyy-MM-dd');
                setEntries(prev => ({
                    ...prev,
                    [dateKey]: [...(prev[dateKey] || []), ...(data.Items ? [{ text: data.Items[0].entrys.text, time: "", color: data.Items[0].entrys.color }] : [])]
                }));
                setEntries(data.Items[0].availability);
                console.log(data);
            } else {
                console.log("No items found in the query result.");
            }
        });

    }
    getEntriesFromDB();


    async function addEntrysToDb(date: string, text: string, time: string, color: string) {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const email = authenticatedUser.attributes.email;

        try {
            await dynamo.put({
                Item: {
                    id: Math.floor(Math.random() * 1000000),
                    email: email,
                    enrtys: {
                        date: date, // Use computed property name to dynamically set the date as the key
                        text: text,
                        time: time,
                        color: color
                    }
                },
                TableName: "Calendar",
            }).promise();

            console.log("Entry added successfully.");
        } catch (err) {
            console.error("Error adding entry:", err);
        }
    }


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
        addEntrysToDb(dateKey, entry, time, color);
        getEntriesFromDB();
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


    async function getAvailabilityFromDB() {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const email = authenticatedUser.attributes.email;
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
                const output = data.Items[0];
                const beschikbaarheid: Availability[] = []
                for (let i = 0; i < output.availability.length; i++) {
                    console.log(output.availability[i].date);
                    beschikbaarheid.push({ date: output.availability[i].date, time: output.availability[i].time });
                    console.log(beschikbaarheid);
                }
                setAvailability(beschikbaarheid);
            } else {
                console.error("No items found in the query result.");
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        getAvailabilityFromDB();
    }, []);


    async function addMultipleDays(startDate: HTMLInputElement, time: string, pattern: 'weekday' | 'weekend' | 'daily') {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const email = authenticatedUser.attributes.email;

        // Convert startDate.value to a Date object
        const startDateValue = new Date(startDate.value);

        // Calculate the total number of days in the month
        const year = startDateValue.getFullYear();
        const month = startDateValue.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        dynamo.query({
            TableName: "Professionals",
            IndexName: "emailIndex",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            }
        }).promise().then(async (data) => {
            if (data.Items && data.Items.length > 0) {
                console.log(data.Items[0]);
                const userId = data.Items[0].id;
                let baseDate = startDateValue; // Now baseDate is a Date object

                // Determine the starting point based on the pattern
                switch (pattern) {
                    case 'weekday':
                        while (baseDate.getDay() !== 1) { // Find the first Monday
                            baseDate.setDate(baseDate.getDate() + 1);
                        }
                        break;
                    case 'weekend':
                        while (baseDate.getDay() !== 6) { // Find the first Saturday
                            baseDate.setDate(baseDate.getDate() + 1);
                        }
                        break;
                    case 'daily':
                        // No change needed for daily pattern
                        break;
                    default:
                        throw new Error("Invalid pattern");
                }

                for (let a = 0; a < daysInMonth; a++) {
                    const currentDate = new Date(baseDate);
                    currentDate.setDate(baseDate.getDate() + a);

                    // Skip weekends for 'weekday' pattern
                    if (pattern === 'weekday' && (currentDate.getDay() === 0 || currentDate.getDay() === 6)) continue;

                    // Skip weekdays for 'weekend' pattern
                    if (pattern === 'weekend' && (currentDate.getDay() >= 1 && currentDate.getDay() <= 5)) continue;

                    // Assuming 'availability' is an array of objects with 'date' and 'time'
                    // You need to construct the 'itemsForDb' based on your requirements
                    // For demonstration, we'll just create a dummy object
                    const itemsForDb = [{
                        date: currentDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
                        time: time // Example time, replace with actual time or logic to determine time
                    }];

                    await dynamo.update({
                        TableName: "Professionals",
                        Key: {
                            id: userId,
                        },
                        UpdateExpression: `set availability = list_append(if_not_exists(availability, :emptyList), :newItem)`,
                        ExpressionAttributeValues: {
                            ":emptyList": [],
                            ":newItem": itemsForDb,
                        },
                    }).promise()
                        .then(output => {
                            getAvailabilityFromDB();
                            console.log(output.Attributes);
                        })
                        .catch(console.error);
                }

                // Show an alert once all dates have been added
                window.alert("Datums zijn toegevoegt.");
            } else {
                console.error("No user found with the provided email.");
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Remove unchecked items from checkedItems array
        const filteredCheckedItems = checkedItems.filter(checkedItem =>
            !uncheckedItems.some(uncheckedItem =>
                uncheckedItem.date === checkedItem.date && uncheckedItem.time === checkedItem.time
            )
        );


        // Submit remaining checked items
        console.log("Selected options:", filteredCheckedItems);
        // Your submission logic here

        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const email = authenticatedUser.attributes.email;

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

                const itemsForDb = data.Items[0].availability.filter(checkedItem =>
                    !filteredCheckedItems.some(uncheckedItem =>
                        uncheckedItem.date === checkedItem.date && uncheckedItem.time === checkedItem.time
                    )
                );

                dynamo.update({
                    TableName: "Professionals",
                    Key: {
                        id: data.Items[0].id,
                    },
                    UpdateExpression: `set availability = :availability`,
                    ExpressionAttributeValues: {
                        ":availability": itemsForDb,
                    },
                }).promise()
                    .then(output => {
                        getAvailabilityFromDB();
                        console.log(output.Attributes)
                    })
                    .catch(console.error);
            }
        }).catch((err) => {
            console.error(err);
        }
        );

    };


    const renderCalendarDays = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);

        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const days: React.ReactElement[] = [];

        console.log(availability);




        const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, item: { date: string; time: string; }) => {
            const isChecked = e.target.checked;
            if (isChecked) {
                // Checkbox is checked, add item to checkedItems array and remove from uncheckedItems array if exists
                setCheckedItems(prev => [...prev, item]);
                setUncheckedItems(prev => prev.filter(uncheckedItem => uncheckedItem.date !== item.date || uncheckedItem.time !== item.time));
            } else {
                // Checkbox is unchecked, add item to uncheckedItems array and remove from checkedItems array if exists
                setUncheckedItems(prev => [...prev, item]);
                setCheckedItems(prev => prev.filter(checkedItem => checkedItem.date !== item.date || checkedItem.time !== item.time));
            }
        };

        for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
            const isCurrentMonth = d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
            const isPreviousMonth = d.getMonth() < currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
            const isNextMonth = d.getMonth() > currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
            const dateKey = format(d, 'yyyy-MM-dd');


            const hasAvailability = availability.some(availabilityItem => availabilityItem.date === dateKey);
            const hasEntries = !!entries[dateKey]?.length;




            // Conditionally render the form based on whether the day has entries
            const form = hasAvailability ? (
                <div className="dropdown">
                    <Form onSubmit={handleSubmit}>
                        Verwijder Beschikbaarheid<br></br>
                        {availability
                            .filter(availabilityItem => availabilityItem.date === dateKey)
                            .map((filteredAvailabilityItem, index) => (
                                <div key={index}>
                                    <Checkbox
                                        type="checkbox"
                                        name={`option${index + 1}`}
                                        onChange={(e) => handleCheckboxChange(e, filteredAvailabilityItem)}
                                    />
                                    {`${filteredAvailabilityItem.date}, ${filteredAvailabilityItem.time}`}
                                </div>
                            ))}
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

    const addAvailibility = async (date: string, time: string) => {
        if (selectedDate === null) {
            console.error("Selected date is null. Cannot add entry.");
            return;
        }

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
                    .then(output => {
                        getAvailabilityFromDB();
                        getEntriesFromDB();
                        console.log(output.Attributes)
                    })
                    .catch(console.error);
                window.alert("Datum toegevoegt.");
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

                </div>
            )}
            <form
                onSubmit={e => {
                    e.preventDefault();
                    const date = (e.target as HTMLFormElement).elements.namedItem('date') as HTMLInputElement;
                    const time = (e.target as HTMLFormElement).elements.namedItem('time') as HTMLInputElement;
                    addAvailibility(date.value, time.value);
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
            <form
                onSubmit={e => {
                    e.preventDefault();
                    const selectedDate = (e.target as HTMLFormElement).elements.namedItem('date') as HTMLInputElement;
                    const pattern = (e.target as HTMLFormElement).elements.namedItem('pattern') as HTMLSelectElement;

                    // Ensure pattern is of type 'weekday' | 'weekend' | 'daily'
                    const patternValue = pattern.value as 'weekday' | 'weekend' | 'daily';

                    // Now pass the asserted patternValue to addMultipleDays
                    addMultipleDays(selectedDate, "heele dag", patternValue);
                }}
            >
                <div>
                    <br></br>
                    <b>Meerdere dagen</b>
                    <br></br>
                    <label>Datum</label>
                    <input type="date" name="date" />
                    <br></br>
                    <label>Select Pattern:</label>
                    <select name="pattern">
                        <option value="weekday">Door de weeks</option>
                        <option value="weekend">Weekend</option>
                        <option value="daily">Elke Dag</option>
                    </select>
                    <br></br>
                    <button type="submit">meerdere dagen</button>
                </div>
            </form>

        </div >
    );
};

export default Cal;
