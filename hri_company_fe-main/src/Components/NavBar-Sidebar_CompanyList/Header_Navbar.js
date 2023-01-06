import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import {BsFillDiamondFill} from "react-icons/bs"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import logo from "./HRI_Company_logo.png";
import profile from "./profile.png";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdArrowBackIos } from "react-icons/md";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import {IoPersonSharp} from 'react-icons/io5'
import {AiFillMessage} from 'react-icons/ai'
import "./styles.css";

// import required modules
import { Navigation } from "swiper";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiDashboardFill, RiProfileFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { RiProfileLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { BiNotepad } from "react-icons/bi";
import { AiTwotoneSetting } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { hiding, selectHeader, showing } from "../features/HeaderSlice";
import { HiOutlineMenu } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {GoBell} from 'react-icons/go'
import {IoIosMail} from 'react-icons/io'
import {BsDot} from 'react-icons/bs'
import {FaGraduationCap, FaIdCard} from 'react-icons/fa'
import {AiFillSetting} from 'react-icons/ai'
import {MdLiveHelp} from 'react-icons/md'
import {BsSearch} from 'react-icons/bs'
import {BsCalendar2Event} from 'react-icons/bs'

const cookies = new Cookies();

const Header_Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data,setData] = useState([])
  const [slide,setSlide] = useState([])
  const currentState = useSelector(selectHeader);
  async function getData() {
    await axios
      .get("hri_company/broadcast-list", {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((resp) => {
        console.log(resp.data,"<===data");
        console.log(resp.data.length,"<===length");
        setData(resp.data.length)
        setSlide(resp.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);
  const [nav, setNav] = useState(true);
  const [active,setActive] = useState("Posted Jobs")

  const visible = () => {
    setNav(!nav);

    dispatch(
      showing({
        show: true,
      })
    );

    if (currentState?.show === true) {
      dispatch(hiding());
    }
  };
  let activeStyle = {
    backgroundColor: "rgb(241,245,249)",
    color: "#1B77AA",
    borderRadius: "5px",
  };

  useEffect(() => {}, [nav,active]);
  return (
    <>
      <div  className=" z-10 bg-white flex justify-between border-b-4  w-full h-auto fixed  top-0 ">
        <div className=" md:space-x-1  mx-4 md:mx-5 mb-2 flex  ">
          <div className="header_nav_icon_div my-4 cursor-pointer ">
            {nav ? (
              <MdOutlineClose
                onClick={visible}
                className="ease-in duration-300 text-2xl overflow-auto font-extralight header_nav_icon"
              />
            ) : (
              <HiOutlineMenu
                onClick={visible}
                className="ease-in   overflow-auto duration-300 header_nav_icon text-2xl font-extralight"
              />
            )}
          </div>

          <div className="logo-container w-full flex mt-3 md:mt-2 md:space-x-2 text-sm sm:text-md md:text-xl lg:text-xl px-2">
            <div>
              <img
                src={logo}
                alt=""
                className="h-7 md:h-9 lg:h-10   p-[2px] rounded-full"
              />
            </div>
            <p className="font-semibold text-xs md:text-lg text-blue-700  mt-3 ">
              HR Intelligent Company
            </p>
          </div>
        </div>
        <div className="flex space-x-4 justify-center">
        {/* <div className="text-[24px] mt-4 cursor-pointer relative">
        <GoBell data-bs-toggle="modal"
          data-bs-target="#exampleModalCenterBrodCast"/>
        {data > 0 ?   <BsDot className="absolute mt-[-40px] ml-1 text-red-500 text-[30px]"/> : null}
      
          </div>
          <div className="cursor-pointer">
        <IoIosMail  onClick={() => navigate("/Message")} className="text-[26px] mt-4"/>
          </div> */}
  <div>

    <div className="dropdown relative">

      <button
       onClick={() => navigate("/CompanyProfile")}
        className="
          dropdown-toggle
        
      
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
       
         
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
        type="button"
        // id="dropdownMenuButton1"
        // data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div>
        <div className="space-x-3  ">
          <div className="space-x-2 flex justify-end mt-3  w-full">
            <div className="">
              {" "}
              <Avatar
                src={cookies.get("companyProfile")}
                className=" mr-4 md:mr-0 border-2 border-slate-500"
              />
            </div>
            <div className="hidden md:flex">
              <div>
                {" "}
                <div className="text-xs font-semibold   md:text-base lg:text-lg w-full mt-2 mr-6">
                  {cookies.get("companyName")}
                </div>
              </div>
              {/* <div>
                <ArrowDropDownIcon className="arrow_icon mt-3 cursor-pointer mr-6" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
     
      </button>
      <ul
        className="
          dropdown-menu
          min-w-max
          absolute
       
          bg-white
          text-base
          z-50
          float-left
          py-2
         
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
        aria-labelledby="dropdownMenuButton1"
      >
        {/* <li
          onClick={() => navigate("/Profile")}
            className="
              dropdown-item
              text-sm
              py-2
              px-16
      
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
              cursor-pointer
              font-semibold
            "
          
            ><div className="flex"><IoPersonSharp className="text-lg mr-4"/> Profile</div>
          
        </li> */}
        <li
          onClick={() => navigate("/CompanyProfile")}
            className="
              dropdown-item
              text-sm
              py-2
              px-16
      
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
              cursor-pointer
              font-semibold
            "
          
            ><div className="flex"><FaIdCard className="mr-4 text-lg"/>Company Profile</div>
          
        </li>
        {/* <li
          onClick={() => navigate("/Settings")}
            className="
              dropdown-item
              text-sm
              py-2
              px-16
      
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
              cursor-pointer
              font-semibold
            "
          
            ><div className="flex"><AiFillSetting className="mr-4 text-lg"/>Setting</div>
          
        </li> */}
        {/* <li
          onClick={() => navigate("/HelpFaq")}
            className="
              dropdown-item
              text-sm
              py-2
              px-16
      
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
              cursor-pointer
              font-semibold
            "
          
            ><div className="flex"><MdLiveHelp className="mr-4 text-lg"/>Help</div>
          
        </li> */}
     
      
      <li className="border-b "/>
      <li
          onClick={() => navigate("/")}
          className="
            dropdown-item
            text-sm
            py-2
            px-16
         
            block
            w-full
            whitespace-nowrap
            bg-transparent
            text-gray-700
            hover:bg-gray-100
            hover:text-red-500
            cursor-pointer
            font-semibold
          "
        
          >Logout
        
      </li>
      </ul>
    </div>
  </div>
</div>
      </div>
      <div
          className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
          id="exampleModalCenterBrodCast"
          tabIndex="-1"
          aria-labelledby="exampleModalCenterTitle"
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className=" bg-blue-200  rounded-t-lg w-full h-auto p-4 md:pl-10 md:pr-10">
                <div className="flex justify-between ">
                  <button
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="text-sky-600 flex"
                  >
                    <MdArrowBackIos className="mt-1" />
                    <div className="font-semibold">Back</div>
                  </button>
                </div>
              </div>
              <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {slide.map((item) =>{
          return(
            <SwiperSlide>
              <div className="flex justify-start flex-col w-full">
            <div className="flex justify-between ml-10 mt-5 ">
          <div className="flex">
            <Avatar
                  src={cookies.get("profileImage")}
                  className=" mr-4 md:mr-0 border-2 border-slate-500"
                />
                <div className="ml-4 mt-1">{item.header}</div>
          </div>
          <div className="mr-10 text-xl mt-1"><BsFillDiamondFill className={`${item.is_active === true ? "text-green-500":"text-red-500"}`}/></div>
            </div>
            <div className="px-10 mt-4">
              {item.message}
            </div>
            </div>
          </SwiperSlide>
          )
        })}
      

      </Swiper>
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-start p-4  border-gray-200 rounded-b-md">
                {/* <Link to="/SendReply"> */}
              
                {/* </Link> */}
              </div>
            </div>
          </div>
          
        </div>
      <nav
        className={
          nav
            ? "text-gray-600 z-10 mt-20 overflow-y-auto w-72 bg-white fixed sidebar_parent_div  pl-5 pr-5 pt-2  border-r-4  h-full  ease-in duration-300 "
            : " z-10 w-72 text-gray-600 bg-white overflow-y-auto fixed  h-full  transform -translate-x-full space-y-4 ease-in duration-300"
        }
      >
        <div className="flex  flex-col h-[85vh] justify-between sidebar_options_div hover:rounded text-sm text-gray-600 space-y-1 mx-3 ">
       <div>
       <div>
          {/* <NavLink to="/Jobs" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            <div className="single_option_div p-3 text-gray-600  cursor-pointer font-semibold flex space-x-2 hover:bg-slate-100 hover:rounded hover:text-sky-700">
              <RiDashboardFill className=" text-xl option_icon"/>
              <div className="option_title">
                <div className="single_option_anchor  hover:text-sky-700">
                  Posted Jobs
                </div>
              </div>
            </div>
          </NavLink> */}
          </div>
          <NavLink to="/CompanyProfile" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
          <div
             className="single_option_div p-3 text-gray-600 cursor-pointer font-semibold flex space-x-2 hover:bg-slate-100 hover:rounded hover:text-sky-700"
          >
            <RiProfileFill className=" text-xl option_icon" />
            <div className="option_title ">
              <div className="single_option_anchor hover:text-sky-700">
                Company Profile
              </div>
            </div>
          </div>
          </NavLink>
          <NavLink to="/Colleges" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
          <div
             className="single_option_div p-3 text-gray-600 cursor-pointer font-semibold flex space-x-2 hover:bg-slate-100 hover:rounded hover:text-sky-700"
          >
            <FaGraduationCap className=" text-xl option_icon" />
            <div className="option_title ">
              <div className="single_option_anchor hover:text-sky-700">
                Colleges
              </div>
            </div>
          </div>
          </NavLink>
          {/* <NavLink to="/Calender" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
          <div
             className="single_option_div text-gray-600 p-3 cursor-pointer font-semibold flex space-x-2 hover:bg-slate-100 hover:rounded hover:text-sky-700"
          >
            <BsCalendar2Event className=" text-xl option_icon" />
            <div className="option_title ">
              <div className="single_option_anchor hover:text-sky-700">
                Calender and meetings
              </div>
            </div>
          </div>
          </NavLink> */}
       </div>
        



          
       


<div className="flex items-end">
<div className="grid ">
          {/* <NavLink to="/Settings" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
          <div
           className="single_option_div p-3 text-gray-600 cursor-pointer font-semibold flex space-x-2 hover:bg-slate-100 hover:rounded hover:text-sky-700"
          >
            <AiTwotoneSetting className="text-xl option_icon" />
            <div className="option_title">
              <div className="single_option_anchor hover:text-sky-700">
                Setting
              </div>
            </div>
          </div>
          </NavLink> */}
          {/* <NavLink to="/HelpFaq" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
          <div
           className="single_option_div p-3 text-gray-600 cursor-pointer font-semibold flex space-x-2 hover:bg-slate-100 hover:rounded hover:text-sky-700"
          >
            <FiHelpCircle className="text-xl option_icon" />
            <div className="option_title">
              <div className="single_option_anchor hover:text-sky-700">
                Help & FAQ
              </div>
            </div>
          </div>
          </NavLink> */}
          <NavLink to="/" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            <div
               className="single_option_div p-3 text-gray-600 cursor-pointer  font-semibold flex space-x-2 hover:bg-slate-100 hover:rounded hover:text-sky-700"
            >
              <BiLogOut className="text-xl option_icon" />
              <div className="option_title">
                <div className="single_option_anchor ">
                  Logout
                </div>
              </div>
            </div>
          </NavLink>
          </div>
</div>
       
          
        </div>
      </nav>
    </>
  );
};

export default Header_Navbar;
