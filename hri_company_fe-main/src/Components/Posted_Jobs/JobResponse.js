import React, { useEffect, useState } from 'react'
import Header from '../NavBar-Sidebar/Header'
import {  selectHeader} from '../features/HeaderSlice';
import { useSelector} from 'react-redux';
import {AiFillEye} from "react-icons/ai";
import axios from 'axios';
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {BsFillBookmarkFill} from 'react-icons/bs'

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

const JobResponse = () => {
  const [statusId,setStatusId] = useState("")
  const [data, setData] = useState([]);
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
   
 
   
    async function getData(){
      await axios
        .get(`hri_company/applicant-list/${cookies.get('jobId')}`, {
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
  }, [statusID]);
  const currentState = useSelector(selectHeader);

 
  return (
    <>
        <Header/>
        
       
        <div className='bg-gray-100 w-full h-auto mt-[68px]'>
        <div className={!currentState?.show?' lg:ml-72 ease-in duration-300 ' : ' ease-in  duration-300  ml-0 '}>
            
            <div  className='mt-5 pb-10  '>
            <div className='overflow-auto mx-2 mt-2  rounded-lg shadow  mb-20'>
        <table className="w-full ">
          <thead className="bg-white border-b-2 border-black">
            <tr className='text-black '>
              
              <th className="w-10  p-3 text-lg font-semibold tracking-wide text-left pl-10">
                 Applicants 
              </th>
              <th className="w-10 p-3  text-lg font-semibold tracking-wide text-center">
              Applied on
              </th>
              <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
              Resume
              </th>
              <th className="w-20 p-3  text-lg font-semibold tracking-wide text-center">
                Status
              </th>
              <th className="w-20 p-3  text-lg font-semibold tracking-wide text-center">
                
              </th>
              <th className="w-20 p-3  text-lg font-semibold tracking-wide text-center">
                
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
                       <div >{user.user_firstname}&nbsp;{user.user_lastname}</div>
                       <div className='text-sm text-gray-400'>as {user.job_name}</div>
                     </div>
                     </div> 
                   
                  </td>
                  <td  className="p-3 text-base text-gray-700 whitespace-nowrap">
                  {date.getDate()}&nbsp;
                   {month.slice(0,3)}&nbsp;
                   {date.getFullYear()}
                  </td>
                  <td  className="p-3 text-base text-gray-700 flex justify-center whitespace-nowrap">
                  <div key={user.id}  data-bs-toggle="modal" data-bs-target="#exampleModalScrollable" className="ml-1 cursor-pointer md:ml-24 mt-8">
                              <div
                                class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                                id="exampleModalScrollable"
                                tabIndex="-1"
                                aria-labelledby="exampleModalScrollableLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
                                  <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                    <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                      <h5
                                        class="text-xl font-medium leading-normal text-gray-800"
                                        id="exampleModalScrollableLabel"
                                      >
                                        <div className='break-words break-all w-10'>
                                        <p className='break-words break-all break-normal w-10 bg-red-600' >
                                          {/* {user.resume_name} */}
                                        </p>
                                        </div>
                                       
                                       
                                      </h5>
                                    </div>
                                    <div class="modal-body relative p-4">
                                      <iframe src={user.user_resume} title='...' width="100%" className="h-96"  ></iframe>
                                    </div>
                                    <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                      <button
                                        type="button"
                                        class="inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                             
                             
                            </div>
                            <div className="flex ml-[-90px] mt-4  justify-center">
                              <div className="flex">
                  <AiFillEye className='mt-1'/> <div  data-bs-toggle="modal" data-bs-target="#exampleModalScrollable" className='text-sm ml-2  cursor-pointer text-blue-500 underline'>   
                                        <p className=' break-words  w-28 truncate' >
                                          {user.resume_name}
                                        </p>
                                        </div>
                  </div>
                  </div>
                  </td>
                  <td  className="p-3 text-base text-gray-700 whitespace-nowrap ">
                 <div className="flex justify-center">
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
                 </div>
                 
                  </td>
                  <td>
                    {user.is_assessment === true ?<div onClick={() => { cookies.set('assimentId' , user.assessment_id); cookies.set('userId' , user.user); navigate('/Survey');}} className='bg-blue-700 py-2 text-white rounded-md'>Evaluate</div> : null}
                    
                  </td>
                  <td>
                    <div className='ml-8 text-lg'><BsFillBookmarkFill/></div>
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

export default JobResponse