import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import BookingWidget from './../BookingWidget';
import PlaceGallery from '../PlaceGallery';
import AddressLink from './../AddressLink';

const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
   
    useEffect(() => {    
        if (!id) {   
            return
        }
        axios.get(`/places/${id}`).then(response => {    
            setPlace(response.data);
        })
    }, [id])

    if (!place) return '';

    

  return (
    <div className='py-9 px-12 mt-4 bg-gray-200'>
          <h1 className='text-3xl'>{place.title}</h1>
          <AddressLink>{place.address }</AddressLink>
          
          <PlaceGallery place={place} />
          

          <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-6 gap-8'>   
              <div>
              <div className='mt-6'>     
              <h2 className='font-bold text-2xl mb-2'>Place Description...</h2>
              <div className='bg-stone-500 text-white p-2 rounded-2xl text-base italic'>{place.description}</div>
              
          </div>
          <div className='mt-6'>
              <h3 className='font-bold text-2xl mb-2'>Guest Access...</h3>
              <div className='bg-neutral-500 text-white p-2 rounded-2xl text-base italic'>{place.extraInfo}</div>
          </div>
          
                  <div className='flex mt-6'> <b className=' mb-2 bg-gray-700 text-white rounded-full px-6'>Check-in : </b> <div className='mb-2 bg-gray-500 rounded-full px-6 text-white ml-1'>{place.checkIn}</div> <br /> </div>
                  <div className='flex'> <b className='mb-2 bg-gray-700 text-white rounded-full px-6'>Check-out : </b> <div className='mb-2 bg-gray-500 rounded-full px-6 text-white ml-1'>{place.checkOut}</div> <br /> </div>
                  <div className='flex'> <b className='  bg-gray-700 text-white rounded-xl md:rounded-2xl px-4 md:px-8'>Max-Guests : </b> <div className='bg-gray-500 rounded-xl md:rounded-full px-6 md:px-9 text-white ml-1'>{place.maxGuests}</div> </div>             
              </div>
              <div> 
                  <BookingWidget place={ place } />
              </div>
        </div>
    </div>
  )
}

export default PlacePage
