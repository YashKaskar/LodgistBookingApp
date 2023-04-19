import React, { useEffect, useState } from 'react'
import axios from 'axios';


const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => { 
      setPlaces(response.data)
    })
  })
  return (
    <div className='p-16 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4' > 
      {places.length > 0 && places.map(place => (
        <div> 
          <div className='flex mb-2'> 
          {place.photos?.[0] && (    
            <img className='rounded-2xl aspect-square ' src={'http://localhost:8080/uploads/' + place.photos?.[0] } alt="" />
         )}
          </div>
          <h3 className='font-bold'>{place.address}</h3>
          <h2 className='text-sm text-zinc-500'>{place.title}</h2>
          <div className='mt-2'> 
            <span className='font-bold'>{place.price} $</span> per night
          </div>
          </div>
      ))}
    </div>  
  )
}

export default IndexPage
