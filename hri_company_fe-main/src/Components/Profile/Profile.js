import React, { useEffect, useState } from "react";
import Header from "../NavBar-Sidebar/Header";
import { selectHeader } from "../features/HeaderSlice";
import { useSelector } from "react-redux";
import comp from "./profile.jpeg";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import {BsGithub} from "react-icons/bs"
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const cookies = new Cookies();

const Profile = () => {
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


  async function getData() {
    await axios
      .get(`auth/user/profile`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((resp) => {
        console.log(resp.data)
        setEmail(resp.data.user.email)
        setId(resp.data.user.id)
        setName(resp.data.user.profile.name)
        cookies.set("profileName",resp.data.user.profile.name)
        setPhone(resp.data.user.profile.otp_phone)
        setDob(resp.data.user.profile.dob)
        setEmpId(resp.data.user.profile.employee_id)
        setRole(resp.data.user.profile.role)
        setGender(resp.data.user.profile.gender)
        setAbout(resp.data.user.profile.about_you)
        setImage(resp.data.user.profile.image)
        cookies.set("profileImage",resp.data.user.profile.image)
        cookies.set("otp",resp.data.user.profile.otp)
        cookies.set("id",resp.data.user.profile.id)
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
      <div>
      <div className="pt-5 pb-20  bg-gray-100 px-4  md:px-10 mt-[68px]  w-full h-auto">
        <div
          className={
            !currentState?.show
              ? " lg:ml-72 ease-in duration-300 "
              : " ease-in  duration-300  ml-0 "
          }
        >
          <div className="bg-white px-4 md:px-20 pb-20 pt-8 w-full rounded-lg h-auto">
          <div>
            <div className="md:flex  justify-between">
              <div className="flex justify-center ">
                <div className="w-20">
                  <img
                    className="w-20 h-20   border-2 border-gray-600 rounded-full mt-8"
                    src={image? image : comp}
                    alt=""
                  />
                </div>
              </div>
              <div>
                <div className="md:ml-10 text-center md:text-left text-xl font-bold mt-8">{name}</div>
                <div className="flex mt-5 text-xs md:text-sm font-semibold mx-2 justify-center md:justify-start md:ml-10">
                  <div className="grid gap-y-5">
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Email ID</div>
                      <div>{email}</div>
                    </div>
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Contact</div>
                      <div>{phone}</div>
                    </div>
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Date of Birth</div>
                      <div>{dob}</div>
                    </div>
                  </div>
                  <div className="grid gap-y-5 ml-5 md:ml-20 ">
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Employee ID</div>
                      <div>{empId}</div>
                    </div>
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Designation</div>
                      <div>{role}</div>
                    </div>
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Gender</div>
                      <div>{gender}</div>
                    </div>
                  </div>
                </div>
                <div className="md:ml-10 mt-10  font-semibold text-sm  ">
                  <div className="text-gray-400 ">About me</div>
                  <div className="md:w-full lg:w-1/2 mt-3">
                    {about}
                  </div>
                </div>
                <div className="md:ml-10  mt-8 flex justify-center md:justify-start font-semibold space-x-7 text-4xl">
                  <BsFacebook className="text-blue-600"/>
                  <BsLinkedin className="text-blue-700"/>
                  <BsGithub />
                </div>
              </div>
              <div className="">
                <div className=" mt-8 ">
                  <Link to="/EditProfile">
                  <div className="flex cursor-pointer justify-center bg-slate-100 px-4 py-2 rounded-lg font-semibold text-blue-600 ">
                    Edit <AiOutlineEdit className="ml-2  text-xl " />
                  </div>
                  </Link>
                </div>
                <div></div>
              </div>
            </div>
          
       </div>
          </div>
         </div>
      </div>
       </div>
    </>
  );
};

export default Profile;
