import React, {useEffect, useState} from "react";


import MeetModal from "./MeetModal";
import {getRequest} from "./Request";
import moment from "moment";
// import Modal from "../../components/Modal";
// import AddIcon from "@mui/icons-material/Add";
import Spinner from "./Spinner";
// import axios from "axios";
// import {base_url} from "../../components/consts";
// import {toast} from "react-toastify";
import Cookies from "universal-cookie";
import Modal from "@mui/material/Modal";
import {Route, Routes} from "react-router";
import Upcoming from "./Upcoming";
import Previous from "./Previous";
import {useNavigate} from "react-router-dom";
import Header from "../NavBar-Sidebar/Header";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import {  selectHeader } from '../features/HeaderSlice';


const cookies = new Cookies();

const Meeting = () => {
    const currentState = useSelector(selectHeader);

    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [active1, setActive1] = useState("");
    const [type, setType] = useState("upcoming");

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getRequest(`hri_company/meeting?schedule_type=${type}`, setData);
    }, [type]);

    const meetingId = (id) => {
        setId(id)
    }
    const navigate = useNavigate();

    return (
        <>
            
          <Header/>
          <div className='bg-gray-100  mt-[68px] w-full h-screen '>
    <div className={!currentState?.show?' lg:ml-72 ease-in duration-300 h-auto' : ' ease-in  duration-300 h-auto ml-0 '}>git
          <div className='bg-gray-100 w-full '>
    {/* <div className={!currentState?.show?' lg:ml-72 ease-in h-full duration-300 ' : ' ease-in  duration-300 h-full ml-0'}> */}
    <div className="items-center justify-start text-neutral-400 flex bg-white py-2  rounded-md z-10">
                <span
                    id="Message From"
                    className={`font-lighter text-black px-4 py-2 rounded-md duration-300`}
                >
                  Scheduled Meetings:
                </span>
                <a
                    id="upcoming"
                    // className={`${
                    //     active1 === "upcoming" && "bg-default-gray text-default-blue"
                    // } tab_span cursor-pointer p-2 rounded`}
                    className={`hover:bg-[#F1F1F1] hover:text-sky-700 rounded-[5px] font-bold text-base
                            m-1 py-1 px-2.5
                            md:px-8 md:text-xl md:py-2 md:1.5
                            lg:px-10 lg:text-xl lg:py-2 lg:m-1.5
                    ${window.location.pathname === "/schedule_meets/upcoming" ? "bg-[#F1F1F1] text-sky-700" : ""}`}
                    onClick={(e) => {
                        setActive1(e.currentTarget.id);
                        setType(e.currentTarget.id);
                        navigate("upcoming");
                    }}
                >
                    Upcoming
                </a>
                <a
                    id="previous"
                    // className={`${
                    //     active1 === "previous" && "bg-default-gray text-default-blue"
                    // } tab_span cursor-pointer p-2 rounded`}
                    className={`hover:bg-[#F1F1F1] hover:text-sky-700 rounded-[5px] font-bold text-base
                            m-1 py-1 px-2.5
                            md:px-8 md:text-xl md:py-2 md:1.5
                            lg:px-10 lg:text-xl lg:py-2 lg:m-1.5
                    ${window.location.pathname === "/schedule_meets/previous" ? "bg-[#F1F1F1] text-sky-700" : ""}`}
                    onClick={(e) => {
                        setActive1(e.currentTarget.id);
                        setType(e.currentTarget.id);
                        navigate("previous");
                    }}
                >
                  Previous
                </a>
            </div>
            <Routes>
                <Route path="upcoming" element={<Upcoming/>}/>
                <Route path="previous" element={<Previous/>}/>
            </Routes>
        {/* </div> */}
        </div>
        </div>
        </div>
        </>
    )

}

export default Meeting;