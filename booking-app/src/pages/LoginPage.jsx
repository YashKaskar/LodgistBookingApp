import React from 'react'
import { Link } from 'react-router-dom';


const LoginPage = () => {
  return (
    <div className='mt-5 grow flex items-center justify-around'>
      <div className='mb-32'>   
      <h1 className='text-3xl text-center'> LOGIN </h1>
      <form className='max-w-md mx-auto'>
        <input type="email" placeholder='email id....' />
        <input type="password" placeholder='password....' />
        <div className='flex flex-col items-center'> 
        <button className='w-44 mt-4  border rounded-xl py-2 px-2 text-lg font-medium text-lodgist1 bg-sky-400 '> Login </button>
          </div>
          <div className='mt-8 text-center text-gray-500'>
             Don't have an account ? <Link className='text-red-400 underline' to={'/register'}> Register Now.... </Link>
          </div>
      </form>
    </div>
      </div>
      
  )
}

export default LoginPage