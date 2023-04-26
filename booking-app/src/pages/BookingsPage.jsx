import React, { useEffect, useState } from 'react'
import AccountNavigation from './../AccountNavigation';
import axios from 'axios';
import PlaceImg from './../PlaceImg';
import { format } from 'date-fns';
import { differenceInCalendarDays } from 'date-fns';
import { Link } from 'react-router-dom';

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
          <Link to={`/account/bookings/ ${booking._id}`} className='flex gap-4 bg-stone-300 overflow-hidden rounded-2xl'>
            <div className='md:w-48 w-60'> 
              <PlaceImg place={booking.place} />
            </div>
            <div className='p-4 grow'> 
              <h2 className='md:text-xl text-lg font-bold'>{booking.place.title}</h2>
              <div className='border-t border-stone-200  py-2 flex gap-4'> 
              
               <div className='md:flex gap-1 items-center text-xs' >  
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
               </svg>
                {format(new Date(booking.checkIn), 'mm-dd-yyyy')} 
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
                <div className='flex gap-1 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                {format(new Date(booking.checkOut), 'mm-dd-yyyy')}  
                </div>

              </div>

              <div className='text-xl flex'> 
                {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights 
                <div className='ml-5'>   
                Total price: ${booking.price}
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
