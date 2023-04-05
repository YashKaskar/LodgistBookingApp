import React from 'react'
import { Link, useParams } from 'react-router-dom';

const PlacesPage = () => {
  const { action } = useParams();
  return (
    <div>
      {action !== 'new' && (  
        <div className='text-center'>
        < Link to={'/account/places/new'} className='inline-flex   border rounded-full py-2 px-3 text-lg font-medium text-stone-700 bg-amber-500 gap-2' > Add New Place
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </Link>
      </div>
      )}
      {action === 'new' && (
        <div>
          <form className='p-6'>  
            <h2 className='mt-6 text-lg'>Title</h2>
            <p className='text-stone-500 text-sm'>Title for your place, must be short and nice</p>
            <input type="text" placeholder='title' />
            <h2 className='mt-6 text-lg'>Address</h2>
            <p className='text-stone-500 text-sm'>Address to visit your place</p>
            <input type="text" placeholder='address' />
            <h2 className='mt-6 text-lg'>Photos</h2>
            <div className='flex gap-2'>
              <input type="text" placeholder='Add using a link...' />
              <button className='bg-zinc-600 text-lodgist1  rounded'>Add &nbsp; photos</button>
            </div>
            <div className='mt-2 grid-cols-3 md:grid-4 lg:grid-cols-6'> 
            <button className='border bg-transparent rounded-xl p-9 flex gap-3 mt-5'> 
                Upload  
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
            </button>
            </div>
        </form>
        </div>
      )}
      
    </div>
  )
}

export default PlacesPage
