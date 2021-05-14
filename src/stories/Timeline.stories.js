import React from 'react'
import Timeline from '../components/Timeline/Timeline'

const timelineData = [
  {
    name: 'Employee',
    status: 'approved',
  },
  {
    name: 'Manager',
    status: 'rejected',
  },
  {
    name: 'HR',
    status: 'pending',
  },
]

export default {
  title: 'Example/TimelineBar',
  component: Timeline,
}

export const TimelineDemo = () => {
  return <Timeline data={timelineData} />
}
