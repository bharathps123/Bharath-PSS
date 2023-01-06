import { Input } from 'antd'
import React from 'react'

const ChoiceFieldCreate = ({form}) => {
  return (
    <>
    <div className="mt-4">
                <Input size="large" style={{ borderRadius: "5px" }} />
              </div>
              <div className="grid gap-y-3 w-1/2 mt-4">
    <Input prefix="1)" />

    {/* <div  className="bg-white flex justify-between shadow shadow-outline border  py-2 px-3 font-semibold text-sm rounded-md">
   
 sdfsdfsdf</div> */}
    <Input prefix="2)" style={{ borderRadius: "5px" }} />
    <Input prefix="3)" style={{ borderRadius: "5px" }} />
    <Input prefix="4)" style={{ borderRadius: "5px" }} />
  </div>
    </>
   
  )
}

export default ChoiceFieldCreate