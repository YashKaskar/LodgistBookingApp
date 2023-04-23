import React, { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns';

const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    
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
                          <input type='tel' value={mobile} onChange={ev => setMobile(ev.target.value)} />
                      </div>
                      <div className='flex flex-col items-center'> 
              <button className='w-44 mt-4  border rounded-xl py-2 px-2 text-lg font-medium text-lodgist1 bg-sky-400 '>
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
