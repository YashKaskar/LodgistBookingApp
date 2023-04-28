import React, { useContext } from 'react'
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './../usercontext';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false)
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {  
    ev.preventDefault();
    try {
      const data = await axios.post('/login', { email, password })
      setUser(data)
      alert('Login Successfull')
      setRedirect(true)
    } catch (e) {  
      alert('Login failed')
    }
  }

  if(redirect) {
    return <Navigate to={ '/ '} />
  }

  return (
    <div className='mt-5 grow flex items-center justify-around'>
      <div className='mb-32'>   
      <h1 className='text-3xl text-center'> LOGIN </h1>
      <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
          <input type="email" placeholder='email id....' value={email} onChange={ev => setEmail(ev.target.value) } />
          <input type="password" placeholder='password....' value={password} onChange={ev => setPassword(ev.target.value) } />
        <div className='flex flex-col items-center'> 
        <button className='w-44 mt-4  border rounded-xl py-2 px-2 text-lg font-medium text-lodgist1 bg-sky-400 '> Login </button>
          </div>
          <div className='mt-8 text-center text-gray-500'>
             Don't have an account ? <Link className='text-red-400 underline' to={'/register'}> Register.... </Link>
          </div>
      </form>
    </div>
      </div>
      
  )
}

export default LoginPage
