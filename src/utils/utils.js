import moment from 'moment'
import { format } from 'date-fns'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const sortBy = (arr, by, order = 'asc', options = { tz: 'Asia/Singapore' }) => {
  const tz = options.tz || 'Asia/Singapore'
  if (!by) return arr
  const result = arr.sort((a, b) => {
    if (by === 'date') {
      const d1D = a[by]
      const d2D = b[by]
      const d1 = moment(d1D).tz(tz).format('YYYYMMDD')
      const d2 = moment(d2D).tz(tz).format('YYYYMMDD')
      if (order === 'desc') {
        return d2 - d1
      } else {
        return d1 - d2
      }
    }
    if (order === 'desc') {
      if (a[by] > b[by]) {
        return -1
      }
      if (a[by] < b[by]) {
        return 1
      }
      if (a[by] || b[by]) {
        if (a[by] === null) {
          return 1
        }
        if (b[by] === null) {
          return -1
        }
      }
      return 0
    }
    if (a[by] < b[by]) {
      return -1
    }
    if (a[by] > b[by]) {
      return 1
    }
    if (a[by] || b[by]) {
      if (a[by] === null) {
        return -1
      }
      if (b[by] === null) {
        return 1
      }
    }
    return 0
  })
  return result
}

const parseStrTemplate = (template, data = {}, replaceChar = {}) => {
  const keys = Object.keys(data)
  const chars = Object.keys(replaceChar)
  let result = template
  if (keys.length === 0) {
    return result
  }

  keys.forEach(key => {
    const re = new RegExp(`{{${key}}}`, 'g')
    let d = data[key]
    if (chars.length > 0) {
      chars.forEach(c => {
        const reC = new RegExp(`${c}`, 'g')
        d = d.replace(reC, replaceChar[c])
      })
    }
    result = result.replace(re, d)
  })
  return result
}

const sortByMonth = arr => {
  arr.sort(function (a, b) {
    return months.indexOf(format(a, 'LLLL')) - months.indexOf(format(b, 'LLLL'))
  })
}

const convertToLongDate = dateString => {
  if (!dateString) {
    return undefined
  }

  const d = new Date(dateString)

  const day = d.getDate()
  const month = d.getMonth()
  const monthName = months[month]
  const year = d.getFullYear()

  return `${day} ${monthName} ${year}`
}

const enumerateDaysBetweenDates = (startDate, endDate) => {
  const now = startDate
  const dates = []
  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format('YYYY-MM-DD'))
    now.add(1, 'days')
  }
  return dates
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  sortBy,
  sortByMonth,
  convertToLongDate,
  parseStrTemplate,
  enumerateDaysBetweenDates,
}
