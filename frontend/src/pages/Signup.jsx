import React from 'react'
import Inputbox from '../components/Inputbox'
import Button from '../components/Button'
import Heading from '../components/Heading'

function Signup() {
  return (
    <div className="flex justify-center items-center border max-w-[600px] border-black/80">
    <div className='flex flex-col gap-3 items-center justify-center'>
        <Heading heading={"Sign Up"}/>
        <p className='text-black/50 text-md max-w-[300px] text-center'>Enter your information to create an account</p>
        <Inputbox type={"text"} label={"First Name"} placeholder={"John"}/>
        <Inputbox type={"text"} label={"Last Name"} placeholder={"Doe"}/>
        <Inputbox type={"email"} label={"Email"} placeholder={"johndoe@gmail.com"}/>
        <Inputbox type={"password"} label={"Password"}/>
        <Button title={"Sign Up"}></Button>
    </div>
    </div>
  )
}

export default Signup