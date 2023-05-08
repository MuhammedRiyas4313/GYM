import React from 'react'
import Footer from '../../components/footer/Footer'
import Hero from '../../components/hero/hero'
import Navbar from '../../components/navbar/Header'
import Features from '../../components/client/features/Features'
import OurClasses from '../../components/client/ourClasses/OurClasses'
function Home() {
  return (
    <div>
        <Navbar />
         <Hero />
         <Features />
         {/* <OurClasses /> */}
        <Footer />
    </div>
  )
}

export default Home
