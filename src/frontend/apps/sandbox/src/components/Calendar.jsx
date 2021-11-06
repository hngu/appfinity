import React, { useMemo } from 'react';
import styled from 'styled-components/macro';

const getDaysOfMonthYear = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

const buildGrid = (daysOfMonth) => {
  const grid = [];
  let row;
  daysOfMonth.forEach((date) => {
    if (row === undefined) {
      row = new Array(date.getDay()).fill('');
    }
    row.push(date);
    if (date.getDay() === 6) {
      grid.push(row);
      row = [];
    }
  });
  if (row.length > 0) {
    if (row.length < 7) {
      row = [...row, ...new Array(7 - row.length).fill('')];
    }
    grid.push(row);
  }

  return grid;
};

export const Calendar = ({ selectedDate }) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const day = selectedDate.getDate();

  const dateGrid = useMemo(() => buildGrid(getDaysOfMonthYear(year, month)), [year, month]);
  return (
    <div>
      <h3>{selectedDate.toLocaleString('default', { month: 'long' })}</h3>
      {dateGrid.map((row, index) => {
        return (
          <div key={index} style={{ display: 'flex' }}>
            {row.map((date, index) => {
              return (
                <CalendarGrid key={index} $hover={date !== ''}>
                  {date === '' ? null : date.getDate()}
                  {date !== '' && date.getDate() === day && '*'}
                </CalendarGrid>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const CalendarGrid = styled.div`
  width: 40px;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.$hover ? 'pointer' : 'default')};

  :hover {
    background-color: ${(props) => (props.$hover ? 'rgba(0, 0, 0, 0.3)' : 'none')};
  }
`;
