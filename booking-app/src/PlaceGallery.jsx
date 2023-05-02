import React, { useState } from 'react'
import Image from './Image';



const PlaceGallery = ({ place }) => {

    const [showAllPhotos, setshowAllPhotos] = useState(false);
    
    if (showAllPhotos) {  
        return (
            <div className='bg-gray-200 sticky inset-0 min-h-screen'>
                <div>
                 <h2 className='font-bold text-2xl mt-6 p-6'> Photos of <span className='underline'> {place.title} </span></h2>
                </div>  
                <div className='p-8 grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 '>   
                {place.photos?.length > 0 && place.photos.map((photo, index) => (    
                    <div key={index}>   
                        <Image className='h-60'  src={photo} alt="" />
                     </div>
                 ))}
                </div>
                <div>    
                    <button onClick={() => setshowAllPhotos(false)} className='ml-20 rounded-2xl flex gap-1 py-2 px-4 bg-zinc-500 text-white'>
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
    <div className='relative'>
         <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'> 
              <div className=' object-cover grid gap-2'>     
                  {place.photos?.[0] && (  
                      <div className=' object-cover cursor-pointer'>
                        <Image onClick={() => setshowAllPhotos(true)} src={ place.photos[0]} alt="" />  
                    </div>              
                  )}
              </div>
              <div className='grid gap-2'>     
                  {place.photos?.[1] && (   
                      <Image onClick={() => setshowAllPhotos(true)} className='object-cover grid gap-2 cursor-pointer'  src={ place.photos[1]} alt="" />
                  )}
                  <div className='overflow-hidden'> 
                  {place.photos?.[2] && (   
                      <Image onClick={() => setshowAllPhotos(true)} className='object-cover grid gap-2 cursor-pointer' src={ place.photos[2]} alt="" />
                  )}  
                  </div>
              </div>   
              </div>
              <button onClick={() => setshowAllPhotos(true)} className='absolute bottom-1 text-lodgist1 font-semibold right-1 bg-gray-500 lg:text-xl rounded-xl lg:p-2'>More Photos</button>
          </div>
  )
}

export default PlaceGallery
