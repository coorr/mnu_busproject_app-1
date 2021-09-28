import React from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import dayjs from 'dayjs';

export function Calendars() {
  return (
    <div>
      <Calendar
        calendarType="US"
        showNeighboringMonth={false}
        formatDay={(locale, date) => dayjs(date).format('DD')}
        view="month"
      />
    </div>
  );
}

export default Calendar;
