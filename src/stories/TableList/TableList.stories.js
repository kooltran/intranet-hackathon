import React from 'react'
import Pagination from '@material-ui/lab/Pagination'

import TableList from './TableList'
import List from '../../components/List'
import Pill from '../../components/Pill'
import SearchInput from '../../components/SearchInput'
import { utils } from '../../utils'

const sampleData = [
  {
    Date: '10 May 2021',
    'Duration (day)': '2',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Pending',
  },
  {
    Date: '11 May 2021',
    'Duration (day)': '1',
    Type: 'Unpaid Leave',
    Reason: 'Personal Issues',
    Status: 'Pending',
  },
  {
    Date: '12 May 2021',
    'Duration (day)': '3',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Pending',
  },
  {
    Date: '13 May 2021',
    'Duration (day)': '4',
    Type: 'Unpaid Leave',
    Reason: 'Personal Issues',
    Status: 'Rejected',
  },
  {
    Date: '14 May 2021',
    'Duration (day)': '2',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Pending',
  },
  {
    Date: '15 May 2021',
    'Duration (day)': '5',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Approved',
  },
  {
    Date: '16 May 2021',
    'Duration (day)': '1',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Approved',
  },
  {
    Date: '17 May 2021',
    'Duration (day)': '4',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Rejected',
  },
  {
    Date: '18 May 2021',
    'Duration (day)': '3',
    Type: 'Annual Leave',
    Reason: 'Unpaid Issues',
    Status: 'Pending',
  },
]

const PAGE_LIMIT = 5

export default {
  title: 'Example/TableList',
  component: TableList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

export const TableListDemo = () => {
  const [page, setPage] = React.useState(1)
  const [listData, setListData] = React.useState(sampleData)

  const handleChange = (event, value) => {
    setPage(value)
  }

  const handleSearch = searchKey => {
    if (Array.isArray(searchKey)) {
      const daysSearch = searchKey.map(day => utils.convertToLongDate(day))

      const newList =
        searchKey.length > 0
          ? sampleData.filter(val => {
              return daysSearch.indexOf(val.Date) !== -1
            })
          : sampleData

      setListData(newList)
    }
  }

  const ListResolver = d => {
    const result = { ...d }
    if (d.Status) {
      result.Status = (
        <Pill pillBg="#fdf0e4" pillColor="#F2994A">
          {d.Status}
        </Pill>
      )
    }
    return result
  }

  return (
    <>
      <SearchInput placeholder="Search" onSearch={handleSearch} />
      <List
        id="cui-sample-list-sortables"
        data={listData.slice((page - 1) * PAGE_LIMIT, page * PAGE_LIMIT)}
        toggleInnerContent={false}
        options={{
          styles: {
            Status: {
              textAlign: 'right',
              alignContent: 'flex-end',
            },
            'Duration (day)': {
              '--itemWidth': '15%',
              alignContent: 'center',
              textAlign: 'center',
            },
          },
        }}
        itemResolver={ListResolver}
      />

      {listData.length > PAGE_LIMIT && (
        <Pagination
          count={Math.ceil(listData.length / PAGE_LIMIT)}
          onChange={handleChange}
        />
      )}
    </>
  )
}
