import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';

interface DateFormProps {
  updateDate: (date: Date) => void;
  updateFields: (fields: { date: string }) => void;
}

const DateForm: React.FC<DateFormProps> = ({ updateDate, updateFields }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [dateOptions, setDateOptions] = useState<Date[]>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [showMoreDates, setShowMoreDates] = useState<boolean>(false);
    const [isValidDate, setIsValidDate] = useState<boolean>(true); // Toegevoegde state voor de datumvalidatie
    const navigate = useNavigate();

    useEffect(() => {
        const generateDateOptions = () => {
            const options: Date[] = [];
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
        const isValid = selectedDate >= currentDate;
        setIsValidDate(isValid); // Update de validatiestatus op basis van de geselecteerde datum

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
        setIsValidDate(isValid); // Update de validatiestatus op basis van de geselecteerde datum

        if (isValid) {
            updateDate(selectedDate);
            updateFields({ date: isoDateString });
        }
    };

    const handleMoreDatesClick = () => {
        setShowMoreDates(true);
    };

    const handleCloseCalendar = () => {
        setShowMoreDates(false);
    };

    return (
        <div className="dateForm_wrapper">
            <h2>Wanneer moet de klus gedaan worden?</h2>
            {showMoreDates ? (
                <div>
                    <button onClick={handleCloseCalendar} className="close-calendar-button">X</button>
                    <Calendar onDateSelect={handleCalendarDateSelect} />
                </div>
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
            
            {!isValidDate && (
                <p className="error-message">Voer alstublieft een geldige datum in.</p>
            )}
        </div>
    );
};

export default DateForm;
