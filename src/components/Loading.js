import React from 'react'
import LoadingGif from '../assets/Logo.png'

function Loading() {
  return (
    <div className='w-100 text-center mt-5 py-3' style={{minHeight: '80vh'}}>
        <img className='col-10 col-md-8 col-lg-6 col-xl-4 my-2' src={LoadingGif} alt='Loading'/>
        <p className='my-3 fs-5'>Loading...</p>
    </div>
  )
}

export default Loading