import { useState } from 'react'
import { motion } from 'framer-motion'
import './Trainers.css'


export default function TrainerHero() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="trainerheroouter w-full h-full pt-36">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 flex justify-center align-bottom">
          
            <motion.h1 animate={{scale:1}} initial={{scale:0}} className="text-6xl font-bold  text-white sm:text-6xl">
              Courses
            </motion.h1>
          
        </div>
      </div>
    </div>
  )
}
