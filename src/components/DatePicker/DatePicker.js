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
  const [chosenDate, setChosenDate] = useState({[new Date(year, month, day)]: { am: true, pm: true }})

  // React.useEffect(() => {
  //   setChosenDate({[new Date(year, month, day)]: { am: true, pm: true }})
  // }, [])

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
      setChosenDate({...chosenDate, [day]: timeRes})
    } else {
      const newChosenDate = Object.keys(chosenDate)
        .filter((k) => k.toString() !== day.toString())
        .reduce((a, k) => ({ ...a, [k]: chosenDate[k] }), {});

      setChosenDate(newChosenDate)
    }
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
        const isSelected = !!Object.keys(chosenDate).find(
          // eslint-disable-next-line no-loop-func
          date => date.toString() === day.toString()
        )
        formattedDate = format(day, dateFormat)
        const cloneDay = day

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
                onClick={e => handleChangeTime(e, cloneDay)}
                checked={chosenDate[day] ? chosenDate[day].am : false}
              />
              <input
                type="checkbox"
                name="pm"
                onClick={e => handleChangeTime(e, cloneDay)}
                checked={chosenDate[day] ? chosenDate[day].pm : false}
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
    const _chosen = Object.keys(chosenDate)
    if (
      !_chosen.some(c => c.toString() === day.toString())
    ) {
      setChosenDate({...chosenDate, [day]: { am: true, pm: true }})
    } else {
      const newChosenDate = Object.keys(chosenDate)
        .filter((k) => k.toString() !== day.toString())
        .reduce((a, k) => ({ ...a, [k]: chosenDate[k] }), {});

      setChosenDate(newChosenDate)
    }
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  return (
    <div className="cui-calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}

export default Calendar
