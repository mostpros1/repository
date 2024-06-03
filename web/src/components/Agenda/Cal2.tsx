import React, { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import { Auth } from 'aws-amplify';
import './DatePicker.css';
import Next from './arrowR.png';
import Prev from './arrowL.png';
import { dynamo } from '../../../declarations.ts';
import { Checkbox } from '@mui/material';
import "./Cal2.css";

interface DateAndTimePickerProps {
    // onDateChange?: (selectedDates: string[]) => void;
}

interface Availability {
    date: string;
    time: string;
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = ({ /* onDateChange */ }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [entries, setEntries] = useState<{ [date: string]: { text: string, time: string, color: string }[] }>({});
    const [availability, setAvailability] = useState<{ date: string, time: string }[]>([]);
    //const [selectedOptions, setSelectedOptions] = useState("");
    const [checkedItems, setCheckedItems] = useState<{ date: string; time: string; }[]>([]);
    const [uncheckedItems, setUncheckedItems] = useState<{ date: string; time: string; }[]>([]);

    const today = new Date();
    const [date, setDate] = useState(today);
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleDateSelect = (_day: number, date: Date) => {
        const dateString = date.toISOString().split('T')[0];
        today.setDate(today.getDate() - 1);
        if (date < today) return; // Voorkomt selectie van vorige dagen

        setSelectedDates([dateString]);
        const dateToAddOneDay = new Date(dateString);
        dateToAddOneDay.setDate(dateToAddOneDay.getDate() + 1);
        setSelectedDate(dateToAddOneDay);
        if (selectedDates.length === 1 && selectedDates[0] === dateString) {
            // Als de enige geselecteerde datum de datum is die net gedeselecteerd werd
            setSelectedDay(null); // Zet selectedDay op null
        }
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


        const item = {
            prof_email: "1",
            dates: selectedDates, // Dit is de lijst van geselecteerde datums
        };

        const params = {
            TableName: "UserAvailability",
            Item: item, // Use the 'item' object instead of creating a new one
        };

        try {
            await dynamo.put(params).promise();
            alert("Beschikbaarheid succesvol opgeslagen!");
        } catch (error) {
            console.error("Er is een fout opgetreden bij het opslaan: ", error);
            alert("Fout bij het opslaan van beschikbaarheid.");
        }
    };

    const yearsOptions = Array.from({ length: 11 }, (_, i) => currentYear + i);

    // Function to handle year and month change
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = parseInt(e.target.value, 10);
        const monthElement = document.getElementById('month-select') as HTMLSelectElement;
        if (monthElement) {
            const month = parseInt(monthElement.value, 10) - 1; // Subtract 1 because JS months are 0-indexed
            setDate(new Date(year, month, 1));
        } else {
            console.error('Element with ID "month-select" not found.');
        } // Subtract 1 because JS months are 0-indexed
        // Set the date to the first day of the selected month/year
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
                const baseDate = startDateValue; // Now baseDate is a Date object

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
        setCheckedItems([]);
    };

    const DeleteMultipleDays = async (startDate: HTMLInputElement, pattern: 'weekday' | 'weekend' | 'daily') => {
        // Convert startDate.value to a Date object
        const startDateValue = new Date(startDate.value);

        // Calculate the total number of days in the month
        const year = startDateValue.getFullYear();
        const month = startDateValue.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Get the authenticated user's email
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const email = authenticatedUser.attributes.email;

        // Query the Professionals table to find the user's record
        dynamo.query({
            TableName: "Professionals",
            IndexName: "emailIndex",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            }
        }).promise().then(async (data) => {
            if (data.Items && data.Items.length > 0) {
                const userId = data.Items[0].id;
                const existingAvailability = data.Items[0].availability || [];

                // Determine the starting point based on the pattern
                const baseDate = new Date(startDateValue);
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

                // Construct the new availability list by removing the dates added based on the pattern
                const updatedAvailability = existingAvailability.filter(item => {
                    const itemDate = new Date(item.date);
                    let skip = false;
                    for (let a = 0; a < daysInMonth; a++) {
                        const currentDate = new Date(baseDate);
                        currentDate.setDate(baseDate.getDate() + a);

                        // Skip weekends for 'weekday' pattern
                        if (pattern === 'weekday' && (currentDate.getDay() === 0 || currentDate.getDay() === 6)) continue;

                        // Skip weekdays for 'weekend' pattern
                        if (pattern === 'weekend' && (currentDate.getDay() >= 1 && currentDate.getDay() <= 5)) continue;

                        if (itemDate.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]) {
                            skip = true;
                            break;
                        }
                    }
                    return !skip;
                });

                // Update the user's record in the Professionals table
                dynamo.update({
                    TableName: "Professionals",
                    Key: {
                        id: userId,
                    },
                    UpdateExpression: "SET #av = :val",
                    ExpressionAttributeNames: {
                        "#av": "availability"
                    },
                    ExpressionAttributeValues: {
                        ":val": updatedAvailability
                    }
                }).promise()
                    .then(output => {
                        getAvailabilityFromDB(); // Refresh the availability data
                        console.log("Deleted days successfully.", output.Attributes);
                    })
                    .catch(error => {
                        console.error("Failed to delete days:", error);
                    });
            } else {
                console.error("No user found with the provided email.");
            }
        }).catch((err) => {
            console.error(err);
        });
    };

    const addAvailibility = async (date: string, time: string) => {

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

    const firstDate = new Date(selectedDates[0]);
    firstDate.setDate(firstDate.getDate() + 1); // Adjust the date to the previous day

    const vandaag = new Date(today);
    vandaag.setHours(12);
    let dateKey = format(vandaag, 'yyyy-MM-dd');

    if (firstDate && isValid(firstDate)) {
        dateKey = format(firstDate, 'yyyy-MM-dd');
        // Proceed with formattedDate
    }

    return (
        <div className="date-time-picker">
            <div className="calendar">
                <div className="month-selector">
                    <button type="button" className='prev-month' onClick={handlePrevMonth}><img src={Prev} className='fotoinButtonL' /></button>
                    <button type="button" onClick={handleCurrentMonth} className='buttonToday'>Today</button> {/* Voeg deze regel toe */}
                    <div className='select-month-and-year'>
                        <select id="year-select" value={currentYear} onChange={handleChange}>
                            {yearsOptions.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <select id="month-select" value={currentMonth + 1} onChange={handleChange}>
                            {months.map((month, index) => (
                                <option key={index} value={index + 1}>{month}</option>
                            ))}
                        </select>
                    </div>
                    <button type="button" className='next-month' onClick={handleNextMonth}><img src={Next} className='fotoinButtonR' /></button>
                </div>
                <div className="week-days">
                    {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map(day => (
                        <div key={day}>{day}</div>
                    ))}
                </div>
                <div className="week">
                    {renderCalendar()}
                </div>
            </div>

            <div className="container">
                <div className="left-section">
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

                            setSelectedDate(new Date(date.value));
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

                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            const selectedDate = (e.target as HTMLFormElement).elements.namedItem('date') as HTMLInputElement;
                            const pattern = (e.target as HTMLFormElement).elements.namedItem('pattern') as HTMLSelectElement;

                            // Ensure pattern is of type 'weekday' | 'weekend' | 'daily'
                            const patternValue = pattern.value as 'weekday' | 'weekend' | 'daily';

                            // Call the function to delete multiple days based on the selected pattern
                            DeleteMultipleDays(selectedDate, patternValue);
                        }}
                    >
                        <div>
                            <br></br>
                            <b>Verwijder Meerdere Dagen</b>
                            <br></br>
                            <label>Date:</label>
                            <input type="date" name="date" />
                            <br></br>
                            <label>Select Pattern:</label>
                            <select name="pattern">
                                <option value="weekday">Door de weeks</option>
                                <option value="weekend">Weekend</option>
                                <option value="daily">Elke Dag</option>
                            </select>
                            <br></br>
                            <button type="submit">Verwijder Meerdere Dagen</button>
                        </div>
                    </form>
                </div>
                <div className="right-section">
                    <div className="dropdown">
                        <form onSubmit={handleSubmit}>
                            Verwijder Beschikbaarheid<br></br>
                            {availability
                                .filter(availabilityItem => availabilityItem.date === dateKey)
                                .map((filteredAvailabilityItem, index) => (
                                    <div key={index}>
                                        <Checkbox
                                            //type="checkbox"
                                            name={`delete-date-${index}`}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setCheckedItems([...checkedItems, filteredAvailabilityItem]);
                                                } else {
                                                    // Compare both date and time for uniqueness
                                                    setCheckedItems(checkedItems.filter(item => item.date !== filteredAvailabilityItem.date || item.time !== filteredAvailabilityItem.time));
                                                }
                                            }} />
                                        <label htmlFor={`delete-date-${filteredAvailabilityItem.date}`}>
                                            {filteredAvailabilityItem.date} om {filteredAvailabilityItem.time}
                                        </label>
                                    </div>
                                ))}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default DateAndTimePicker;