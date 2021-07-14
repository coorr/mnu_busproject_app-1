import React from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

export function Calendars() {
  return (
    <div>
      <Calendar calendarType="US" showNeighboringMonth={false} />
    </div>
  );
}

export default Calendar;
