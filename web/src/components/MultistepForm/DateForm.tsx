import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';

function DateForm({ updateDate, updateFields }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dateOptions, setDateOptions] = useState<Array<Date>>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [showMoreDates, setShowMoreDates] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        const generateDateOptions = () => {
            const options: Array<Date> = [];
            for (let i = 0; i < 5; i++) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() + i);
                options.push(date);
            }
            setDateOptions(options);
        };

        generateDateOptions();

    }, [currentDate]);

    const handleCardClick = (index: number) => {
        const selectedDate = dateOptions[index];
        const isoDateString = selectedDate.toISOString();
        setSelectedCard(index === selectedCard ? null : index);
        updateDate(selectedDate);
        updateFields({ date: isoDateString });
    };

    const handleCalendarDateSelect = (isoDateString: string) => {
        const selectedDate = new Date(isoDateString);
        updateDate(selectedDate);
        updateFields({ date: isoDateString });
    };

    const handleMoreDatesClick = () => {
        setShowMoreDates(true); // Zet showMoreDates op true om de Calendar te laten zien
    };

    return (
        <div className="dateForm_wrapper">
            <h2>Wanneer moet de klus gedaan worden</h2>
            {showMoreDates ? (
                <Calendar onDateSelect={handleCalendarDateSelect} />
            ) : (
                <div className="dateCards_wrapper">
                    {dateOptions.map((date, index) => (
                        <div
                            key={index}
                            className={`dateCards ${index === selectedCard ? 'selected' : ''}`}
                            onClick={() => handleCardClick(index)}
                        >
                            <p className="dateCards_info">
                                {index === 0 ? 'Vandaag' : index === 1 ? 'Morgen' : date.toLocaleDateString('nl-NL', { weekday: 'long' })}
                            </p>
                            <p className="dateCards_info number">{date.getDate()}</p>
                            {index === 0 && <p className="dateCards_info">snelste optie</p>}
                        </div>
                    ))}
                    <div className="dateCards" onClick={handleMoreDatesClick}>
                        <p className="dateCards_info">Meer datums</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DateForm;
