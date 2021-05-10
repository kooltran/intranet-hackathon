import moment from 'moment'

export const sortBy = (
  arr,
  by,
  order = 'asc',
  options = { tz: 'Asia/Singapore' }
) => {
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

export const parseStrTemplate = (template, data = {}, replaceChar = {}) => {
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

export default {
  sortBy,
  parseStrTemplate,
}