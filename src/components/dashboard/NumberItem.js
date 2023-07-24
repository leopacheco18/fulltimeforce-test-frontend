import React from 'react'

const NumberItem = ({ icon, title, number, customClass}) => {
  return (
    <div className='number-item b-shadow'>
        <div className='number-item-icon'>{icon}</div>
        <div className='number-item-content'>
            <h5 className='number-item-title'>{title}</h5>
            <p className={`number-item-number ${customClass ? customClass : ''}`}>{number}</p>
        </div>
    </div>
  )
}

export default NumberItem