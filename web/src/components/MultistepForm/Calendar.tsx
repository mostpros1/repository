import React, { useState } from 'react';
import { ToggleButton, Button, Grid, Typography } from '@mui/material';

function AvailabilitySelector() {
    const [selectedDays, setSelectedDays] = useState({});
    const daysOfWeek = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'];

    const handleDayToggle = (day) => {
        setSelectedDays(prev => {
            if (prev.hasOwnProperty(day)) {
                const newState = { ...prev };
                delete newState[day]; // Verwijder de gedeselecteerde dag
                return newState;
            } else {
                // Initialiseer met start- en eindtijden
                return { ...prev, [day]: { start: '', end: '' } };
            }
        });
    };

    const handleTimeChange = (day, type, event) => {
        const newTime = event.target.value;
        setSelectedDays(prev => ({
            ...prev,
            [day]: { ...prev[day], [type]: newTime }
        }));
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
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    width: '110px',
                                    marginBottom: '5px',
                                    marginTop: '20px',
                                    transition: 'ease 0.5s',
                                    border: 'solid 3px rgb(18, 114, 232)',
                                    backgroundColor: selectedDays.hasOwnProperty(day) ? 'rgb(18, 114, 232)' : 'rgb(18, 114, 232)',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: 'rgb(18, 114, 232)',
                                        color: 'white',
                                        border: '0',
                                    }
                                }}
                            >
                                {day}
                            </ToggleButton>
                            {selectedDays.hasOwnProperty(day) && (
                                <>
                                    <p>Vanaf:</p>
                                    <input
                                        type="time"
                                        value={selectedDays[day].start}
                                        onChange={(e) => handleTimeChange(day, 'start', e)}
                                        style={{ width: '100px', fontSize: '14px', margin: '5px 0' }}
                                    />
                                    <p>Tot:</p>
                                    <input
                                        type="time"
                                        value={selectedDays[day].end}
                                        onChange={(e) => handleTimeChange(day, 'end', e)}
                                        style={{ width: '100px', fontSize: '14px', margin: '5px 0' }}
                                    />
                                </>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AvailabilitySelector;
