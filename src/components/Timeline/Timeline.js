import React from 'react'
import classNames from 'classnames'
import CloseIcon from '@material-ui/icons/Close'

import './styles.scss'

const Timeline = ({ data }) => {
  return (
    <ul className="cui-timeline">
      {data.map(step => (
        <li
          className={classNames('cui-timeline__item', {
            'is-done': step.status === 'approved',
            'is-pending': step.status === 'pending',
            'is-rejected': step.status === 'rejected',
          })}
        >
          {step.status === 'rejected' && <CloseIcon />}
          {step.name}
        </li>
      ))}
    </ul>
  )
}

export default Timeline
