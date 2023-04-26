import React, { useEffect, useState } from 'react'
import AccountNavigation from './../AccountNavigation';
import axios from 'axios';
import PlaceImg from './../PlaceImg';
import { Link } from 'react-router-dom';
import BookingDates from './../BookingDates';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {  
      setBookings(response.data);
    })
  })
  return (
    <div>
      <AccountNavigation />
      <div className='p-8'> 
        {bookings?.length > 0 && bookings.map(booking => ( 
          <Link to={`/account/bookings/ ${booking._id}`} className='flex gap-4 bg-yellow-400 overflow-hidden rounded-2xl'>
            <div className='md:flex gap-6'>
            <div className='md:w-60 w-90 '> 
              <PlaceImg place={booking.place} />
            </div>
            <div className='p-4 grow'> 
              <h2 className='md:text-xl text-lg font-bold border-b border-stone-200 text-lodgist'>{booking.place.title}</h2>
              <BookingDates booking={booking} className='text-zinc-600 mt-3'/>
              <div className='text-lg'> 
                
                <div className='flex  gap-2 text-xl  font-semibold border rounded-2xl p-2 bg-sky-300'> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8 ml-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
                Total price: ${booking.price}
              </div>
              </div>
              </div>
              </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage
