import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { hiding, selectHeader, showing } from '../features/HeaderSlice';
import Button from '@mui/material/Button';

const MessageHeader = () => {

    
    const currentState = useSelector(selectHeader);

  return (
    <div className='bg-gray-100 w-full h-auto'>
        <div className={!currentState?.show?' lg:ml-72 ease-in duration-300 ' : ' ease-in  duration-300  ml-0 '}>
           <div className='flex bg-white   justify-between'>
           <div className={!currentState?.show?'bg-white flex   text-xs md:text-xs lg:text-xl  font-semibold p-1 text-gray-600  md:p-2 ':"bg-white flex   text-xs md:text-lg lg:text-xl  font-semibold p-1 text-gray-600  md:p-2 "}>
                <div className={!currentState?.show?'p-3 rounded-lg  font-normal':'p-3 rounded-lg  font-normal'}>Messages from:</div>
                <div className={!currentState?.show?'p-3 rounded-lg md:px-3 lg:px-8 hover:bg-slate-100 hover:text-blue-700':'p-3 rounded-lg md:px-8 hover:bg-slate-100 hover:text-blue-700'}>Users</div>
                <div className={!currentState?.show?'p-3 rounded-lg md:px-3 lg:px-8 hover:bg-slate-100 hover:text-blue-700':'p-3 rounded-lg md:px-8 hover:bg-slate-100 hover:text-blue-700'}>Companies</div>    
            </div>
            
            </div>    
        </div>
        </div>
  )
}

export default MessageHeader