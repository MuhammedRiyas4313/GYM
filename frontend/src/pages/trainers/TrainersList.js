import React from 'react'
import Trainers from '../../components/trainers/Trainers'
import NavBar from '../../components/navbar/Header'
import FooterComponent from '../../components/footer/Footer'

function TrainersList() {
  return (
    <div>
      <NavBar />
      <Trainers />
      <FooterComponent />
    </div>
  )
}

export default TrainersList
