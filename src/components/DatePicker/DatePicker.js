import React, { useState } from 'react'
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  addMonths,
  subMonths,
} from 'date-fns'

import './styles.scss'

const Calendar = () => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  const day = new Date().getDate()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState([new Date(year, month, day)])
  const [checkedTime, setChecked] = useState({
    [new Date(year, month, day)]: { am: true, pm: true },
  })

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy'

    return (
      <div className="cui-calendar__row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            {'<'}
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">{'>'}</div>
        </div>
      </div>
    )
  }

  const renderDays = () => {
    const dateFormat = 'EE'
    const days = []

    let startDate = startOfWeek(currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }

    return <div className="cui-calendar__days row">{days}</div>
  }

  const handleChangeTime = e => {
    e.stopPropagation()
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const dateFormat = 'd'
    const rows = []

    let days = []
    let day = startDate
    let formattedDate = ''
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isSelected = !!selectedDate.find(
          // eslint-disable-next-line no-loop-func
          date => format(date, 'dd/MM/yyyy') === format(day, 'dd/MM/yyyy')
        )
        formattedDate = format(day, dateFormat)
        const cloneDay = day
        console.log(checkedTime[day])
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSelected
                ? 'selected'
                : ''
            }`}
            key={day}
            onClick={e => onDateClick(e, cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <div>
              <input
                type="checkbox"
                name="am"
                // eslint-disable-next-line no-loop-func
                onClick={e => handleChangeTime(e, day)}
                checked={checkedTime[day] && checkedTime[day].am}
              />
              <input
                type="checkbox"
                name="pm"
                onClick={handleChangeTime}
                checked={checkedTime[day] && checkedTime[day].pm}
              />
            </div>
          </div>
        )

        day = addDays(day, 1)
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = []
    }
    return <div className="cui-calendar__body">{rows}</div>
  }

  const onDateClick = (e, day) => {
    e.preventDefault()
    let _chosen = [...selectedDate]
    if (
      !_chosen.some(c => format(c, 'dd/MM/yyyy') === format(day, 'dd/MM/yyyy'))
    ) {
      _chosen.push(day)
    } else {
      _chosen = _chosen.filter(
        c => format(c, 'dd/MM/yyyy') !== format(day, 'dd/MM/yyyy')
      )
    }

    setSelectedDate(_chosen)
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  React.useEffect(() => {
    const checkedTime = selectedDate.reduce((r, date) => {
      r[date] = { am: true, pm: true }
      return r
    }, {})
    setChecked(checkedTime)
  }, [selectedDate])

  return (
    <div className="cui-calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}

export default Calendar
