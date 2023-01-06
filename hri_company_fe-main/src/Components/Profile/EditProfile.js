import React, { useEffect, useState } from 'react'
import Header from '../NavBar-Sidebar/Header'
import { selectHeader } from "../features/HeaderSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";
import comp from "./profile.jpeg";
import {FaRegEdit} from "react-icons/fa"
import TextField from "@mui/material/TextField";
import {RiCheckDoubleFill} from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();

const EditProfile = () => {
  const navigate = useNavigate();

    const currentState = useSelector(selectHeader);

    const [email,setEmail]= useState("")
    const [id,setId]= useState("")
    const [name,setName]= useState("")
    const [phone,setPhone] = useState('')
    const [dob,setDob] = useState('')
    const [empId,setEmpId] =useState('')
    const [role,setRole] = useState("")
    const [gender,setGender] =useState("")
    const [about,setAbout] = useState("")
    const [image,setImage] = useState("")
    const [otp,setOtp] = useState('')
    
    async function updateImage(e){
      e.preventDefault();
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      console.log(formData)
      axios
        .put(`auth/user/profile/update/${id}`, formData, {
          headers: {
            Authorization: "Token " + cookies.get("token"),
          },
        })
        .then((res) => {
          setImage(formData)
          cookies.set("image",image)
          console.log(image)
          console.log(res);
          })
        .catch((err) => {
          console.log(err);
        });
    };


    async function updateData(e){
      e.preventDefault();
     
      
      axios
        .put(`auth/user/profile/update/${id}`, 
        {
          name: name,
          otp: otp,
          gender: gender,
          otp_phone: phone,
          role: role,
          employee_id: empId,
          dob: dob,
          about_you: about
        }, {
          headers: {
            Authorization: "Token " + cookies.get("token"),
          },
        })
        .then((res) => {

          navigate("/Profile");
          toast.success("Edited Sucessfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          })
          .catch(function (error) { 
              toast.error( "Please re-check the form!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
               
          });
    };


    async function getData() {
      await axios
        .get("auth/user/profile", {
          headers: {
            Authorization: "Token " + cookies.get("token"),
          },
        })
        .then((resp) => {
          console.log(resp.data)
          setEmail(resp.data.user.email)
          setId(resp.data.user.id)
          setName(resp.data.user.profile.name)
          setPhone(resp.data.user.profile.otp_phone)
          setDob(resp.data.user.profile.dob)
          setEmpId(resp.data.user.profile.employee_id)
          setRole(resp.data.user.profile.role)
          setGender(resp.data.user.profile.gender)
          setAbout(resp.data.user.profile.about_you)
          setImage(resp.data.user.profile.image)
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    useEffect(() => {
      setOtp(cookies.get("otp"))
      setId(cookies.get("id"))
      getData();
    }, [image]);
  return (
   <>
   <Header />
      <div className="pt-5 pb-20 mt-[68px] bg-gray-100 px-4  md:px-10   w-full h-auto">
        <div
          className={
            !currentState?.show
              ? " lg:ml-72 ease-in duration-300 "
              : " ease-in  duration-300  ml-0 "
          }
        >
             <div className="bg-white px-4 md:px-10 pb-20 pt-8 w-full rounded-lg h-auto">
             <div className='md:flex justify-between'>
                 <div className='md:w-80'>
                 <div className="flex justify-center ">
                <div className="w-20  border-gray-600 cursor-pointer rounded-full">
                  <img
                    style={{filter:"blur(1.2px)"}}
                    className="w-20 h-20  rounded-full "
                    src={image? image : comp}
                    alt=""
                  />
                                    <label className=''>
                  <FaRegEdit className="text-xs  absolute mt-[-45px] ml-8 text-lg xl:text-lg 2xl:text-2xl md:text-base  cursor-pointer" />
                  <input  className='w-20' type="file" onChange={updateImage} style={{visibility: "hidden"}}/>
              </label>
                </div>
              </div>
                 </div>
                 <div className=' w-full mx-10  ml-[-10px]'>
                   <div className='grid md:grid-cols-2 gap-y-4 gap-x-4'>
                   
                       <div>
                       <div className="">
                   
                    <div className='text-gray-400 font-semibold' >Full Name</div>
               
                <TextField
                   className="w-full "
                  value={name}
                  id="outlined-size-small"
                  onChange={(e) => setName(e.target.value)}
                  size="small"
                />
              </div>
                       </div>
                       <div> <div className="">
                       <div className='text-gray-400 font-semibold' >Email ID</div>
                <TextField
                  className="w-full "
                  value={email}
                  id="outlined-size-small"
                  onChange={(e) => setEmail(e.target.value)}
                  size="small"
                />
              </div></div>
                      
                          <div className="">
                          <div className='text-gray-400  font-semibold' >Date of Birth</div>
                <TextField
                  className="w-full "
                  value={dob}
                  id="outlined-size-small"
                  onChange={(e) => setDob(e.target.value)}
                  size="small"
                />
              </div>
             <div>
                          <div className='text-gray-400  font-semibold' >Contact</div>
                <TextField
                  className="w-full "
                  value={phone}
                  id="outlined-size-small"
                  onChange={(e) => setPhone(e.target.value)}
                  size="small"
                  type='number'
                />
              </div>
              
                    
                    
                      <div className="">
                          <div className='text-gray-400 font-semibold' >Employee ID</div>
                <TextField
                  className="w-full "
                  value={empId}
                  id="outlined-size-small"
                  onChange={(e) => setEmpId(e.target.value)}
                  size="small"
                />
              </div>
                       <div className="">
                          <div className='text-gray-400 font-semibold' >Designation</div>
                <TextField
                  className="w-full "
                  value={role}
                  id="outlined-size-small"
                  onChange={(e) => setRole(e.target.value)}
                  size="small"
                />
              </div>
                         <div className="">
                          <div className='text-gray-400 font-semibold' >Gender</div>
                <TextField
                  className="w-full "
                  value={gender}
                  id="outlined-size-small"
                  onChange={(e) => setGender(e.target.value)}
                  size="small"
                />
              </div>
              </div>
                   
                   <div className='mt-10'>
                   <div className='text-gray-400 font-semibold' >About You</div>
                   <div className='lg:pr-20'>
                   <textarea
            
            className="h-28  mt-2   2xl:placeholder:pl-6 placeholder:text-xs md:placeholder:text-base xl:placeholder:text-lg 2xl:placeholder:text-3xl 2xl:mt-6 mt-1 rounded-lg block  w-full border border-slate-300  py-2 pl-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Discribe anything in message"
            cols="10"
            rows="5"
            value={about?about:"Discrobe about yourself"}
            onChange={(e) => setAbout(e.target.value)}
          />
                   </div>
                   </div>
                 </div>
                 <div className=''>
                 <Link to="/Profile">
                 <div onClick={updateData} className=' mt-5 md:mt-0 w-full px-10  h-10 flex justify-center  bg-slate-100 rounded-lg'>
                 <div  className='  flex bg-slate-100 my-2 text-blue-700 '>
                   <div>Save</div> <RiCheckDoubleFill className='ml-2 mt-[1px] text-xl'/></div>
                 </div>
                 </Link>
                 </div>
             </div>
           
             
             </div>
            
        </div>
        </div>

   </>
  )
}

export default EditProfile