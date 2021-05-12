import React from 'react'
import Pagination from '@material-ui/lab/Pagination'

import TableList from './TableList'
import List from '../../components/List'
import Pill from '../../components/Pill'

const tableListData = [
  {
    date: {
      value: '01 Apr 21 - 02 Apr 21',
      label: 'From Date -  To Date',
    },
    duration: {
      value: '1',
      label: 'Duration (day)',
    },
    type: {
      value: 'annual leave',
      label: 'Type',
    },
    reason: {
      value: 'personal issues',
      label: 'Reason',
    },
    status: {
      value: 'Pending',
      label: 'Status',
    },
  },
  {
    date: {
      value: '01 May 21 - 02 May 21',
      label: 'From Date -  To Date',
    },
    duration: {
      value: '2',
      label: 'Duration (day)',
    },
    type: {
      value: 'annual leave',
      label: 'Type',
    },
    reason: {
      value: 'personal issues',
      label: 'Reason',
    },
    status: {
      value: 'Approved',
      label: 'Status',
    },
  },
  {
    date: {
      value: '01 Jul 21 - 02 Jul 21',
      label: 'From Date -  To Date',
    },
    duration: {
      value: '3',
      label: 'Duration (day)',
    },
    type: {
      value: 'annual leave',
      label: 'Type',
    },
    reason: {
      value: 'personal issues',
      label: 'Reason',
    },
    status: {
      value: 'Rejected',
      label: 'Status',
    },
  },
  {
    date: {
      value: '01 Jun 21 - 02 Jun 21',
      label: 'From Date -  To Date',
    },
    duration: {
      value: '3',
      label: 'Duration (day)',
    },
    type: {
      value: 'annual leave',
      label: 'Type',
    },
    reason: {
      value: 'personal issues',
      label: 'Reason',
    },
    status: {
      value: 'Rejected',
      label: 'Status',
    },
  },
  {
    date: {
      value: '01 Aug 21 - 02 Aug 21',
      label: 'From Date -  To Date',
    },
    duration: {
      value: '3',
      label: 'Duration (day)',
    },
    type: {
      value: 'annual leave',
      label: 'Type',
    },
    reason: {
      value: 'personal issues',
      label: 'Reason',
    },
    status: {
      value: 'Rejected',
      label: 'Status',
    },
  },
  {
    date: {
      value: '01 Sep 21 - 02 Sep 21',
      label: 'From Date -  To Date',
    },
    duration: {
      value: '3',
      label: 'Duration (day)',
    },
    type: {
      value: 'annual leave',
      label: 'Type',
    },
    reason: {
      value: 'personal issues',
      label: 'Reason',
    },
    status: {
      value: 'Rejected',
      label: 'Status',
    },
  },
  {
    date: {
      value: '01 Apr 21 - 02 Apr 21',
      label: 'From Date -  To Date',
    },
    duration: {
      value: '1',
      label: 'Duration (day)',
    },
    type: {
      value: 'annual leave',
      label: 'Type',
    },
    reason: {
      value: 'personal issues',
      label: 'Reason',
    },
    status: {
      value: 'Pending',
      label: 'Status',
    },
  },
  {
    date: {
      value: '01 May 21 - 02 May 21',
      label: 'From Date -  To Date',
    },
    duration: {
      value: '2',
      label: 'Duration (day)',
    },
    type: {
      value: 'annual leave',
      label: 'Type',
    },
    reason: {
      value: 'personal issues',
      label: 'Reason',
    },
    status: {
      value: 'Approved',
      label: 'Status',
    },
  },
  {
    date: {
      value: '01 Jul 21 - 02 Jul 21',
      label: 'From Date -  To Date',
    },
    duration: {
      value: '3',
      label: 'Duration (day)',
    },
    type: {
      value: 'annual leave',
      label: 'Type',
    },
    reason: {
      value: 'personal issues',
      label: 'Reason',
    },
    status: {
      value: 'Rejected',
      label: 'Status',
    },
  },
  {
    date: {
      value: '01 Jun 21 - 02 Jun 21',
      label: 'From Date -  To Date',
    },
    duration: {
      value: '3',
      label: 'Duration (day)',
    },
    type: {
      value: 'annual leave',
      label: 'Type',
    },
    reason: {
      value: 'personal issues',
      label: 'Reason',
    },
    status: {
      value: 'Rejected',
      label: 'Status',
    },
  },
]

const sampleData = [
  {
    'From Date - To Date': '01 Apr 21 - 02 Apr 21',
    'Duration (day)': '2',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Pending',
  },
  {
    'From Date - To Date': '01 May 21 - 02 May 21',
    'Duration (day)': '1',
    Type: 'Unpaid Leave',
    Reason: 'Personal Issues',
    Status: 'Pending',
  },
  {
    'From Date - To Date': '01 Jun 21 - 02 Jun 21',
    'Duration (day)': '3',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Pending',
  },
  {
    'From Date - To Date': '01 Jul 21 - 02 Jul 21',
    'Duration (day)': '4',
    Type: 'Unpaid Leave',
    Reason: 'Personal Issues',
    Status: 'Rejected',
  },
  {
    'From Date - To Date': '01 Aug 21 - 02 Aug 21',
    'Duration (day)': '2',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Pending',
  },
  {
    'From Date - To Date': '01 Sep 21 - 02 Sep 21',
    'Duration (day)': '5',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Approved',
  },
  {
    'From Date - To Date': '01 Jan 21 - 02 Jan 21',
    'Duration (day)': '1',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Approved',
  },
  {
    'From Date - To Date': '01 Feb 21 - 02 Feb 21',
    'Duration (day)': '4',
    Type: 'Annual Leave',
    Reason: 'Personal Issues',
    Status: 'Rejected',
  },
  {
    'From Date - To Date': '01 Mar 21 - 02 Mar 21',
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

// export const TableListDemo = () => <TableList data={tableListData} />

export const TableListDemo = () => {
  const [page, setPage] = React.useState(1)

  const handleChange = (event, value) => {
    setPage(value)
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
      <List
        id="cui-sample-list-sortables"
        data={sampleData.slice((page - 1) * PAGE_LIMIT, page * PAGE_LIMIT)}
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

      <Pagination
        count={Math.ceil(sampleData.length / PAGE_LIMIT)}
        onChange={handleChange}
      />
    </>
  )
}
