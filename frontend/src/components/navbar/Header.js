import React, { useState } from 'react';
import { Button, Navbar } from 'flowbite-react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/userSlice';
import  './Header.css'


function NavBar() {

  const [ logoutConfirm , setLogoutConfirm ] = useState(false)
  const dispatch = useDispatch()
  const {user, token} = useSelector((state)=> state.reducer.user)

  console.log(user,'user from the toolkit store ')
  console.log(token,'token from the toolkit store ')

  function logout (){
   console.log('user logout ')
   setLogoutConfirm(true)
   dispatch(userLogout())
  }
 

  return (
    
  
  <Navbar className='navbar p-10'>
  <Link to="/">
  <Navbar.Brand href="">
    <img
      src="/logo.png"
      className="mr-3 h-6 sm:h-9"
      alt="Logo"
    />
  </Navbar.Brand>
  </Link>
  <div className="flex md:order-2 ">
  {user && token && <p className='flex ml-5 mr-5 text-white items-center uppercase'>{user.fname}</p>}
  { user && token ?  
    <Button className='bg-orange-500 hover:bg-orange-700' onClick={logout}>
      Logout
    </Button>
      : <Link to="/login">
    <Button className='bg-orange-500 hover:bg-orange-700'>
      Login
    </Button>
 </Link>} 
    <Navbar.Toggle />
  </div>
  <Navbar.Collapse>
  <Link to="/">
    <Navbar.Link
      href="/"
      className='navbarlink hover:bg-orange-500'
    >
      Home
    </Navbar.Link>
    </Link>
    <Navbar.Link href="/" className='navbarlink'>
      Courses
    </Navbar.Link>
    <Navbar.Link href="/" className='navbarlink'>
      Trainers
    </Navbar.Link>
    <Navbar.Link href="/" className='navbarlink'>
      About
    </Navbar.Link>
    <Navbar.Link href="/" className='navbarlink'>
      Contact
    </Navbar.Link>
  </Navbar.Collapse>
</Navbar>

  )
}

export default NavBar
