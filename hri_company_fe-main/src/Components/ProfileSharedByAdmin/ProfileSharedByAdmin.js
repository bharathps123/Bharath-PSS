import React, { useEffect, useState } from 'react'
import Header from '../NavBar-Sidebar/Header'
import { selectHeader } from "../features/HeaderSlice";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import {BiChevronDown} from "react-icons/bi"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const status =[
  {
    id: "Applied",
    name : "Applied"
  },
  {
    id: "In-Review",
    name : "In-Review"
  },
  {
    id:"Interview",
    name : "Interview"
  },
  {
    id: "Selected",
    name : "Selected"
  },
]

const cookies = new Cookies();

const ProfileSharedByAdmin = () => {
  const [statusId,setStatusId] = useState("")
  const statusChange = (e) => {
    setStatusID(e.target.value);
  };
  const [statusID,setStatusID] = useState('')
  useEffect(() =>{
    axios
    .post(`hri_company/application/status-change/${statusId}`,{
      status: statusID
    }, {
      headers: {
        Authorization: "Token " + cookies.get("token"),
      },
    })
    .then((resp) => {
     console.log(resp.data)
    })
    .catch((err) => {
      console.log(err);
    });
  },[statusID])
  const navigate = useNavigate();
    const currentState = useSelector(selectHeader);
 
    const [data, setData] = useState([]);
   
    async function getData(){
      await axios
        .get("hri_company/profileshare", {
          headers: {
            Authorization: "Token " + cookies.get("token"),
          },
        })
        .then((resp) => {
          setData(resp.data);
          console.log(resp.data);
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
   


   

    useEffect(() => {
      
      getData();
        
    
  }, []);

  return (
    <>
    <Header />
      <div>
      <div className="bg-gray-100 pb-10 mt-[68px]  w-full h-screen">
        <div
          className={
            !currentState?.show
              ? " lg:ml-72 ease-in duration-300 "
              : " ease-in  duration-300  ml-0 "
          }
        >
            <div className='flex bg-white   justify-between'>
      
           
            </div> 
            <div className='overflow-auto mx-2 mt-2  rounded-lg shadow  mb-20'>
        <table className="w-full ">
          <thead className="bg-white border-b-2 border-black">
            <tr className='text-black '>
              
              <th className="w-10 pl-[-200px]  p-3 text-lg font-semibold tracking-wide text-left pl-10">
                 Applicants 
              </th>
              <th className="w-10 p-3  text-lg font-semibold tracking-wide text-center">
              Shared at
              </th>
              <th className="w-20 p-3  text-lg font-semibold tracking-wide text-center">
                Status
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                Details
              </th>
           
            </tr>
          </thead>
          
        
            <tbody className="divide-y divide-black text-center">
             {data.map((user) => {
             const date = new Date(user.updated_at.slice(0,10))
             const month = date.toLocaleString('default', { month: 'long' });
              
              return ( 
                <tr
                  
                key={user.id}
                
                  
                  className="bg-white cursor-pointer hover:bg-gray-100"
                  
                >
                  
                  <td className="p-3   text-base pl-10 text-gray-700 whitespace-nowrap">
                   <div className='flex'>
                     <div className='w-12 h-12 '> 
                       <img className='rounded-full w-12 h-12' src={user.user_pic} alt=""/>
                     </div>
                     <div className='ml-4 text-left'>
                       <div >{user.user_fname}&nbsp;{user.user_lname}</div>
                       <div className='text-sm text-gray-400'>as {user.job_name}</div>
                     </div>
                     </div> 
                   
                  </td>
                  <td  className="p-3 text-base text-gray-700 whitespace-nowrap">
                  {date.getDate()}&nbsp;
                   {month.slice(0,3)}&nbsp;
                   {date.getFullYear()}
                  </td>
                  <td  className="p-3 flex justify-center mt-2  text-base text-gray-700 whitespace-nowrap">
                  <select
                  value={user.status}
                  onClick={() => setStatusId(user.id)}
                  className="form-select border-none w-28  ml-1  appearance-none block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border  border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                
                  onChange={statusChange}
                >
                  <option
                    className="h-20  dropdown-item text-sm  py-2 px-4 font-normal  block  w-full  whitespace-nowrap bg-transparent text-gray-400 pointer-events-none"
                  disabled
                  >
                    
                   Select Status
                  </option>

                   {status.map((user) => (
                <option className="h-20" key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))} 
                </select>
                  </td>
                  <td 
                   onClick={() => {navigate("/ProfileShearedByAdminDetails"); cookies.set("profileSharedByAdminID",user.id)}}
                  className="p-3  text-base  whitespace-nowrap">
                    <div className='bg-gray-100  hover:bg-gray-200  py-2 rounded-lg px-[-20px] text-black '> View Profile </div>
                  </td>
                  
                </tr>
              
             )}
            )} 
            </tbody>
          
          
        </table>
    
        </div>
        </div>
        
        </div>
        
        </div>
    </>
  )
}

export default ProfileSharedByAdmin