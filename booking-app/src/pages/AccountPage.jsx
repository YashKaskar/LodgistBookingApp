import React, { useContext, useState } from 'react'
import { UserContext } from './../usercontext';
import { Navigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null)
  const { user, ready,setUser } = useContext(UserContext)

  let { subpage } = useParams();
  if (subpage === undefined) { 
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }
  
  if (!ready) {
    return 'Loading....'
      
  }

  if (ready && !user && !redirect) { 
    <Navigate to={'/login'} />
  }

  

  function linkClasses(type = null) {  
    let classes = 'py-2 px-4 text-lodgist1 bg-neutral-500 rounded-full';
    if (type === subpage) {
      classes += 'py-2 px-4 text-lodgist1 bg-red-600 rounded-full'
    }
    return classes;
  }


  if (redirect) {  
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <nav className='mt-9 justify-center w-full gap-6 flex mb-20'> 
        <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
        <Link className={linkClasses('places')} to={'/account/places'}>Accommodation</Link>
      </nav>
      {subpage === 'profile' && (  
        <div className='text-center text-lg font-semibold mt-20 '>   
          Hello, my friend <span className='text-lodgist font-extrabold ml-2 underline'>{user.name}</span>
          <br />
          <br />
          You are logged In with <span className='text-sky-500 ml-2 '>{user.email}</span>
          <br />
          <br />
          <button onClick={logout} className='w-44 mt-4  border rounded-xl py-2 px-2 text-lg font-medium text-lodgist1 bg-pink-900'>Logout</button>
        </div>
      )}
    </div>
  ) 
}

export default AccountPage
