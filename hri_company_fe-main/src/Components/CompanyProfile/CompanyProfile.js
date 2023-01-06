import React, { useEffect, useState } from "react";
import Header from "../NavBar-Sidebar/Header";
import { selectHeader } from "../features/HeaderSlice";
import { useSelector } from "react-redux";
import logo from "../NavBar-Sidebar/HRI_Company_logo.png"
import {RiBuildingFill} from "react-icons/ri"
import Button from "@mui/material/Button";
import { GoLocation } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import Cookies from "universal-cookie";
import { BsFillDiamondFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import comp from "./CompPng.png";
import {MdAddCircleOutline} from "react-icons/md"
import Header_Navbar from "../NavBar-Sidebar_CompanyList/Header_Navbar";
const cookies = new Cookies();

const CompanyProfile = () => {
  const [complogo,setCompLogo] = useState("")
  const [data,setData] = useState([])
  const [name,setName] = useState("")
  const [status,setStatus] = useState("")
  const [ceo,setCeo] = useState("")
  const [hr,setHr] = useState("")
  const [established,setEstablished] = useState("")
  const [workingSector,setWorkingSector] = useState("")
  const [founder,setFounder] = useState("")
  const [phone,setPhone] = useState("")
  const [emp,setEmp] = useState("")

  const [address,setAddress] =useState("")
  const [city,setCity] =useState("")
  const [state,setState] =useState("")
  const [country,setCountry] =useState("")
  const [desc,setDesc] =useState("")
  const [compUrl,setCompUrl] =useState("")
  const [facebook,setFacebook] =useState("")
  const [linkedIn,setLinkedIn] =useState("")
  const [complogo1,setCompLogo1] = useState("")


  async function getData() {
    await axios
      .get("hri_company/company", {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setData(resp.data)
        setName(resp.data.name)
        setCompLogo(resp.data.company_logo)
        setStatus(resp.data.status)
        setCeo(resp.data.company_ceo)
        setHr(resp.data.contact_person)
        setEstablished(resp.data.established_in)
        setWorkingSector(resp.data.working_sector)
        setFounder(resp.data.company_founder)
        setPhone(resp.data.company_number)
        setEmp(resp.data.company_employee)
        setAddress(resp.data.address)
        setCity(resp.data.city)
        setState(resp.data.state)
        setCountry(resp.data.country)
        setDesc(resp.data.company_description)
        setCompUrl(resp.data.company_url)
        setFacebook(resp.data.facebook_url)
        setLinkedIn(resp.data.linkedin_url)
        setCompLogo1(resp.data.logo_url)
        cookies.set("companyName",resp.data.name)
        cookies.set("companyProfile",resp.data.company_logo)

        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const currentState = useSelector(selectHeader);
  return (
    <>
      <Header />
      {data.length === 0?  <div
           
           className="pt-5 pb-20  bg-gray-100 px-4 mt-[68px]  md:px-10   w-full h-screen"
         >
           <div
             className={
               !currentState?.show
                 ? " lg:ml-72 ease-in duration-300 "
                 : " ease-in  duration-300  ml-0 "
             }
           >
             <div className="bg-white  px-8 md:px-12 pb-20 pt-8 w-full rounded-lg h-[500px]">
             <div className="flex justify-center"><RiBuildingFill className="text-8xl mt-20 text-blue-400"/></div>
             <div className="mx-56 mt-7"> 
             <Link to="/CreateCompanyProfile" >
             <Button  className="w-full h-10" variant="contained">
                 Add Company Profile <MdAddCircleOutline className="text-xl ml-4 text-white"/>
               </Button>
               </Link>
               </div>
             </div>
              
           </div>
           </div>: <div
           
           className="pt-5 pb-20  bg-gray-100 px-4 mt-[68px]  md:px-10   w-full h-auto"
         >
           <div
             className={
               !currentState?.show
                 ? " lg:ml-72 ease-in duration-300 "
                 : " ease-in  duration-300  ml-0 "
             }
           >
             <div className="bg-white px-8 md:px-12 pb-20 pt-8 w-full rounded-lg h-auto">
               <div className="md:flex  justify-between">
                 <div className=" md:flex justify-center">
                 <div className="flex justify-center ">
               <div className="w-20 ">
                 <img
                   className="w-20 h-20 mt-2   border-2 border-gray-600 rounded-full "
                   src={complogo? complogo : comp}
                   alt=""
                 />
               </div>
             </div>
                   <div className="flex justify-center">
                     <div className="font-semibold mt-2  md:mt-4 md:ml-4 text-lg md:text-2xl">
                       {name}
                     </div>
                   </div>
                 </div>
                 <div className="">
                   <div className="lg:flex mt-2 lg:mt-0 lg:space-x-4 lg:space-y-0 space-y-2">
                    
                     <div
                       className={`${
                             status ? "text-green-600" : "text-gray-400 "
                       } " flex justify-center bg-slate-100 px-4 py-2 rounded-lg font-semibold text-sm"`}
                     >
                       <BsFillDiamondFill className=" mt-1 mr-2" />{" "}
                       {    status
                         ? "Actively Hiring"
                         : "In-Actively Hiring"}{" "}
                     </div>
                     <Link to="/CompanyEdit">
                 <div className="flex cursor-pointer mt-2 lg:mt-0 justify-center bg-slate-100 px-4 py-2 rounded-lg font-semibold text-blue-600 ">
                   Edit <AiOutlineEdit className="ml-2  text-xl " />
                 </div>
                 </Link>
                   </div>
                   <div></div>
                 </div>
               </div>
               <div className="text-center md:text-left md:flex mt-5 md:mt-0 text-sm font-semibold ml-2 md:ml-24">
                 <div className="grid gap-y-5">
                   <div className="grid gap-y-2">
                     <div className="text-gray-400 ">CEO</div>
                     <div>{    ceo}</div>
                   </div>
                   <div className="grid gap-y-2">
                     <div className="text-gray-400 ">Human Resources (HR)</div>
                     <div>{    hr}</div>
                   </div>
                   <div className="grid gap-y-2">
                     <div className="text-gray-400 ">Established In</div>
                     <div>{    established.slice(0, 4)}</div>
                   </div>
                   <div className="grid gap-y-2">
                     <div className="text-gray-400 ">Working Sector</div>
                     <div>{    workingSector}</div>
                   </div>
                 </div>
                 <div className="grid gap-y-5 md:ml-20 md:ml-40">
                   <div className="grid gap-y-2">
                     <div className="text-gray-400 ">Founder</div>
                     <div>{    founder}</div>
                   </div>
                   <div className="grid gap-y-2">
                     <div className="text-gray-400 ">HR Office contact</div>
                     <div>{    phone}</div>
                   </div>
                   <div className="grid gap-y-2">
                     <div className="text-gray-400 ">Employees</div>
                     <div>{    emp}</div>
                   </div>
                   <div className="grid gap-y-2">
                     <div className="text-gray-400 ">Location</div>
                     <div className="flex">
                       <GoLocation className="text-gray-400 hidden md:flex text-2xl md:text-xl  mr-2" />{" "}
                       <div className="w-full md:w-2/3 text-center md:text-left">
                         {    address} {    city}, {    state},{" "}
                         {    country}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="md:ml-24 mt-5 font-semibold text-sm text-center md:text-left ">
                 <div className="text-gray-400 ">Company Description</div>
                 <div className=" mt-3">
                  {    desc}
                 </div>
               </div>
               <div className="md:ml-24 mt-5 font-semibold text-sm text-center md:text-left">
                 <div className="text-gray-400 ">Company Social media</div>
                 <div
                   className={
                     !currentState?.show
                       ? "grid xl:grid-cols-2 lg:w-4/5 xl:w-3/5 mt-3 gap-3"
                       : "grid lg:grid-cols-2 lg:w-4/5 xl:w-3/5 mt-3 gap-3"
                   }
                 >
                   {    compUrl?<div className="flex border-2 p-2 rounded-lg pl-4">
                     <FcGoogle className="text-xl mr-2" />
                     {    compUrl}
                   </div>:""}
                   {    facebook ?<div className="flex border-2 p-2 rounded-lg pl-4">
                     <BsFacebook className="text-xl mr-2 text-blue-600" />
                     {    facebook}
                   </div>:""}
                   {    linkedIn?<div className="flex border-2 p-2 rounded-lg pl-4">
                     {" "}
                     <BsLinkedin className="text-xl mr-2 text-blue-600" />{" "}
                     {    linkedIn}
                   </div>:""}
                 </div>
               </div>
               {/* <div className="border-b-2 mt-8 border-gray-500"/> */}
           {/* <div>
             <div className="md:ml-[120px] text-center md:text-left  text-xl font-bold mt-8">Company details</div>
             <div className=" md:ml-[120px] text-center md:text-left  mt-5 md:flex md:space-x-16">
               <div >
                 <div className="text-gray-400 font-semibold ">Company Logo</div>
                 <div className="flex justify-center mt-2"><img className="w-12" src={complogo1} alt=""/></div>
               </div>
               <div>
                 <div className="text-gray-400 font-semibold mb-2 mt-6 md:mt-0">Company Name</div>
                 <div className="  text-xl">Company name</div>
               </div>
               <div>
                 <div className="text-gray-400 font-semibold mb-2 mt-6 md:mt-0">Company Name</div>
                 <div className="  text-xl">Company Tagline shown here</div>
               </div>
             </div>
           </div> */}
             </div>
            
           </div>
           
         </div>}
    
     
          
      
    </>
  );
};

export default CompanyProfile;
