import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';

function DateForm({ updateDate, updateFields }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dateOptions, setDateOptions] = useState<Array<Date>>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [showMoreDates, setShowMoreDates] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isValidDate, setIsValidDate] = useState(true);

    useEffect(() => {
        const generateDateOptions = () => {
            const options: Array<Date> = [];
            for (let i = 0; i < 7; i++) {
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
        console.log("selected date is " + selectedDate);

        const isValid = selectedDate >= currentDate;
        console.log("is valid date " + isValid);
        setIsValidDate(isValid);

        if (isValid) {
            const isoDateString = selectedDate.toISOString();
            setSelectedCard(index === selectedCard ? null : index);
            updateDate(selectedDate);
            updateFields({ date: isoDateString });
        }
    };

    const handleCalendarDateSelect = (isoDateString: string) => {
        const selectedDate = new Date(isoDateString);
        const isValid = selectedDate >= currentDate;
        setIsValidDate(isValid);

        if (isValid) {
            updateDate(selectedDate);
            updateFields({ date: isoDateString });
        }
    };

    const handleMoreDatesClick = () => {
        setShowMoreDates(true);
    };

    const handleLessDatesClick = () => {
        setShowMoreDates(false);
    };

    return (
        <div className="dateForm_wrapper">
            <h2>Wanneer moet de klus gedaan worden</h2>
            {showMoreDates ? (
                <div data-testid="calendar">
                    <Calendar />
                    <button onClick={handleLessDatesClick} className="close-calendar-button" data-testid="close-calendar">X</button>
                </div>
            ) : (
                <div className="dateCards_wrapper">
                    {dateOptions.map((date, index) => (
                        <div
                            key={index}
                            className={`dateCards ${index === selectedCard ? 'selected' : ''}`}
                            onClick={() => handleCardClick(index)}
                            data-testid={`date-card-${index}`}
                        >
                            <p className="dateCards_info">
                                {index === 0 ? 'Vandaag' : index === 1 ? 'Morgen' : date.toLocaleDateString('nl-NL', { weekday: 'long' })}
                            </p>
                            <p className="dateCards_info number" data-testid={`date-number-${index}`}>{date.getDate()}</p>
                            {/* {index === 0 && <p className="dateCards_info" data-testid="fastest-option">snelste optie</p>} */}
                        </div>
                    ))}
                    <div className="dateCards" onClick={handleMoreDatesClick} data-testid="more-dates">
                        <p className="dateCards_info">Meer datums</p>
                    </div>
                </div>
            )}

            {!isValidDate && (
                <p className="error-message" data-testid="error-message">Voer alstublieft een geldige datum in</p>
            )}
        </div>
    );
}

export default DateForm;
