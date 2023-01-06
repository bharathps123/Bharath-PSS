import React, { useEffect, useState } from 'react'
import Header from '../NavBar-Sidebar/Header'
import {  selectHeader} from '../features/HeaderSlice';
import { useSelector} from 'react-redux';
import Button from '@mui/material/Button';

import {BsFillDiamondFill} from "react-icons/bs"
import {RiArrowDropDownLine} from "react-icons/ri"
import {IoBriefcaseOutline} from "react-icons/io5"
import {RiMoneyDollarBoxLine} from "react-icons/ri"
import {HiOutlineOfficeBuilding} from "react-icons/hi"
import {BsFileEarmarkText} from "react-icons/bs"
import {VscGraph} from "react-icons/vsc"
import {ImLocation2} from "react-icons/im"
import axios from 'axios';
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {Link,  useParams} from "react-router-dom"
import { useSearchParams } from 'react-router-dom';

const cookies = new Cookies();

const Jobs = () => {

  const navigate = useNavigate();
    const currentState = useSelector(selectHeader);
    const [status,setStatus] = useState("Active")
    const [data, setData] = useState([]);
    const [jobs,setJobs] =useState([])
    
    const [active, setActive] = useState("Active");

    const [searchParams] = useSearchParams();
    console.log(); 
    const Active = () =>{
      setActive("Active")
      setStatus("Active")
    }
    const Requested = () =>{
      setActive("Requested")
      setStatus("Requested")
    }
    const Old = () =>{
      setActive("Old")
      setStatus("Old")
    }
    async function getData(){
      await axios
        .get(`hri_company/jobs?jobs_type=${status}`, {
          headers: {
            Authorization: "Token " + cookies.get("token"),
          },
        })
        .then((resp) => {
          setData(resp.data);
          console.log(resp.data);
          setJobs(resp.data)
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
   
    
      
    useEffect(() => {
      
      getData();
      if(status === "Active"){
        cookies.set("check","Live Jobs")
      }
      if(status === "Requested"){
        cookies.set("check","Requested To Admin")
      }
      if(status === "Old"){
        cookies.set("check","Old Jobs Posts")
      }
      
  
}, [status]);
useEffect(() => {
cookies.set('token',searchParams.get('token') || cookies.get('token'))
console.log('first', searchParams.get('token'))
getData()
},[])

  return (
    <>
        <Header/>
        
       
        <div className='bg-gray-100 w-full h-auto mt-[72px]'>
        <div className={!currentState?.show?' lg:ml-72 ease-in duration-300 ' : ' ease-in  duration-300  ml-0 '}>
           <div className='flex bg-white   justify-between'>
           <div className={!currentState?.show?'bg-white flex  lg:space-x-4 text-xs md:text-xs lg:text-xl  font-semibold p-1 text-gray-600  md:p-2 ':"bg-white flex  lg:space-x-4 text-xs md:text-lg lg:text-xl  font-semibold p-1 text-gray-600  md:p-2 "}>
           {active === "Active"?
                    <div onClick={Active} className={!currentState?.show?'p-3 cursor-pointer rounded-lg lg:py-5 xl:py-3 md:px-3 lg:px-8 bg-slate-100 text-blue-700':'p-3 rounded-lg md:px-8 lg:py-5 xl:py-3 bg-slate-100 text-blue-700'}>Live Jobs</div>
                :<div onClick={Active} className={!currentState?.show?'p-3 rounded-lg cursor-pointer lg:py-5 xl:py-3 md:px-3 lg:px-8 hover:bg-slate-100 hover:text-blue-700':'p-3 rounded-lg md:px-8 lg:py-5 xl:py-3 hover:bg-slate-100 hover:text-blue-700'}>Live Jobs</div>}
                {active === "Requested"?
                    <div onClick={Requested} className={!currentState?.show?'p-3 rounded-lg cursor-pointer lg:py-5 xl:py-3 md:px-3 lg:px-8 bg-slate-100 text-blue-700':'p-3 rounded-lg md:px-8 lg:py-5 xl:py-3 bg-slate-100 text-blue-700'}>Requested to Admin</div>
                :<div onClick={Requested} className={!currentState?.show?'p-3 rounded-lg lg:py-5 cursor-pointer xl:py-3 md:px-3 lg:px-8 hover:bg-slate-100 hover:text-blue-700':'p-3 rounded-lg md:px-8 lg:py-5 xl:py-3 hover:bg-slate-100 hover:text-blue-700'}>Requested to Admin</div>}
                {active === "Old"?
                    <div onClick={Old} className={!currentState?.show?'p-3 rounded-lg lg:py-5 cursor-pointer xl:py-3 md:px-3 lg:px-8 bg-slate-100 text-blue-700':'p-3 rounded-lg md:px-8 lg:py-5 xl:py-3 bg-slate-100 text-blue-700'}>Old Job Posts</div> 
                :<div onClick={Old} className={!currentState?.show?'p-3 rounded-lg lg:py-5 xl:py-3 cursor-pointer md:px-3 lg:px-8 hover:bg-slate-100 hover:text-blue-700':'p-3 rounded-lg md:px-8 lg:py-5 xl:py-3 hover:bg-slate-100 hover:text-blue-700'}>Old Job Posts</div>}
            </div>
            <div className={!currentState?.show?'mt-1 mr-2 md:mt-3 lg:mt-4 md:mr-3 lg:mr-10':'mt-1 mr-2 md:mt-4 md:mr-10'} >
           <Link to="/AddNewPosition">
            <Button className='w-auto ' size="small" variant="contained">Add New Position</Button>
            </Link>
            </div>
            </div>    
            <div  className='mt-5 pb-10 px-4 md:px-10'>
            <div  className='grid   md:grid-cols-2 gap-8'>
             {data.map((user) => {
               const date = new Date(user.updated_at.slice(0,10))
               const month = date.toLocaleString('default', { month: 'long' });
               const myArray = user.skills.split(",");
               
               return (
            
            
            <div key={user.id} onClick={() => {navigate("/JobDetails"); cookies.set("jobId",user.id)}} className='bg-white pt-5 px-5 rounded-lg cursor-pointer hover:bg-slate-100'>
              <div className='md:flex justify-between'>
                <div className='text-lg font-semibold '>{user.position_name}</div>
                {user.is_active?
                  <div className='flex text-green-400 mt-2 md:mt-0'><BsFillDiamondFill className='mt-1 mr-1'/> <div className='font-semibold'>Active </div><RiArrowDropDownLine className='text-black text-2xl'/></div>
                :<div className='flex text-red-500 mt-2 md:mt-0'><BsFillDiamondFill className='mt-1 mr-1'/> <div className='font-semibold'>Completed </div><RiArrowDropDownLine className='text-black text-2xl'/></div>}
              </div>
              <div className='grid w-full md:grid-cols-2  lg:grid-cols-3 gap-y-2 lg:gap-y-0 text-sm gap-x-2 mt-5'>
                <div className='flex'><IoBriefcaseOutline className='text-lg mr-2 text-gray-400'/>{user.experience}</div>
                <div className='flex'><RiMoneyDollarBoxLine className='text-lg mr-2 text-gray-400'/>{user.stipend}</div>
                <div className='flex w-full'><HiOutlineOfficeBuilding className='text-2xl mr-2 text-gray-400'/>{user.employment_type}</div>
              </div>
              <div className='flex mt-3 text-sm'><ImLocation2 className='text-lg mr-2 text-gray-400'/>{user.location}</div>
              <div className='flex  mt-3 text-sm space-x-2'>
                <div className='flex'> <BsFileEarmarkText className='text-lg mr-2 text-gray-400'/>{user.criteria}</div>
                <div className='flex'> <VscGraph className='text-lg mr-2 text-gray-400'/>
                <div className={!currentState?.show?"grid grid-cols-1 md:grid-cols-3 pr-4" : " pr-4 grid md:grid-cols-3 "}>
                    {myArray.map((items)=>
                  
                      <div key={items} className="">{items} </div>
                    
                    )}
                    </div>
                </div>
              </div>
              <div className='flex justify-between'>
              <div className='mt-3 mb-4 text-sm text-gray-400'>Updated At : {date.getDate()}&nbsp;
                   {month.slice(0,3)}&nbsp;
                   {date.getFullYear()}</div>
                   <div className="mt-2 text-sm font-semibold text-blue-700" >View Details</div>
                   </div>
            </div>
             )}
            )} 
             </div>
            </div>
            </div>
            </div>
        
    </>
  )
}

export default Jobs