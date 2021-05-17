import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import DateRangeIcon from '@material-ui/icons/DateRange'
import moment from 'moment'
import DayPicker, { DateUtils } from 'react-day-picker'

import { utils } from '../../utils'

import 'react-day-picker/lib/style.css'
import './styles.scss'

const SearchInput = ({ onSearch, placeholder }) => {
  const [openDatePicker, setOpen] = useState(false)
  const [searchKey, setSearchKey] = useState([])

  const initDateRange = { from: undefined, to: undefined }
  const [dateRange, setDateRange] = useState(initDateRange)
  const modifiers = { start: dateRange.from, end: dateRange.to }

  const isCompletedRange = range =>
    Object.values(range).every(item => item !== undefined)

  const renderInputValue = () => {
    if (Array.isArray(searchKey)) {
      if (isCompletedRange(dateRange)) {
        return `${utils.convertToLongDate(
          dateRange.from
        )} to ${utils.convertToLongDate(dateRange.to)}`
      } else {
        return ''
      }
    } else {
      return searchKey
    }
  }

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
    if (Array.isArray(searchKey)) {
      setSearchKey([])
      setDateRange(initDateRange)
      setOpen(false)
      if (onSearch) {
        onSearch([])
      }
    }

    if (typeof searchKey === 'string') {
      setSearchKey('')
      if (onSearch) {
        onSearch('')
      }
    }
  }

  const handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, dateRange)
    setDateRange(range)

    const selectedDaysRange = utils.enumerateDaysBetweenDates(
      moment(range.from),
      moment(range.to)
    )
    if (isCompletedRange(range)) {
      setOpen(false)
      setSearchKey(selectedDaysRange)
      if (onSearch) {
        onSearch(selectedDaysRange)
      }
    }
  }

  return (
    <div className="cui-search">
      <input
        className="cui-search__input"
        type="text"
        placeholder={placeholder}
        value={renderInputValue()}
        onChange={handleSearch}
      />
      <SearchIcon className="icon-search" />
      <CloseIcon className="icon-remove" onClick={handleRemoveSearchKey} />
      <div className="cui-search__calendar" onClick={handleOpenDatePicker}>
        <DateRangeIcon className="icon-calendar" />
      </div>
      {openDatePicker && (
        <DayPicker
          className="Selectable"
          selectedDays={[dateRange.from, dateRange]}
          modifiers={modifiers}
          onDayClick={handleDayClick}
        />
      )}
    </div>
  )
}

export default SearchInput
