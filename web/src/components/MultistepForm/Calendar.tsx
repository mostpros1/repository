import React from 'react'
import { DateCalendar } from '@mui/x-date-pickers'

function Calendar() {
    return (   
        <DateCalendar 
            showDaysOutsideCurrentMonth
            sx={{
                // Calender icons
                '& .MuiSvgIcon-root': {
                    fontSize: 20,
                },
                // Top Calender
                '& .MuiPickersCalendarHeader-label': {
                    fontSize: 20,
                },
                // Calender days
                '& .MuiDayCalendar-weekDayLabel': {
                    fontSize: 25,
                },
                // Calender numbers
                '& .MuiPickersDay-root': {
                    fontSize: 20,
                },
            }}
        />
    )
}

export default Calendar