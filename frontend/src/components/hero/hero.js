import React from 'react'
import './hero.css'
import { useNavigate } from 'react-router-dom'

function Hero() {

  const navigate = useNavigate()

  function cours(){
    navigate('/courses')
  }

  return (
    <div className='herocontainer'>
      <div className="">
      

      <div className="relative isolate px-6 pt-14 lg:px-8">
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 mt-10">
          <div className="flex justify-end mb-5">
            <div className="relative rounded-full max-w-xs px-3 py-1 text-sm leading-6 text-gray-100 ring-1 ring-gray-900/20 hover:ring-gray-100">
              Shape your body.
              <a onClick={cours}  className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Enroll now <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-end">
            <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
              GET&nbsp; <span className="text-4xl font-bold tracking-tight text-orange-500 sm:text-6xl">FIT</span> 
            </h1>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
              STAY STRONG
            </h1>
           
          </div>
        </div>
       
      </div>
    </div>
    </div>
  )
}

export default Hero
