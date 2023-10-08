import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Attendance from './Attendance'
import Course from './Course'
import Student from './Student'
import AddCourse from './AddCourse'
import AddStd from './AddStd'

export default function AdminRoutesIndex() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/attendance' element={<Attendance/>}/>
        <Route path='/course' element={<Course/>}/>
        <Route path='/student' element={<Student/>}/>
        <Route path='/addcourse' element={<AddCourse/>}/>
        <Route path='/addstd' element={<AddStd/>}/>
    </Routes>
    </>
  )
}
