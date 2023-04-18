import { useState } from "react";
import  axios  from 'axios'

export default function PhotoUploader({ addedPhotos, onChange }) {
  
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
    
  function removePhoto(ev, filename) {
    ev.preventDefault();
    onChange([...addedPhotos.filter(photo => photo !== filename)])
  }
  
  function selectAsMainPhoto(ev, filename) { 
    ev.preventDefault();
    onChange([filename, ...addedPhotos.filter(photo => photo !== filename)])
  }



    return (
        <>
            <div className='flex gap-2'>
              <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder='Add using a link...' />
              <button onClick={addPhotoByLink} className='bg-zinc-600 text-lodgist1  rounded'>Add &nbsp; photos</button>
            </div>
            <div className='mt-2 grid-cols-3 gap-2 md:grid-4 lg:grid-cols-6 relative'> 
            {addedPhotos.length > 0 && addedPhotos.map(link => (      
                <div className='h-50 mt-1 flex ' key={link}>   
                <img className='rounded-2xl w-80' src={'http://localhost:8080/uploads/' + link} alt="image" />
                <button onClick={ev => removePhoto(ev, link)} className=" cursor-pointer absolute  text-red-500 bg-lodgist1 bg-opacity-60 rounded-xl py-2 px-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                </button>
                <button onClick={ev => selectAsMainPhoto(ev, link)} className=" cursor-pointer absolute mt-40 text-orange-500 bg-zinc-900 bg-opacity-60 rounded-xl py-2 px-3">
                  {link === addedPhotos[0] && ( 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>                  
                  )}
                  {link !== addedPhotos[0] && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  )}
                </button>
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