import React, { useState, useEffect } from 'react'
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  addMonths,
  subMonths,
  getYear,
} from 'date-fns'
import classNames from 'classnames'

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import { sortByMonth, convertToLongDate } from '../../utils/utils'
import DateCell from './DateCell'
import './styles.scss'

const Calendar = () => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  const day = new Date().getDate()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [rows, setRows] = useState([])
  const [months, setMonth] = useState([])
  const [showMonths, setShowMonths] = useState(false)
  const [chosenDate, setChosenDate] = useState({
    [new Date(year, month, day)]: { am: true, pm: true },
  })

  const handleShowMonths = () => {
    setShowMonths(!showMonths)
  }

  const handleChangeMonth = month => {
    setCurrentMonth(month)
    setShowMonths(false)
  }

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy'
    return (
      <div className="cui-calendar__row flex-middle">
        <div className="col col-start left-arrow">
          <div className="icon" onClick={prevMonth}>
            <NavigateBeforeIcon />
          </div>
        </div>
        <div className="col col-center month-title" onClick={handleShowMonths}>
          <span>{format(currentMonth, dateFormat)}</span>
          <div
            className={classNames('cui-calendar__months', { show: showMonths })}
          >
            <div className="months-content">
              {months.map(month => (
                <div
                  key={month}
                  className={classNames('col col-center month-item', {
                    selected:
                      format(month, 'LLL') === format(currentMonth, 'LLL'),
                  })}
                  onClick={() => handleChangeMonth(month)}
                >
                  {format(month, 'LLL')}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col col-end right-arrow" onClick={nextMonth}>
          <div className="icon">
            <NavigateNextIcon />
          </div>
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
        <div className="col col-center day-name" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }

    return <div className="cui-calendar__days row">{days}</div>
  }

  const handleChangeTime = (e, day) => {
    e.stopPropagation()
    const { name, checked } = e.target
    const initTime = chosenDate[day] ? Object.keys(chosenDate[day]) : []
    let time = [...initTime]
    if (checked) {
      time.push(name)
    } else {
      time = time.filter(t => t !== name)
    }
    const timeRes = time.reduce((r, t) => ({ ...r, [t]: true }), {})

    if (Object.keys(timeRes).length > 0) {
      setChosenDate({ ...chosenDate, [day]: timeRes })
    } else {
      const newChosenDate = Object.keys(chosenDate)
        .filter(k => k.toString() !== day.toString())
        .reduce((a, k) => ({ ...a, [k]: chosenDate[k] }), {})

      setChosenDate(newChosenDate)
    }
  }

  const renderBody = () => {
    return (
      <div className="cui-calendar__body">
        {rows.map((row, idx) => {
          return (
            <div key={idx} className="row">
              {row?.map(day => (
                <DateCell
                  key={day}
                  chosenDate={chosenDate}
                  handleChangeTime={handleChangeTime}
                  onDateClick={handleDayClick}
                  currentMonth={currentMonth}
                  day={day}
                />
              ))}
            </div>
          )
        })}
      </div>
    )
  }

  const handleDayClick = (e, day) => {
    e.preventDefault()
    const _chosen = Object.keys(chosenDate)
    if (!_chosen.some(c => c.toString() === day.toString())) {
      setChosenDate({ ...chosenDate, [day]: { am: true, pm: true } })
    } else {
      const newChosenDate = Object.keys(chosenDate)
        .filter(k => k.toString() !== day.toString())
        .reduce((a, k) => ({ ...a, [k]: chosenDate[k] }), {})

      setChosenDate(newChosenDate)
    }
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  useEffect(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const months = []

    const rows = []

    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(day)

        day = addDays(day, 1)
      }
      rows.push(days)
      days = []
    }

    setRows(rows)

    for (let i = 0; i < 12; i++) {
      months.push(addMonths(new Date(getYear(currentMonth), 0, 1), i))
    }
    sortByMonth(months)
    setMonth(months)
  }, [currentMonth])

  return (
    <>
      <div className="cui-calendar">
        {renderHeader()}
        {renderDays()}
        {renderBody()}
      </div>
      {Object.keys(chosenDate).map(date => {
        let time = ''

        if (Object.keys(chosenDate[date]).length === 2) {
          time = ''
        } else {
          time = `, ${Object.keys(chosenDate[date])[0].toUpperCase()}`
        }

        return (
          <div key={date}>
            <span>{convertToLongDate(date)}</span>
            <span>{time}</span>
          </div>
        )
      })}
    </>
  )
}

export default Calendar
