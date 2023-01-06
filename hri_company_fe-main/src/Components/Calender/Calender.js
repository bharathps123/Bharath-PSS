import React, {useEffect, useState} from "react";


import {Box, Card, CardContent, Grid, Modal, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArticleIcon from '@mui/icons-material/Article';
import {LocalizationProvider, StaticDatePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import image from "./undraw_beach_day_cv97 1.png"
import Header from "../NavBar-Sidebar/Header";
import { selectHeader } from "../features/HeaderSlice";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
const cookies = new Cookies();

const Calender = () => {

    const navigate = useNavigate();

    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthValue = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

    const dateValue = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15",
        "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]

    const [value, setValue] = useState(new Date());

    const [meetDetail, setMeetDetail] = useState([]);
    const [calendarMeet, setCalendarMeet] = useState([]);
    const [nextMeet, setNextMeet] = useState([]);


    const meetingDetail = (id) => {
        axios
            .get(
                `profile/meeting/${id}`,
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token")
                    }
                }
            )
            .then((res) => {
                console.log("Meeting Data: ", res.data);
                setMeetDetail(res.data);
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }

    const getCalendar = (date, month, year) => {


        if (date === undefined && month === undefined && year === undefined){
            date = dateValue[value.getDate()-1]
            month = monthValue[value.getMonth()]
            year = value.getFullYear()
        }

        axios
            .get(
                `profile/meeting-by-date/${year}-${month}-${date}`,
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token")
                    }
                }
            )
            .then((res) => {
                console.log("Calendar Data: ", res.data);
                setCalendarMeet(res.data)
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }

    const nextMeeting = () => {
        axios
            .get(
                `profile/next-meeting`,
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token")
                    }
                }
            )
            .then((res) => {
                console.log("Meeting Data: ", res.data);
                setNextMeet(res.data);
                setValue(new Date(res.data[0].date))
                getCalendar((res.data[0].date).slice(8,10), (res.data[0].date).slice(5,7), (res.data[0].date).slice(0,4));
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        getCalendar();
        if (cookies.get("token")) {

        } else {
            navigate("/")
        }
    }, [])
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
                <div className="bg-white flex flex-col m-1 rounded-lg md:flex-row md:m-4">

                    <div className="text-center md:mx-4 ">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                                displayStaticWrapperAs="desktop"
                                openTo="day"
                                views={['year', 'month', 'day']}
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                    getCalendar(dateValue[newValue.getDate() - 1], monthValue[newValue.getMonth()], newValue.getFullYear());
                                }}
                                // renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="bg-[#0865B6] rounded-lg text-white px-4 flex-grow">

                        <div className="flex pt-3">
                            <div className="text-5xl">
                                <p className="flex justify-end pr-2">
                                    {dateValue[value.getDate() - 1]}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p>
                                    {monthList[value.getMonth()]}
                                </p>
                                <p>
                                    {value.getFullYear()}
                                </p>
                            </div>
                        </div>


                        {calendarMeet.length > 0 ? <div className="pt-3 pb-8 px-4 space-y-2">
                            <p className="text-lg">
                                MEETINGS
                            </p>
                            {calendarMeet.map((meet) => (
                                <div key={meet.id}>

                                    <div
                                        className="flex flex-col px-2 py-1 gap-2 bg-[#FDFDFD80] text-[16px] md:flex-row md:gap-6">
                                        <p>
                                            {meet.start_time} - {meet.end_time}
                                        </p>
                                        <p>
                                            {meet.title}
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div> : <div className="flex justify-center pt-4">
                            <p className="text-xl ">
                                No meetings Scheduled for today
                            </p>
                        </div>}

                    </div>


                </div>

                <div>

                    {calendarMeet.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2">
                        {calendarMeet.map((data, i) => {
                            return (
                                <div className="bg-white rounded-lg relative mx-4 my-3" key={data.id}>

                                    <div className="absolute top-0 left-0 flex items-center justify-center bg-[#4F95FD]
                                text-white w-24 h-12 text-base font-semibold rounded-br-lg rounded-tl-lg"
                                    >
                                        {moment(data.date).format("dddd")}
                                    </div>
                                    <div className="pt-16 px-5 pb-3">
                                        <p className="text-2xl py-1">
                                            <ArticleIcon className="mr-2" fontSize="medium" sx={{color: "#A9A9A9"}}/>
                                            {" "}
                                            {data.title}
                                        </p>
                                        <div className="flex py-1">
                                            <div className="flex-grow">
                                                <p>
                                                    <ScheduleIcon className="mr-2" fontSize="medium"
                                                                  sx={{color: "#A9A9A9"}}/>
                                                    {" "}
                                                    {data.start_time} , {data.date}
                                                </p>
                                            </div>

                                            <div>
                                                <p>
                                                    Meet on:

                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            disableElevation
                                            variant="contained"
                                            sx={{
                                                background: "#F1F1F1",
                                                color: "#0865B6",
                                                borderRadius: "8px",
                                                ":hover": {background: "#E4E4E4"}
                                            }}
                                            className="mt-3 h-8"
                                            onClick={() => {
                                                meetingDetail(data.id);
                                                handleOpen();
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div> : <div className="flex flex-col justify-center md:flex-row">
                        <img src={image} alt=""/>
                        <div className="flex-col px-3 self-center">
                            <p className="text-3xl font-bold">
                                No events or meetings today
                            </p>
                            <p className=" text-xl">
                                <span
                                    onClick={() => {
                                        nextMeeting();
                                    }}
                                    className="text-[#0865B6] cursor-pointer">
                                    Click here {" "}
                                </span>
                                to go to next day with the shedule.
                            </p>
                        </div>
                    </div>}

                </div>
            </div>

            {meetDetail.map((detail) => {
                const detailDate = new Date(detail.date);
                return (
                    <Modal
                        open={open}
                        onClose={handleClose}
                        className="flex justify-center items-center"
                    >
                        <Box className="space-y-2 bg-white p-5 rounded-lg w-5/6 md:w-4/6 lg:w-2/6">
                            <div>
                                <Typography id="modal-modal-title" variant="h5" component="h2">
                                    Title: {detail.title}
                                </Typography>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Company: {detail.company ? detail.company : "null"}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{mt: 2}}>
                                    Note: {detail.note}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{mt: 2}}>
                                    Date: {detailDate.getDate()}&nbsp;{monthList[detailDate.getMonth()]}, {detailDate.getFullYear()}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{mt: 2}}>
                                    Time: {detail.start_time} - {detail.end_time}
                                </Typography>
                            </div>
                        </Box>
                    </Modal>
                )
            })}
        </div>
    </div>

        </>
    )
}

export default Calender;