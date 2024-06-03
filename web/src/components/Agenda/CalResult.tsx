import React, { useState } from 'react';
import './CalResult.css';
import { Checkbox } from '@mui/material';


function CalResult() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [entries, setEntries] = useState<{ [date: string]: { text: string, time: string, color: string }[] }>({});
    //const [selectedOptions, setSelectedOptions] = useState("");
    const [checkedItems, setCheckedItems] = useState<{ date: string; time: string; }[]>([]);
    const [uncheckedItems, setUncheckedItems] = useState<{ date: string; time: string; }[]>([]);
    const [availability, setAvailability] = useState<{ date: string, time: string }[]>([]);
    const [professionalId, setProfessionalId] = useState<number | null>(null);

    return (

        <section className='DateResultsCal'>
            <article className='formContainerResultDateCal'>
                <form>
                    Verwijder Beschikbaarheid<br></br>
                    {availability
                        // .filter(availabilityItem => availabilityItem.date === dateKey)
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
            </article>
        </section>
    );
}

export default CalResult;
