import React from 'react';
import axios from 'axios';

export default function Verification({setDoverification,signUser}) {

  return (
    <div className='bg-[#000000a9] fixed top-0 h-screen w-full flex items-center justify-center'>
     <div className='h-[60%] w-[80%] bg-white rounded-lg shadow-white text-center gap-10 p-4 items-center flex flex-col'>
        <p className='text-3xl font-semibold'>Email Verification</p>
        <p className='text-xl font-semibold'>Check your email for OTP and type here to complete Email verification </p>
        <p>{signUser.firstname}</p>
        <input type="text"  placeholder='OTP' className='bg-slate-300 h-[40px] w-[100px] text-xl rounded-lg p-3' />
        <button className='bg-[#22c722] text-white h-[40px] w-[100px] rounded-md hover:bg-green-900'>Verify</button>
        <button onClick={()=>{setDoverification(false);}} className='bg-[#751375] text-white h-[40px] w-[200px] rounded-md hover:bg-purple-900'> Return to Home Page</button>
     </div>
    </div>
  );
}
