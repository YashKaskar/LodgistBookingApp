import { useState } from "react";
import  axios  from 'axios';

export default function PhotoUploader({addedPhotos, onChange}) {
    const [photoLink, setPhotoLink] = useState('')
   
      async function addPhotoByLink(ev) {
        ev.preventDefault()
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        onChange(prev => {
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
           onChange(prev => {
          return [...prev, ...filenames]
        });
        })
    }
    



    return (
        <>
            <div className='flex gap-2'>
              <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder='Add using a link...' />
              <button onClick={addPhotoByLink} className='bg-zinc-600 text-lodgist1  rounded'>Add &nbsp; photos</button>
            </div>
            <div className='mt-2 grid-cols-3 gap-2 md:grid-4 lg:grid-cols-6'> 
            {addedPhotos.length > 0 && addedPhotos.map(link => (      
                <div className='h-50 mt-1 flex flex-row'key={link} >   
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
        </>
        );
}