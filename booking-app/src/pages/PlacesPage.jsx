import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Perks from './../Perks';
import  axios  from 'axios';


const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)



  function inputHeader(text) {
    return(
      <h2 className='mt-6 text-lg'>{text}</h2>
    ) 
  }

  function inputDescription(text) { 
    return (  
      <p className='text-stone-500 text-sm'> { text }</p>
    )
  }

  function preInput(header, description) { 
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
        </>
     )
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault()
    const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
    setAddedPhotos(prev => {
      return [...prev, filename]
    });
    setPhotoLink('')
  }


  function uploadPhoto(ev) {  
    const files = ev.target.files;
    const data = new FormData();  
    for (let i = 0; i < files.length; i++) {  
      data.append('photos', files[i])
    }
    axios.post('/upload', data, { 
      headers : { 'Content-type' : 'multipart/form-data'}
    }).then(response => { 
      const { data : filenames } = response;
       setAddedPhotos(prev => {
      return [...prev, ...filenames]
    });
    })
  }


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
          <form className='px-12'>  
            {preInput('Title','Title for your place, must be short and nice')}
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title' />
            
            {preInput('Address', 'Address to visit your place')}
            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder='address' />
            
            {preInput('Photos')}
            <div className='flex gap-2'>
              <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder='Add using a link...' />
              <button onClick={addPhotoByLink} className='bg-zinc-600 text-lodgist1  rounded'>Add &nbsp; photos</button>
            </div>
            <div className='mt-2 grid-cols-3 gap-2 md:grid-4 lg:grid-cols-6'> 
            {addedPhotos.length > 0 && addedPhotos.map(link => (      
                <div className='h-50 mt-1 flex flex-row' >   
                 <img className='rounded-2xl w-80' src= {'http://localhost:8080/uploads/'+ link} alt="image" />
                </div>
              ))}
              <label className='border bg-transparent rounded-xl p-9 flex gap-3 mt-5 w-44'> 
                <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                Upload  
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
            </label>
            </div>

            {preInput('Description', 'Description about the place')}
            <textarea  value={description} onChange={ ev => setDescription(ev.target.value)} className='w-full border py-6 px-2 mt-6' />
            
            {preInput('Perks', 'Select all the perks')}
            <div className='grid mt-4 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>   
              < Perks selected={perks} onChange ={ setPerks} />
            </div>

            {preInput('Extra Information', 'Rules...')}
            <textarea value={extraInfo} onChange={ ev => setExtraInfo(ev.target.value)} className='w-full border mt-6' />

            {preInput('Check In & Out','check in & out .......')}
            <div className='grid sm:grid-cols-3 gap-2'> 
              <div>     
                <h3 className='mt-2 -mb-1'>Check In Time</h3>
                <input type="text" value={checkIn} onChange={ ev => setCheckIn(ev.target.value)} placeholder='14:00' />
              </div>
              <div>     
                <h3>Check Out Time</h3>
                <input type="text" value={checkOut} onChange={ ev => setCheckOut(ev.target.value)} placeholder='14:00' />
              </div>
              <div>     
                <h3>Max Guest</h3>
                <input type="number" value={maxGuests} onChange={ ev => setMaxGuests(ev.target.value)} />
              </div>
            </div>
           <button className='w-44 mt-4   border rounded-xl py-2 px-2 text-lg font-medium text-lodgist1 bg-sky-400 '>Save</button>
        </form>
        </div>
      )}
      
    </div>
  )
}

export default PlacesPage
