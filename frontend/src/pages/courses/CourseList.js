import React from 'react'
import NavBar from '../../components/navbar/Header'
import Courses from '../../components/courses/Courses'
import FooterComponent from '../../components/footer/Footer'


function CourseList() {
  return (
    <div>
        <NavBar />
        <Courses />
        <FooterComponent />
    </div>
  )
}

export default CourseList
