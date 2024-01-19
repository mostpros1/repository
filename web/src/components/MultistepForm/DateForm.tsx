import React, { useState, useEffect } from 'react';

function DateForm({ updateDate }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dateOptions, setDateOptions] = useState<Array<Date>>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

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

        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
            generateDateOptions();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [currentDate]);

    const handleCardClick = (index: number) => {
        setSelectedCard(index === selectedCard ? null : index);
        const selectedDate = dateOptions[index];
        updateDate(selectedDate);
        console.log('Selected card:', selectedDate);
      };    

    return (
        <div className="dateForm_wrapper">
            <h2>Wanneer moet de klus gedaan worden</h2>
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
                <div className="dateCards">
                    <p className="dateCards_info">Meer datums</p>
                </div>
            </div>
        </div>
    );
}

export default DateForm;
