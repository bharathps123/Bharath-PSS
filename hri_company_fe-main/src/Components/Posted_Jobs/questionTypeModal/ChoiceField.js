import { Button, Popover } from 'antd'
import React, { useState } from 'react'
import {AiFillEye} from 'react-icons/ai'


const ChoiceField = ({option,rytAns ,answer,questionNum}) => {

  
  const newOption= option.split(',')
  console.log('newOption', newOption)
  return (
    <div className="bg-gray-100 mt-10 lg:mx-20 px-4 py-5 rounded-md text-gray-500">
      <div className='text-[18px] fon'>Question {questionNum}</div>
    <div>
    It is a long established fact that a reader will be distracted by
    the readable content of a page when looking
    </div>
 
      <div className="grid gap-y-3 w-1/2 mt-4">
        {newOption.map((item,index) =>{
          return(
            <div key={item}>
            {item === rytAns ? 
              <div  className="bg-white flex justify-between shadow shadow-outline border border-blue-400 py-2 px-3 font-semibold text-sm rounded-md"><div>{index+1} ) {item}  </div>
               <Popover content={answer} >
 <AiFillEye className='text-[18px] cursor-pointer'/>
  </Popover></div>
              : <div className="bg-white  py-2 px-3 font-semibold text-sm rounded-md">{index+1} ) {item}</div>
            }
           </div>

          )
        })}
      
   
      </div>
  </div>
  )
}

export default ChoiceField