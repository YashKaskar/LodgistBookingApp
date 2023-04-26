import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios  from 'axios';
import AddressLink from './../AddressLink';
import BookingDates from './../BookingDates';
import PlaceGallery from './../PlaceGallery';

const BookingPage = () => {

  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  
  useEffect(() => { 
    if (id) { 
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id }) => _id === _id)
        if (foundBooking) {  
          setBooking(foundBooking)
        }
      })
    }
  }, [id])
  
  if (!booking) {
    return '';
  }

  return (
    <div className='my-8 p-6'>
      <h1 className='text-3xl'>{booking.place.title}</h1>
      <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
      <div className="bg-yellow-400 p-8 my-8 rounded-xl sm:flex sm:justify-between ">
        <div>
        <h2 className='text-xl text-lodgist'>Booking Information</h2>
        <BookingDates booking={booking} />
        </div>
        <div className='bg-sky-300 p-4 mt-3 sm:mt-0 text-white rounded-2xl text-center'>    
          <div>Total Price</div>
          <div className='text-3xl'>{ booking.place.price }</div>
       </div>
      </div>
      <div>   
        <PlaceGallery place={booking.place}/>
      </div>
    </div>
  )
}

export default BookingPage
