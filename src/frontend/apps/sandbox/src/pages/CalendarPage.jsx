import React, { useState } from 'react';
import { Calendar } from '../components/Calendar';

const isValidDate = (d) => {
  if (Object.prototype.toString.call(d) === '[object Date]') {
    // it is a date
    if (isNaN(d.getTime())) {
      // d.valueOf() could also work
      // date is not valid
      return false;
    } else {
      // date is valid
      return true;
    }
  } else {
    // not a date
    return false;
  }
};

export const CalendarPage = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [day, setDay] = useState(now.getDate());
  const [selectedDate, setSelectedDate] = useState(now);

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date(year, month, day);
    if (isValidDate(date)) {
      setSelectedDate(date);
    } else {
      alert('Invalid date');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Year <input type="text" value={year} onChange={({ target: { value } }) => setYear(parseInt(value))} />
          </label>
          <label>
            Month
            <input
              type="text"
              value={month + 1}
              onChange={({ target: { value } }) => setMonth(parseInt(value) - 1)}
            />{' '}
          </label>
          <label>
            Day
            <input type="text" value={day} onChange={({ target: { value } }) => setDay(parseInt(value))} />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      <Calendar selectedDate={selectedDate} />
    </>
  );
};
