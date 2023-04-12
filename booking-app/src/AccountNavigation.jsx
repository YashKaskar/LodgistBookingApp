import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const AccountNavigation = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];
  if (subpage === undefined) {
      subpage = 'profile'
  }

  function linkClasses(type = null) {  
    let classes = 'py-2 px-4 text-lodgist1 bg-neutral-500 rounded-full';
    if (type === subpage) {
      classes += 'py-2 px-4 text-lodgist1 bg-red-600 rounded-full'
    }
    return classes;
  }
  
  return (
    <nav className='mt-9 justify-center w-full gap-6 flex mb-20'> 
        <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
        <Link className={linkClasses('places')} to={'/account/places'}>Accommodation</Link>
      </nav>
  )
}

export default AccountNavigation
