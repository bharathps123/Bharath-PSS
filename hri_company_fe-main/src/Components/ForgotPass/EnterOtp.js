import LogImg from '../Login/LoginImg.png'
import  React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const EnterOtp = () => {

    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      setEmail(cookies.get("email"));
    }, []);
  
    const headers = {
      Authorization: "Token " + cookies.get("token"),
    };

    async function enterOtp(e) {
        e.preventDefault();
    
        axios
          .post(
            "auth/user/forgot/password/verify",
            {
              email: email,
              otp: otp,
            },
            {
              headers: headers,
            }
          )
          .then((resp) => {
            console.log(resp);
            navigate({
              pathname: "/ChangePass",
              state: { token: resp.data.token },
            });
          })
          .catch((err) => {
            console.log(err);
          });
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
        <img className="w-0 md:w-full" src={LogImg} alt="" />
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
          Enter OTP
          </div>
          <div  className='mt-2 xl:mt-6'>
          
     
        <TextField
          className='w-full '
          label={"OTP"}
          placeholder="Enter OTP"
          id="outlined-size-small"
            type="number"
          onChange={(e) => setOtp(e.target.value)}
        />
          </div>
         
        
          <div className='mt-6 xl:mt-6'>
          <Button onClick={enterOtp} className='w-full' variant="contained">Create New Password</Button>
          </div>
              <div>
                  <Button
                      fullWidth
                      variant="outlined"
                      style={{borderColor:"#08665B6", color:"#0865B6"}}
                      onClick={() => navigate("/")}
                  >
                      Already have an account? Sign In
                  </Button>
              </div>
        </div>
        </div>
        </div>
        </div>
    
    </>
  )
}

export default EnterOtp