import {  useEffect, useState } from 'react';
import Perks from './../Perks';
import axios from 'axios';
import PhotoUploader from './../PhotoUploader';
import AccountNavigation from './../AccountNavigation';
import { Navigate, useParams } from 'react-router-dom';



export default function PlacesFormPage() {  

  const { id } = useParams();
  console.log({id})
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false)
    
  useEffect(() => {   
    if (!id) { 
      return;
    }
    axios.get('/places/' + id).then(response => { 
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    })
  },[id])
  
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
  
  
      function savePlace(ev) {  
        ev.preventDefault();
        const placeData = {
          title, address, addedPhotos,
          description, perks, extraInfo,
          checkIn, checkOut, maxGuests, price
        };
        if (id) {  
          axios.put('/places', {
            id, ...placeData
          });
          setRedirect(true)
        } else {
          axios.post('/places', placeData);
          setRedirect(true)
        }
      
  }
  
  
  if (redirect) {  
        return <Navigate to={'/account/places'} /> 
      }
  
  
    return (
        
      <div>
        <AccountNavigation />
        <form className='px-12' onSubmit={savePlace}>  
          {preInput('Title','Title for your place, must be short and nice')}
          <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title' />
          
          {preInput('Address', 'Address to visit your place')}
          <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder='address' />
          
          {preInput('Photos')}
          <PhotoUploader addedPhotos={addedPhotos}  onChange={setAddedPhotos} />

          {preInput('Description', 'Description about the place')}
          <textarea  value={description} onChange={ ev => setDescription(ev.target.value)} className='w-full border py-6 px-2 mt-6' />
          
          {preInput('Perks', 'Select all the perks')}
          <div className='grid mt-4 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>   
            < Perks selected={perks} onChange ={ setPerks} />
          </div>

          {preInput('Extra Information', 'Rules...')}
          <textarea value={extraInfo} onChange={ ev => setExtraInfo(ev.target.value)} className='w-full border mt-6' />

          {preInput('Check In & Out','check in & out .......')}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-2'> 
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
            <div>     
              <h3>Price per night </h3>
              <input type="number" value={price} onChange={ ev => setPrice(ev.target.value)} />
            </div>
          </div>
         <button className='w-44 mt-4 center  border rounded-xl py-2 px-2 text-lg font-medium text-lodgist1 bg-sky-400 ' >Save</button>
      </form>
      </div>
    )
}