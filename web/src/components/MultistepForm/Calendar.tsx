import React from 'react'
import { DateCalendar } from '@mui/x-date-pickers'

function Calendar() {
    return (   
        <DateCalendar 
            showDaysOutsideCurrentMonth
            sx={{
                // Calendar icons
                '& .MuiSvgIcon-root': {
                    fontSize: 20,
                },
                // Top Calendar
                '& .MuiPickersCalendarHeader-label': {
                    fontSize: 20,
                },
                // Calendar days
                '& .MuiDayCalendar-weekDayLabel': {
                    fontSize: 25,
                },
                // Calendar numbers
                '& .MuiPickersDay-root': {
                    fontSize: 20,
                },
            }}
        />
    )
}

export default Calendar