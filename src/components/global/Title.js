import React from 'react'

const Title = ({ title = ''}) => {
  return (
    <div>
        <h2 className='title'>{title}</h2>
        <hr className='title-hr' />
    </div>
  )
}

export default Title