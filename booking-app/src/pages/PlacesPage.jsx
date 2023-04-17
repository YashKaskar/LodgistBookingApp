import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AccountNavigation from './../AccountNavigation';
import axios from 'axios';



const PlacesPage = () => {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(({ data }) => { 
        setPlaces(data)
      })
  })

  return (
    <div>
      <AccountNavigation />
      
        <div className='text-center'>
        < Link to={'/account/places/new'} className='inline-flex   border rounded-full py-2 px-3 text-lg font-medium text-stone-700 bg-amber-500 gap-2' > Add New Place
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </Link>
      </div>
      <h3 className='mt-6 text-center font-medium'>List of all added places</h3>
      <div className='mt-4 p-4'> 
        {places.length > 0 && places.map(place => (
          <Link to={'/account/places/'+place._id} className='flex cursor-pointer bg-zinc-200 gap-4 p-4 rounded-2xl'>
            <div className=' flex h-32 w-32 bg-gray-300 shrink-0'> 
              {place.photos.length > 0 && (
                  <img className='object-cover' src={'http://localhost:8080/uploads/' + place.photos[0]} alt="" />
              )}
            </div>
            <div>
            <h2 className='text-xl font-bold'>{place.title}</h2>
            <p className='text-sm mt-2 '>{place.description}</p>
            </div>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default PlacesPage
