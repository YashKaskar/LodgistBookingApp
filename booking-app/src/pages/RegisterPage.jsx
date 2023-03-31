import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', { 
        name,
        email,
        password
      })
      alert('Register successfull, You can login now ')
    }catch (e){
     alert('Registration failed, Please try it again')
    }
  }

  return (
    <div className='mt-5 grow flex items-center justify-around'>
      <div className='mb-32'>   
      <h1 className='text-3xl text-center'> REGISTER </h1>
        <form className='max-w-md mx-auto' onSubmit={registerUser}>
          <input type='text' placeholder='full name' value={name} onChange={ev => setName(ev.target.value) } />
          <input type="email" placeholder='email id....' value={email} onChange={ev => setEmail(ev.target.value) } />
          <input type="password" placeholder='password....' value={password} onChange={ev => setPassword(ev.target.value) } />
        <div className='flex flex-col items-center'> 
        <button className='w-44 mt-4  border rounded-xl py-2 px-2 text-lg font-medium text-lodgist1 bg-sky-400 '> Register </button>
          </div>
          <div className='mt-8 text-center text-gray-500'>
             Already have an account ? <Link className='text-red-400 underline' to={'/login'}> Login.... </Link>
          </div>
      </form>
    </div>
      </div>
  )
}

export default RegisterPage
