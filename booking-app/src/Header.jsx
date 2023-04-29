import React, { useContext } from 'react'
import Logo from './assets/logo.png'
import { Link } from 'react-router-dom'
import { UserContext } from './usercontext';

const Header = () => {
 const {user} = useContext(UserContext)
  return (
    <header className='bg-lodgist p-2 flex justify-between'>
          <Link to={'/'} href="" className=''>
            <img src={Logo} alt="logo"  className='h-20 md:ml-16'/>
          </Link>
          <div className='flex gap-5 text-sm md:text-lg items-center mr-4 md:mr-8 md:align-middle'>
            <div className='hover:text-amber-500 hover:underline md:hover:text-xl text-white '>Anywhere</div>
            <div className='hover:text-amber-500 hover:underline md:hover:text-xl text-white '>Any week</div>
            <div className='hover:text-amber-500 hover:underline md:hover:text-xl text-white '>Add guests</div>
            <button className='flex bg-lodgist1 py-2 px-1 md:py-0 md:px-0 text-lodgist rounded-full hover:text-sky-500' >  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-5 h-5 md:w-10 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </button>
          </div>
          <Link to={user ? '/account' : '/login'} className='flex gap-2 py-0 px-1 mt-6 mb-7 md:mr-6 bg-lodgist1 text-fuchsia-700 hover:text-lodgist1 hover:bg-fuchsia-500 rounded-full'> 
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
           <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {!! user && (
          <div className='text-xs  md:text-base md:py-0.5'>
            {user?.name}
          </div>
        )}
          </Link>
      </header>
  )
}

export default Header
