import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './usercontext';


const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext)
  
  useEffect(() => {   
    if (user) {  
      setName (user.name)
    }
  }, [user])
    async function bookThisPlace() {
      const response = await axios.post('/bookings', {
        checkIn,checkOut,numberOfGuests,name,phone,
        place:place._id,
        price:numberOfNights * place.price,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    }
  
    if (redirect) {
      return <Navigate to={redirect} />
    }
    
    let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    
  return (
    <div className='bg-white shadow p-4 rounded-xl text-black mt-9 md:mt-0'>
                      <div className='text-2xl font-bold text-center'> Price : ${place.price}/ per night</div>
                      <div className='my-4 p-4 rounded-2xl bg-gray-200'> 
                          <label>Check In : </label>
                          <input className='bg-gray-200' type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                      </div>
                      <div className='my-4 p-4 rounded-2xl bg-gray-200'> 
                          <label>Check Out : </label>
                          <input className='bg-gray-200' type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                      </div>
                      <div className='my-4 p-2 rounded-2xl bg-gray-200'> 
                          <label>Number of Guests : </label>
                          <input type='number' value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
                      </div>
                      <div className='my-4 p-2 rounded-2xl bg-gray-200 gap-2'> 
                          <label>Full Name : </label>
                          <input type='text' value={name} onChange={ev => setName(ev.target.value)} />
                          <label>Phone Number : </label>
                          <input type='tel' value={phone} onChange={ev => setPhone(ev.target.value)} />
                      </div>
                      <div className='flex flex-col items-center'> 
              <button onClick={bookThisPlace} className='w-44 mt-4  border rounded-xl py-2 px-2 text-lg font-medium text-lodgist1 bg-sky-400 '>
                  Book The Place
                  {numberOfNights > 0 && (
                <span> ${numberOfNights * place.price}</span>
                 )}
              </button>
                  </div>
                  </div>
  )
}

export default BookingWidget
