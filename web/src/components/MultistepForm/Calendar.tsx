import React from 'react'
import { DateCalendar, DateCalendarProps } from '@mui/x-date-pickers'

type CustomCalendarProps = DateCalendarProps<Date>;

interface CalendarProps extends CustomCalendarProps {
    onDateSelect: (date: string) => void;
}

function Calendar({ onDateSelect, ...otherProps }: CalendarProps) {

    const handleCalendarDateSelect = (date: Date) => {
        const isoDateString = date.toISOString();
        onDateSelect(isoDateString);
    };
    return (   
        <DateCalendar 
            onChange={handleCalendarDateSelect}
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
                // Calendar days grid
                '& .MuiDayCalendar-header': {
                    gap: 1,
                },
                // Calendar days
                '& .MuiDayCalendar-weekDayLabel': {
                    fontSize: 20,
                },
                // Calendar number grid
                '& .MuiDayCalendar-weekContainer': {
                    gap: 1,
                },
                // Calendar numbers
                '& .MuiPickersDay-root': {
                    fontSize: 20,
                    lineHeight: 0,
                    letterSpacing: 0,
                },
            }}
            {...otherProps}
        />
    )
}

export default Calendar