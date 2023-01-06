
import { Link, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import moment from "moment";
import {  selectHeader} from '../features/HeaderSlice';
import { useSelector} from 'react-redux';
import Header from "../NavBar-Sidebar/Header"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Cookies from "universal-cookie";
import {IoPersonCircleOutline} from "react-icons/io5"



const cookies = new Cookies();




const SendReply = () => {

  const currentState = useSelector(selectHeader);
  const navigate = useNavigate();
 

 


   useEffect(() => {
    axios
      .get("hri_company/adminemail", {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  const date = new Date();
  const newDate = moment(date).format("YYYY-MM-DD");
  const [header, setHeader] =  useState("");
  const [data, setData] =  useState([]);
  const [discribe, setDiscribe] =  useState("");
  const headers = {
    Authorization: "Token " + cookies.get("token"),
  };
  async function send(e) {
    e.preventDefault();

    axios
      .post(
        "hri_company/message/send",
        {
          header: header,
          message: discribe,
          read: false,
          sender_delete: false,
          receiver_delete: false,
          receiver: cookies.get("id"),
        },
        {
          headers: headers,
        }
      )
      .then((resp) => {
        navigate("/Message")

        console.log(resp);
        navigate({
          state: { token: resp.data.token },
          path: "/Message"
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <>
    <Header/>
    <div className='bg-gray-100 w-full mt-[68px] h-auto'>
        <div className={!currentState?.show?' lg:ml-72 ease-in duration-300 ' : ' ease-in  duration-300  ml-0 '}>
    <div className=" h-screen overflow-y-scroll">

      <div className="flex items-center justify-between px-5 py-2 m-2 rounded-md z-10">
        <Link to={"/Message"}>
          <div className="text-blue-700 text-lg font-semibold flex items-center space-x-1 button_effect hover:bg-default-gray px-3 py-2 rounded-lg cursor-pointer">
            <ArrowBackIosNewIcon style={{ height: 20 }} />
            <span>Back</span>
          </div>
        </Link>
        <div
          className="text-red-500 flex items-center space-x-1 button_effect hover:bg-default-gray px-3 py-2 rounded-lg cursor-pointer"
          onClick={() => navigate("/Message")}
        >
          <RemoveCircleOutlineIcon style={{ height: 20 }} />
          <span>Discard</span>
        </div>
      </div>

      <div className="bg-white px-5 py-4 m-2 rounded-md z-10">
        <div className="flex justify-between">
        
          <div className="ml-3">
            <div className="ml-2 font-semibold text-lg text-blue-600" >Reply To :</div>
            
            <div className="flex mt-4">
                <IoPersonCircleOutline className="text-4xl mr-2 text-gray-500"/>
                <div className="mt-1 font-semmibold text-lg">{cookies.get("senderName")}</div>
                
                
            </div>
          </div>
            
      
          <div className="flex items-center">
            <p className="font-semibold text-gray-500">
              Date: <span className="text-blue-700">{newDate}</span>
            </p>
          </div>
        </div>

        <div className="space-y-5 my-4">
         

          <div className="px-4 space-y-2 flex flex-col">
            <span className="text-default-blue font-semibold text-lg">
              Message
            </span>
            <input
            onChange={(e) => setHeader(e.target.value)}
            className="h-10 mt-2  md:h-10 2xl:h-20 2xl:placeholder:pl-6 placeholder:text-xs md:placeholder:text-base xl:placeholder:text-lg 2xl:placeholder:text-3xl 2xl:mt-6 mt-1 rounded-lg block bg-slate-50 w-full border border-slate-300  py-2 pl-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Subject of the message"
            type="text"
          />
          </div>

          <div className="px-4 space-y-2 flex flex-col">
          <textarea
            onChange={(e) => setDiscribe(e.target.value)}
            className="h-60  mt-2  2xl:placeholder:pl-6 placeholder:text-xs md:placeholder:text-base xl:placeholder:text-lg 2xl:placeholder:text-3xl 2xl:mt-6 mt-1 rounded-lg block bg-slate-50 w-full border border-slate-300  py-2 pl-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Discribe anything in message"
            cols="30"
            rows="10"
          />
          </div>
          
          <div
            className="bg-[#0865B6] text-white font-semibold rounded-md hover:opacity-60 duration-300 active:opacity-80 my-4 max-w-[120px] mx-4 px-4 py-2 flex items-center space-x-2"
            onClick={send}
          >
            <SendIcon />
            <button  className="">Send</button>
          </div>
         
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default SendReply;