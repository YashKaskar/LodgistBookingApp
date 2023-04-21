import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setshowAllPhotos] = useState(false);
    useEffect(() => {    
        if (!id) {   
            return
        }
        axios.get(`/places/${id}`).then(response => {    
            setPlace(response.data);
        })
    }, [id])

    if (!place) return '';

    if (showAllPhotos) {  
       return (
           <div className='bg-white absolute inset-0 min-h-screen'>
               <div>
                <h2 className='font-bold text-2xl mt-6 p-6'> Photos of <span className='underline'> {place.title} </span></h2>
               </div>  
               <div className='p-8 grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 '>   
               {place.photos?.length > 0 && place.photos.map(photo => (    
                   <div>   
                       <img className='h-60'  src={'http://localhost:8080/uploads/' + photo} alt="" />
                    </div>
                ))}
               </div>
               <div>    
                   <button onClick={() => setshowAllPhotos()} className='ml-20 rounded-2xl flex gap-1 py-2 px-4 bg-zinc-500 text-white'>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                   </svg> 
                   Back to page
                   </button>
               </div>
            </div>
       )
   }

  return (
    <div className='py-9 px-12 mt-4 bg-gray-200'>
          <h1 className='text-3xl'>{place.title}</h1>
          <a target='_blank' href={'http://maps.google.com/?q=' + place.address} className='underline my-4 block font-semibold'>{place.address}</a>
         <div className='relative'>
         <div className='grid gap-2 grid-cols-[2fr_1fr]'> 
              <div className=' object-cover grid gap-2'>     
                  {place.photos?.[0] && (  
                      <div className=' object-cover'>
                        <img src={'http://localhost:8080/uploads/' + place.photos[0]} alt="" />  
                    </div>              
                  )}
              </div>
              <div className='grid gap-2'>     
                  {place.photos?.[1] && (   
                      <img className='object-cover grid gap-2'  src={'http://localhost:8080/uploads/' + place.photos[1]} alt="" />
                  )}
                  <div className='overflow-hidden'> 
                  {place.photos?.[2] && (   
                      <img  className='object-cover grid gap-2' src={'http://localhost:8080/uploads/' + place.photos[2]} alt="" />
                  )}  
                  </div>
              </div>   
              </div>
              <button onClick={() => setshowAllPhotos(true)} className='absolute bottom-1 text-lodgist1 font-semibold right-1 bg-gray-500 lg:text-xl rounded-xl lg:p-2'>More Photos</button>
         </div>
    </div>
  )
}

export default PlacePage
