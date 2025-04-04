import React from 'react'

function Inputbox({label,placeholder,type}) {
  return (
    <div className='inline-flex flex-col'>
    <label className='text-black text-md font-semibold mb-2'>{label}</label>
    <input type={type} className='border border-black/70 px-3 py-2 rounded-sm w-52' placeholder={placeholder}/>
    </div>
  )
}

export default Inputbox