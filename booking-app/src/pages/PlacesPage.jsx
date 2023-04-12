import React from 'react'
import { Link, useParams } from 'react-router-dom';
import AccountNavigation from './../AccountNavigation';



const PlacesPage = () => {

  return (
    <div>
      <AccountNavigation />
      
        <div className='text-center'>
        < Link to={'/account/places/new'} className='inline-flex   border rounded-full py-2 px-3 text-lg font-medium text-stone-700 bg-amber-500 gap-2' > Add New Place
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </Link>
        <br />
        <h3 className='mt-2'>List of all added places</h3>
      </div>
    </div>
  )
}

export default PlacesPage
