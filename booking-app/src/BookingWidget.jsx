import React from 'react'

const BookingWidget = ({place}) => {
  return (
    <div className='bg-white shadow p-4 rounded-xl text-black mt-9 md:mt-0'>
                      <div className='text-2xl font-bold text-center'> Price : ${place.price}/ per night</div>
                      <div className='my-4 p-4 rounded-2xl bg-gray-200'> 
                          <label>Check In : </label>
                          <input className='bg-gray-200' type="date" />
                      </div>
                      <div className='my-4 p-4 rounded-2xl bg-gray-200'> 
                          <label>Check Out : </label>
                          <input className='bg-gray-200' type="date" />
                      </div>
                      <div className='my-4 p-2 rounded-2xl bg-gray-200'> 
                          <label>Number of Guests : </label>
                          <input className='bg-gray-200 border-stone-500' type="number" value={1} />
                      </div>
                      <div className='flex flex-col items-center'> 
                      <button className='w-44 mt-4  border rounded-xl py-2 px-2 text-lg font-medium text-lodgist1 bg-sky-400 '> Book The Place </button>
                  </div>
                  </div>
  )
}

export default BookingWidget
