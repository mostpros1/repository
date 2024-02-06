import React, { useState } from 'react';
import { ToggleButton, Button, Grid, Typography } from '@mui/material';

function AvailabilitySelector() {
    const [selectedDays, setSelectedDays] = useState({});
    const daysOfWeek = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'];

    const handleDayToggle = (day) => {
        setSelectedDays(prev => {
            if (prev.hasOwnProperty(day)) {
                // Kopieer de huidige state, behalve de gedeselecteerde dag
                const newState = { ...prev };
                delete newState[day]; // Verwijder de gedeselecteerde dag
                return newState;
            } else {
                // Voeg de geselecteerde dag toe met een lege tijd
                return { ...prev, [day]: '' };
            }
        });
    };

    const handleTimeChange = (event, day) => {
        const time = event.target.value;
        setSelectedDays(prev => ({
            ...prev,
            [day]: time
        }));
    };

    const handleSubmit = () => {
        console.log('Geselecteerde dagen en tijden:', selectedDays);
        // Verwerk de geselecteerde dagen en tijden zoals nodig
    };

    return (
        <Grid container spacing={2} direction="column">
            <Grid item>
                <Typography variant="h4">Selecteer uw beschikbare dagen en tijden</Typography>
                <Grid container spacing={1}>
                    {daysOfWeek.map(day => (
                        <Grid key={day} item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ToggleButton
                                value={day}
                                selected={selectedDays.hasOwnProperty(day)}
                                onChange={() => handleDayToggle(day)}
                                sx={{
                                    height: '36px', 
                                    fontSize: '16px', // Maak de tekst groter
                                    fontWeight: 'bold', // Maak de tekst vetgedrukt
                                    width: '100px', 
                                    marginBottom: '5px',
                                    marginTop: '20px',
                                    border: 'solid 3px rgb(18, 114, 232)',
                                    backgroundColor: selectedDays.hasOwnProperty(day) ? 'rgb(18, 114, 232)' : 'rgb(18, 114, 232)', // Donkerblauwe achtergrond voor geselecteerde dagen
                                    color: 'white', // Witte tekst
                                    '&:hover': {
                                    backgroundColor: 'lightgrey', // Donkerblauw ook bij hover
                                    color: 'black',
                                    
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'darkblue', // Zorg ervoor dat de geselecteerde toestand donkerblauw blijft
                                        color: 'white',
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: 'darkblue', // Consistent donkerblauw bij hover over geselecteerde
                                        color: 'white',
                                    }
                                }}
                                >
                                {day.substring(0, 2)}
                            </ToggleButton>
                            {selectedDays.hasOwnProperty(day) && (
                                <input
                                    type="time"
                                    value={selectedDays[day]}
                                    onChange={(e) => handleTimeChange(e, day)}
                                    style={{ width: '100px', fontSize: '12px' }}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AvailabilitySelector;
