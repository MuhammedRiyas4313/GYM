import React from 'react'
import Footer from '../../components/footer/Footer'
import Hero from '../../components/hero/hero'
import Navbar from '../../components/navbar/Header'
import Features from '../../components/client/features/Features'
function Home() {
  return (
    <div>
        <Navbar />
         <Hero />
         <Features />
        <Footer />
    </div>
  )
}

export default Home
