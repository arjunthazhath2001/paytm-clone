import React from 'react'

function Heading({heading}) {
  return (
    <div>
        <h1 className='text-2xl font-bold text-blue-600'>
            {heading}
        </h1>
    </div>
  )
}

export default Heading