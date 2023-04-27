import React, { useContext, useState } from 'react'
import { UserContext } from '../usercontext';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNavigation from '../AccountNavigation';

const ProfilePage = () => {
  const [redirect,setRedirect] = useState(null);
  const {ready,user,setUser} = useContext(UserContext);
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <AccountNavigation />
      {subpage === 'profile' && (  
        <div className='text-center text-lg font-semibold mt-20 '>   
          Hello, User<span className='text-lodgist font-extrabold ml-2 underline'>{user.name}</span>
          <br />
          <br />
          You are logged In with <span className='text-sky-500 ml-2 '>{user.email}</span>
          <br />
          <br />
          <button onClick={logout} className='w-44 mt-4  border rounded-xl py-2 px-2 text-lg font-medium text-lodgist1 bg-pink-900'>Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        < PlacesPage />
      )}
    </div>
  ) 
}

export default ProfilePage
