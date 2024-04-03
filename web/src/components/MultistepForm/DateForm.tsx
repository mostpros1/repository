import React, { useState, useEffect, useCallback } from 'react';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';

interface DateFormProps {
  updateDate: (date: Date) => void;
  updateFields: (fields: { date: string }) => void;
}

// Functie buiten de component om datums te genereren om de component schoon te houden
const generateDateOptions = (currentDate: Date): Date[] => {
  return Array.from({ length: 5 }, (_, i) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + i);
    return newDate;
  });
};

const DateForm: React.FC<DateFormProps> = ({ updateDate, updateFields }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [dateOptions, setDateOptions] = useState<Date[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showMoreDates, setShowMoreDates] = useState<boolean>(false);
  const [isValidDate, setIsValidDate] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setDateOptions(generateDateOptions(currentDate));
  }, [currentDate]);

  const handleCardClick = useCallback((index: number) => {
    const selectedDate = dateOptions[index];
    const isValid = selectedDate >= currentDate;
    setIsValidDate(isValid);

    if (isValid) {
      const isoDateString = selectedDate.toISOString();
      setSelectedCard(index === selectedCard ? null : index);
      updateDate(selectedDate);
      updateFields({ date: isoDateString });
    }
  }, [currentDate, dateOptions, selectedCard, updateDate, updateFields]);

  const handleCalendarDateSelect = useCallback((isoDateString: string) => {
    const selectedDate = new Date(isoDateString);
    const isValid = selectedDate >= currentDate;
    setIsValidDate(isValid);

    if (isValid) {
      updateDate(selectedDate);
      updateFields({ date: isoDateString });
    }
  }, [currentDate, updateDate, updateFields]);

  const handleMoreDatesClick = () => setShowMoreDates(true);
  const handleCloseCalendar = () => setShowMoreDates(false);

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
                {index === 0 ? 'Vandaag' : index === 1 ? 'Morgen' : date.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
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
