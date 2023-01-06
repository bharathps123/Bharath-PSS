import React, {useEffect, useState} from "react";

import {Box, Button, TextField} from "@mui/material";

import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ReactPlayer from "react-player";

import Cookies from "universal-cookie";
import Modal from "@mui/material/Modal";
import Header from "../NavBar-Sidebar/Header";
import { useSelector } from 'react-redux';
import {  selectHeader } from '../features/HeaderSlice';
import { Card, CardContent} from "@mui/material";

const cookies = new Cookies();

const Help = () => {

    const [active, setActive] = useState("btn1");
    const [categorydata, setCategoryData] = useState([]);
    const [tutorialdata, setTutorialData] = useState([]);
    const [questionlist, setQuestionList] = useState([]);
    const [categoryquestion, setCategoryQuestion] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [catDescription, setCatDescripton] = useState("")

    const [modalTitle, setModalTitle] = useState("")
    const [modalDescrip, setModalDescrip] = useState("")
    const [modalUrl, setModalUrl] = useState("")
    const [modalTitle2, setModalTitle2] = useState("")
    const [modalDescrip2, setModalDescrip2] = useState("")
    const [modalUrl2, setModalUrl2] = useState("")

    const GetCategoryList = () => {
        axios
            .get(
                '/hri_company/help-category-list',
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token")
                    }
                }
            )
            .then((res) => {
                setCategoryData(res.data)
                console.log("The Category data is", res.data)
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }

    const GetTutorialList = () => {
        axios
            .get(
                '/hri_company/help-tutorial-list',
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token")
                    }
                }
            )
            .then((res) => {
                setTutorialData(res.data)
                console.log("The Tutorial data is", res.data)
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }

    const GetQuestionList = () => {
        axios
            .get(
                '/profile/help-faq-list',
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token")
                    }
                }
            )
            .then((res) => {
                setQuestionList(res.data)
                console.log("The Question List data is", res.data)
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }

    useEffect(() => {
        GetCategoryList();
        GetTutorialList();
        GetQuestionList()
    }, [])

    const GetCategoryQuestion = (id) => {
        axios
            .get(
                `/hri_company/help-qa-list/${id}`,
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token")
                    }
                }
            )
            .then((res) => {
                setCategoryQuestion(res.data)
                console.log("The Category Question List data is", res.data)
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const currentState = useSelector(selectHeader);

    return (
        <>
           <Header/>
           <div className='bg-gray-100 w-full h-screen mt-[68px] '>
    <div className={!currentState?.show?' lg:ml-72 ease-in duration-300 h-auto' : ' ease-in  duration-300 h-auto ml-0 '}>
            {active === "btn1" ? <div>
                <div className="p-2 md:p-4">
                    <div className="card bg-gradient-to-r from-sky-500 to-indigo-500 h-[30vh] border-none rounded-xl">
                        <div className="card-body" align="center">
                            <p className="text-2xl md:text-3xl pt-6 text-white">How Can We Help You</p>
                            <input
                                variant="filled"
                                className="bg-white h-12 focus:outline-none w-1/2 rounded-full mt-4 px-10 border-none"

                                placeholder="Search"
                            />
                            <p className="text-xl md:text-2xl text-white m-2">Or Browse Categories</p>


                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                            {categorydata.map((info) => (
                                    <Card className="relative pb-10" elevation={0} key={info.id}>
                                        <CardContent >
                                            <div>
                                                <SecurityIcon className="text-sky-700" align="center"
                                                              style={{fontSize: "80px"}}/>
                                            </div>
                                            <div className="space-y-2 mt-2">
                                                <p>{info.name}</p>
                                                <p>{info.description}</p>
                                            </div>
                                            <div className="absolute bottom-5 inset-x-0 ">
                                                <Button
                                                    variant="contained"
                                                    onClick={(e) => {
                                                        setActive("btn2");
                                                        GetCategoryQuestion(info.id);
                                                        setCategoryName(info.name);
                                                        setCatDescripton(info.description)
                                                    }}
                                                >
                                                    See More
                                                    <ArrowForwardIosIcon className="ml-1" style={{fontSize: "small"}}/>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="">
                                <div className="grid grid-cols-2 bg-[#0865B6] text-white rounded-t-lg mt-5 ">
                                    <div className="text-left ">
                                        <p className="text-sm md:text-xl ml-3 md:px-5 py-2.5">
                                            Tutorial Videos
                                        </p>
                                    </div>
                                    <div className="flex flex-row-reverse">
                                        <div
                                            className="text-sm flex md:text-lg mr-3 md:px-5 py-2.5 cursor-pointer"
                                            onClick={() => setActive("btn3")}
                                        >
                                            Show All Tutorial Videos
                                            <ArrowForwardIosIcon className="ml-1 mt-2" style={{fontSize: "small"}}/>
                                        </div>
                                    </div>


                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {tutorialdata.filter((value, index) => index < 3).map((info) => (
                                        <div className="card bg-white pt-4 mt-4 border-none rounded-lg m-2" key={info.id}>
                                            <div className="card-body">
                                                <p className="text-lg md:text-2xl font-bold">
                                                    {info.title}
                                                </p>
                                                <p className="text-base md:text-xl mb-4">
                                                    {info.description}
                                                </p>
                                                <video
                                                    onClick={() => {
                                                        handleOpen();
                                                        setModalTitle2(info.title);
                                                        setModalDescrip2(info.description);
                                                        setModalUrl2(info.tutorial_video)
                                                    }}
                                                >
                                                    <source src={info.tutorial_video} type="video/mp4"/>
                                                </video>
                                                <Modal
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                    className="flex justify-center items-center"
                                                >
                                                    <Box
                                                        className="w-10/12 p-3 border-solid border-[#000] rounded-md bg-white lg:w-1/2 lg:p-5">
                                                        <p className="text-lg md:text-2xl font-bold">
                                                            {modalTitle2}
                                                        </p>
                                                        <p className="text-base md:text-xl mb-4">
                                                            {modalDescrip2}
                                                        </p>
                                                        <ReactPlayer
                                                            url={modalUrl2}
                                                            className="react-player"
                                                            // playing
                                                            width="100%"
                                                            height="100%"
                                                            controls
                                                        />
                                                    </Box>
                                                </Modal>

                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            <div align="left" className="my-5">
                                <p className="bg-[#0865B6] text-white rounded-t-lg text-xl px-5 py-2.5 ">
                                    Frequently Asked Questions
                                </p>
                                <div className="card border-none ">
                                    <div className="card-body">
                                        <div className="">
                                            <p className="m-2 text-lg font-semibold text-[#0865B6]">
                                                FAQ
                                            </p>

                                            <div>
                                                {questionlist.map((info) => (
                                                    <div key={info.id} className="">
                                                        <div className="m-2">
                                                            <Accordion elevation={0} style={{background: "#F1F1F1"}}>
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon/>}
                                                                    aria-controls="panel1a-content"
                                                                    id="panel1a-header"
                                                                >
                                                                    <Typography
                                                                        style={{fontWeight: "bold"}}>Q. {info.question}</Typography>
                                                                </AccordionSummary>
                                                                <hr/>
                                                                <AccordionDetails>
                                                                    <Typography>
                                                                        A. {info.answer}
                                                                    </Typography>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div> : <></>}

            {active === "btn2" ? <div>
                <div className="card m-4 border-none rounded-lg">
                    <div className="card-body">
                        <Button startIcon={<ArrowBackIosNewIcon/>}
                                onClick={() => setActive("btn1")}>
                            Help and Faq Categories
                        </Button>
                        <p className="m-3 text-xl text-sky-700">
                            {categoryName}
                        </p>
                        <p className="m-3">
                            {catDescription}
                        </p>

                        {categoryquestion.map((info) => (
                            <div className="m-2" key={info.id} style={{fontSize: "8px"}}>

                                <Accordion elevation={0} style={{background: "#F1F1F1"}}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                    >
                                        <Typography style={{fontWeight: "bold"}}>Q. {info.help_question}</Typography>
                                    </AccordionSummary>
                                    <hr/>
                                    <AccordionDetails>
                                        <Typography>
                                            A. {info.help_answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        ))}

                    </div>
                </div>
            </div> : <></>}

            {active === "btn3" ? <div>
                <div className="card my-3 mx-4 pt-4 border-none rounded-lg">
                    <div className="card-body   ">
                            <div className="bg-sky-100 h-12 pt-2 pl-2 rounded-t-lg"><Button className="" startIcon={<ArrowBackIosNewIcon/>}
                                onClick={() => setActive("btn1")}>
                            Back
                        </Button></div>
                        

                        <div className="grid grid-cols-1 px-10 bg-white md:grid-cols-2 gap-x-4 lg:grid-cols-3">
                            {tutorialdata.map((info) => (
                                <div className="card mt-4 bg-gray-100 pt-4 border-none rounded-lg m-2" key={info.id}>
                                    <div className="card-body">
                                        <div>
                                            <p className="font-bold text-center text-xl">
                                                {info.title}
                                            </p>
                                            <p className="text-lg text-center">
                                                {info.description}
                                            </p>
                                            <video
                                                className="mt-3"
                                                onClick={() => {
                                                    handleOpen();
                                                    setModalTitle(info.title);
                                                    setModalDescrip(info.description);
                                                    setModalUrl(info.tutorial_video)
                                                }}>
                                                <source src={info.tutorial_video} type="video/mp4"/>
                                            </video>

                                        </div>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            className="flex justify-center items-center"
                                        >
                                            <Box
                                                className="w-10/12 p-3 border-solid border-[#FFF] rounded-md bg-white lg:w-1/2 lg:p-5">
                                                <p className="text-lg md:text-2xl font-bold">
                                                    {modalTitle}
                                                </p>

                                                <p className="text-base md:text-xl mb-4">
                                                    {modalDescrip}
                                                </p>
                                                <p>{info.id}</p>
                                                <ReactPlayer
                                                    url={modalUrl}
                                                    className="react-player"
                                                    // playing
                                                    width="100%"
                                                    height="100%"
                                                    controls
                                                />
                                            </Box>
                                        </Modal>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div> : <></>}

        </div>
        </div>
        
        </>
    )
}

export default Help;