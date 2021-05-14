import React, { useState, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import DateRangeIcon from '@material-ui/icons/DateRange'
import {
  DatePicker,
  MuiPickersUtilsProvider,
  StaticDateRangePicker,
} from '@material-ui/pickers'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import DateFnsUtils from '@date-io/date-fns'

import { utils } from '../../utils'

import './styles.scss'

const SearchInput = ({ onSearch, placeholder }) => {
  const [openDatePicker, setOpen] = useState(false)
  const [date, changeDate] = useState()
  const [searchKey, setSearchKey] = useState(date)
  const [selectedDays, setSelectedDays] = useState([])

  const handleSearch = ({ target: { value } }) => {
    setSearchKey(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleOpenDatePicker = () => {
    setOpen(!openDatePicker)
  }

  const handleRemoveSearchKey = () => {
    setSearchKey('')
    setSelectedDays([])
    if (onSearch) {
      onSearch('')
    }
  }

  const handleDayClick = (day, { selected }) => {
    const selectedDates = selectedDays.concat()
    if (selected) {
      const selectedIndex = selectedDates.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      )
      selectedDates.splice(selectedIndex, 1)
    } else {
      selectedDates.push(day)
    }
    onSearch(selectedDates)
    setSelectedDays(selectedDates)
  }

  const handleDateChange = day => {
    changeDate(day)
    setOpen(false)
    if (onSearch) {
      onSearch(day)
    }
  }

  useEffect(() => {
    // setSearchKey(utils.convertToLongDate(date))
    setSearchKey(selectedDays.map(date => utils.convertToLongDate(date)))
  }, [date, selectedDays])

  return (
    <div className="cui-search">
      <input
        className="cui-search__input"
        type="text"
        placeholder={placeholder}
        value={searchKey}
        onChange={handleSearch}
      />
      <SearchIcon className="icon-search" />
      <CloseIcon className="icon-remove" onClick={handleRemoveSearchKey} />
      <div className="cui-search__calendar" onClick={handleOpenDatePicker}>
        <DateRangeIcon className="icon-calendar" />
      </div>
      {openDatePicker && (
        // <MuiPickersUtilsProvider utils={DateFnsUtils}>
        //   <DatePicker
        //     autoOk
        //     orientation="landscape"
        //     variant="static"
        //     value={date}
        //     onChange={handleDateChange}
        //   />
        // </MuiPickersUtilsProvider>
        <DayPicker selectedDays={selectedDays} onDayClick={handleDayClick} />
      )}
    </div>
  )
}

export default SearchInput
