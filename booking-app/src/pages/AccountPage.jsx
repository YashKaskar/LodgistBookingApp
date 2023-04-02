import React, { useContext } from 'react'
import { UserContext } from './../usercontext';
import { Navigate } from 'react-router-dom';

const AccountPage = () => {
  const { user, ready } = useContext(UserContext)
  
  if (!ready) {
    return Loading
      
  }

  if (ready && !user) { 
    <Navigate to={'/login'} />
  }

  return (
    <div>
      account page {user?.name} 
    </div>
  )
}

export default AccountPage
