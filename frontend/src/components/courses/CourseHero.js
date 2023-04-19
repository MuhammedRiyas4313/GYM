import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import './Course.css'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function CourseHero() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="courseheroouter w-full h-full pt-36">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 flex justify-center align-bottom">
          
            {/* <h1 className="text-4xl font-bold  text-orange-500 sm:text-6xl">
              Courses
            </h1> */}
          
        </div>
      </div>
    </div>
  )
}
