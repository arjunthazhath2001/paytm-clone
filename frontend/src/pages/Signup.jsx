import React, { useRef } from 'react'
import Inputbox from '../components/Inputbox'
import Button from '../components/Button'
import Heading from '../components/Heading'
import axios from 'axios'

function Signup() {

  const fnameRef= useRef();
  const lnameRef= useRef();
  const emailRef= useRef();
  const passwordRef= useRef();

  async function SignUpButton() {
      console.log("clicked")
      const response= await axios.post("http://localhost:3000/api/v1/user/signup",{
          username: emailRef.current.value,
          password: passwordRef.current.value,
          firstname: fnameRef.current.value,
          lastname: lnameRef.current.value
  })
      alert(response.data.message)
  }
  return (
    <div className="flex justify-center items-center border max-w-[300px] max-h-[500px] rounded-xl mx-auto overflow-y-clip my-10 border-black/80">
    <div className='flex flex-col gap-1 items-center justify-center py-14'>
        <Heading heading={"Sign Up"}/>
        <p className='text-black/50 text-md max-w-[300px] text-center'>Enter your information to create an account</p>
        <Inputbox innerRef={fnameRef} type={"text"} label={"First Name"} placeholder={"John"}/>
        <Inputbox innerRef={lnameRef} type={"text"} label={"Last Name"} placeholder={"Doe"}/>
        <Inputbox innerRef={emailRef} type={"email"} label={"Email"} placeholder={"johndoe@gmail.com"}/>
        <Inputbox innerRef={passwordRef} type={"password"} label={"Password"}/>
        <Button title={"Sign Up"} onClick={SignUpButton}/>
    </div>
    </div>
  )
}

export default Signup