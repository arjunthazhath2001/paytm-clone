import React from 'react'

function Button({title}) {
  return (
    <div>
        <button className='px-4 pt-1 pb-2 font-semibold text-white text-lg rounded-lg bg-black w-52'>{title}</button>
    </div>
  )
}

export default Button