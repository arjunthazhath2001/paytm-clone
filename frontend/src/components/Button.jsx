import React from 'react'

function Button({title,...buttonProps}) {
  return (
    <div>
        <button {...buttonProps} className='px-4 pt-1 mt-3 pb-2  font-semibold text-white text-lg rounded-lg bg-blue-600 w-52'>{title}</button>
    </div>
  )
}

export default Button