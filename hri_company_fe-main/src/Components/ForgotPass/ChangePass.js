
import LogImg from '../Login/LoginImg.png'
import  React,{useState,useEffect} from 'react';

import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();


const ChangePass = () => {

    const [newPass, setNewPass] = useState("");
    const [oldPass, setOldPass] = useState("");
    const navigate = useNavigate();
  
    const headers = {
      Authorization: "Token " + cookies.get("token"),
    };
  
    async function done(e) {
      e.preventDefault();
      console.log(newPass,oldPass)
      if (newPass === oldPass){
        axios
        .post(
          "/auth/user/reset/password",
          {
            password: newPass,
          },
          {
            headers: headers,
          }
        )
        .then((resp) => {
          console.log(resp);
          navigate({
            pathname: "/",
            state: { token: resp.data.token },
          });
        })
        .catch((err) => {
          console.log(err);
        });
      }
      
    }


    const [companyName, setCompanyName] = useState("");
  const [tagline, setTagline] = useState("");
  const [terms, setTerms] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState("");

  const GetDetails = () => {
    axios
        .get(
            `profile/landing-page`,
        )
        .then((res) => {
          setCompanyName(res.data.business_details[0].name);
          setTagline(res.data.business_details[0].tag_line);
          setTerms(res.data.business_details[0].terms);
          setPrivacyPolicy(res.data.business_details[0].privacy_policy);
        })
        .catch((err) => {
          console.log("error: ", err)
        })
  };

  useEffect(() => {
    GetDetails();
  }, []);

  return (
    <>
    <div className='mx-8 h-auto  md:mx-20 mt-36 md:mt-28  lg:mt-16'>
    <div className=' md:flex'>
        <div className="hidden md:flex md:flex-col w-1/2">
        <div className='flex md:mt-2'>
          <div className='md:text-lg lg:text-2xl xl:text-3xl lg:mt-1 font-semibold '>
          Welcome to 
          </div>
          <div  className='ml-1  md:text-xl lg:text-3xl xl:text-4xl font-semibold text-[#0865B6]'>
              {companyName}
          </div>
        </div>
        <div className='text-neutral-500 md:text-sm lg:text-lg'>{tagline}</div>
        
        <div className="mt-10 xl:mt-0 xl:pt-10 mb-10 2xl:p-20">>
        <img className='w-0 md:w-full' src={LogImg} alt="" />
        </div>
        <div className='grid justify-end'>
        <div className='mt-2 text-xs lg:text-base text-slate-500'>
        Powered by HRI @MyBizmo
        </div>
        </div>
        </div>
        <div className='border-[3px] w-full py-5 px-5 md:w-1/2  rounded-lg border-[#0865B6] md:ml-20'>
          <div className='grid grid-cols-1 gap-y-4'>
          <div className="text-xl mb-4 md:mb-6 lg:mb-10 md:text-2xl lg:text-4xl">
          Change Password
          </div>
          <div className='mt-2 xl:mt-6'>
          <TextField
          className='w-full '
          label="New Password"
          placeholder="Enter New Password"
          id="outlined-size-small"
          onChange={(e) => setOldPass(e.target.value)}
        />
          </div>
          <div  className='mt-1 xl:mt-6'>
         
     
        <TextField
          className='w-full '
          label="Confirm Password"
          id="outlined-size-small"
          onChange={(e) => setNewPass(e.target.value)}
        />
          </div>
         
        
          <div className='mt-6 xl:mt-6'>
          <Button onClick={done} className='w-full' variant="contained">Done</Button>
          </div>
         
        </div>
        </div>
        </div>
        </div>
    
    </>
  )
}

export default ChangePass