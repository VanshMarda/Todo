import React from 'react'
import { RiCalendarTodoFill } from "react-icons/ri";


const NavBar = () => {
  return (
    <div className='flex flex-row justify-center p-5 bg-[#A1DD70]'>
      <h1 className='text-3xl mr-6'>
        ToDo 
      </h1>
      <div className='pt-1 text-3xl'>
      <RiCalendarTodoFill />
      </div>
    </div>
  )
}

export default NavBar