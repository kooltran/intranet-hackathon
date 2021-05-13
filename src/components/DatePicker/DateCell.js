import React, { useState, useEffect } from 'react'
import { format, startOfMonth, isSameMonth } from 'date-fns'

const DateCell = ({
  chosenDate,
  handleChangeTime,
  onDateClick,
  currentMonth,
  day,
}) => {
  const cloneDay = day
  const monthStart = startOfMonth(currentMonth)
  const isSelected = !!Object.keys(chosenDate).find(
    date => date.toString() === day.toString()
  )
  const formattedDate = format(day, 'd')
  const [checkedStatus, setCheckedStatus] = useState({})

  useEffect(() => {
    if (chosenDate[day]) {
      setCheckedStatus(chosenDate[day])
    } else {
      setCheckedStatus({})
    }
  }, [chosenDate, day])

  return (
    <div
      className={`col cell ${
        !isSameMonth(day, monthStart)
          ? 'disabled'
          : isSelected
          ? 'selected'
          : ''
      }`}
      onClick={e => onDateClick(e, cloneDay)}
    >
      <span className="number">{formattedDate}</span>
      <div>
        <input
          type="checkbox"
          name="am"
          onClick={e => handleChangeTime(e, cloneDay)}
          checked={checkedStatus.am}
        />
        <input
          type="checkbox"
          name="pm"
          onClick={e => handleChangeTime(e, cloneDay)}
          checked={checkedStatus.pm}
        />
      </div>
    </div>
  )
}

export default DateCell
