import React from 'react'
import classnames from 'classnames'

const Node = ({ children, className, id, styles }) => {
  const _Node = classnames('cui-node', className)
  return (
    <div className={_Node} id={id} style={styles}>
      {' '}
      {children}{' '}
    </div>
  )
}

Node.defaultProps = {
  className: '',
}

export default Node
