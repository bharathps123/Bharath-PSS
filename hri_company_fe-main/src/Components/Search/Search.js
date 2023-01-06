import React, {useEffect, useState} from "react";

import Header from "../NavBar-Sidebar/Header";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import picture from "./4041088.png";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArticleIcon from "@mui/icons-material/Article";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import {styled, alpha} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { selectHeader } from "../features/HeaderSlice";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";


const cookies = new Cookies();

const Search = () => {
    const navigate = useNavigate();

    const [jobList, setJobList] = useState([]);
    const [companyList, setCompanyList] = useState([]);

    const [input, setInput] = useState("");
    const [output, setOutput] = useState([]);
    const [output2, setOutput2] = useState([]);
    const [bookmark, setBookmark] = useState(false);

    const getComapanyDetails = () => {
        axios
            .get(`profile/company-list`, {
                headers: {
                    Authorization: "Token " + cookies.get("token"),
                },
            })
            .then((res) => {
                console.log("Company List: ", res.data);
                setCompanyList(res.data);
            })

            .catch((err) => {
                console.log("error: ", err);
            });
    };

    const today = new Date();

    useEffect(() => {
        axios
            .get(`profile/jobs`, {
                headers: {
                    Authorization: "Token " + cookies.get("token"),
                },
            })
            .then((res) => {
                console.log("Job List: ", res.data);
                setJobList(res.data);
            })

            .catch((err) => {
                console.log("error: ", err);
            });

        getComapanyDetails();
    }, []);


    const Bookmark = (id) => {
        axios
            .post(
                `/profile/bookmark`,
                {
                    position: id
                },
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token")
                    }
                }
            )
            .then((res) => {
                console.log("Bookmarked")
                setBookmark(true)
                window.location.reload()
            })
            .catch((err) => {
                console.log("Some error Occurred", err)
            })
    }

    const UnBookmark = (id) => {
        axios
            .delete(
                `/profile/bookmark/delete/${id}`,
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token")
                    }
                }
            )
            .then((res) => {
                console.log("UnBookmarked")
                setBookmark(false)
                window.location.reload()
            })
            .catch((err) => {
                console.log("Some error Occurred", err)
            })
    }

    useEffect(() => {
        setOutput(
            jobList.filter((item) => {
                return (
                    item?.job_unique_id?.toLowerCase().includes(input.toLowerCase()) ||
                    item?.position_name?.toLowerCase().includes(input.toLowerCase())
                );
            })
        );
    }, [input, jobList]);


    useEffect(() => {
        setOutput2(
            companyList.filter((item) => {
                return (
                    item.name?.toLowerCase().includes(input?.toLowerCase())

                );
            })
        );
    }, [input, companyList]);
    const currentState = useSelector(selectHeader);

    return (
       <>
      
             <Header />
            <div>
            <div className="pt-1 pb-20  bg-gray-100 mt-[68px]  w-full h-full">
        <div
          className={
            !currentState?.show
              ? " lg:ml-72 ease-in duration-300 "
              : " ease-in  duration-300  ml-0 "
          }
        >
                <div className="bg-white p-2 m-2">
                    <input
                        type="text"
                        className="h-10 border-2 rounded px-4"
                        placeholder="Search"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                <div className="m-4 space-y-4">
                    <div>
                        <Accordion elevation={0}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Jobs</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="bg-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-2">
                                {output.map((data) => {
                                    const updatedAt = new Date(data.updated_at);

                                    const one_day = 1000 * 60 * 60 * 24;

                                    const timeDifference = today.getTime() - updatedAt.getTime();
                                    const difference = Math.round(timeDifference / one_day);

                                    return (
                                        <Card
                                            key={data.id}
                                            elevation={0}
                                            style={{borderRadius: "0.5rem"}}
                                            className="m-2"
                                        >
                                            <CardContent className="mx-2 mt-2">
                                                <div>
                                                    <div className="grid grid-cols-12">
                                                        <div className="col-span-12">
                                                            <div className="grid grid-cols-12">
                                                                <div className="col-span-2">
                                                                    <img
                                                                        className="rounded-full sm:h-16 md:h-16 lg:h-20"
                                                                        src={data.company_logo}
                                                                        alt=""
                                                                    />
                                                                </div>

                                                                <div className="py-2 px-4 text-lg col-span-9">
                                                                    <div className="flex flex-row">
                                                                        <p className="flex-grow text-x md:text-2xl lg:text-2xl font-semibold">
                                                                            {data.position_name}
                                                                        </p>
                                                                        <p>
                                                                            {data.job_unique_id}
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-md md:text-lg lg:text-lg">
                                                                        <p>{data.company_name}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-1 ml-0 md:ml-7 lg:ml-4">
                                                                    {bookmark === false ?
                                                                        <div>
                                                                            {data.is_bookmarked === false ?
                                                                                <div>
                                                                                    <BookmarkBorderIcon
                                                                                        id={data.id}
                                                                                        className="text-[#0865B6]"
                                                                                        onClick={(e) => {
                                                                                            Bookmark(data.id);
                                                                                            setBookmark(true)
                                                                                        }}
                                                                                    />
                                                                                </div> : <div>
                                                                                    {data.is_bookmarked === true ?
                                                                                        <div>
                                                                                            <BookmarkIcon
                                                                                                id={data.id}
                                                                                                className="text-[#0865B6]"
                                                                                                onClick={(e) => {
                                                                                                    UnBookmark(data.id);
                                                                                                    setBookmark(false)
                                                                                                }}
                                                                                            />
                                                                                        </div> : <></>}
                                                                                </div>}
                                                                        </div> : <></>}
                                                                </div>
                                                            </div>

                                                            <div
                                                                className="pt-3 pb-1 px-2 grid grid-cols-1
                                                                    text-sm space-y-2
                                                                    md:text-lg md:grid-cols-3
                                                                    lg:px-4 lg:pb-2 lg:grid-cols-2 lg:text-lg
                                                                    xl:grid-cols-4"
                                                            >
                                                                <div>
                                                                    <p>
                                                                        <BusinessCenterIcon
                                                                            className="text-[#A9A9A9] mb-1 mr-2"/>
                                                                        {data.experience}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p>
                                                                        <LocalAtmIcon
                                                                            className="text-[#A9A9A9] mb-1 mr-2"/>
                                                                        {data.stipend}
                                                                    </p>
                                                                </div>
                                                                <div className="xl:ml-5 lg:col-span-2">
                                                                    <p>
                                                                        <BusinessIcon
                                                                            className="text-[#A9A9A9] mb-1 mr-2"/>
                                                                        {data.employment_type}
                                                                    </p>
                                                                </div>
                                                                <div
                                                                    className="col-span-1 md:col-span-3 lg:col-span-2 xl:col-span-4">
                                                                    <p>
                                                                        <LocationOnIcon
                                                                            className="text-[#A9A9A9] mb-1 mr-2"/>
                                                                        {data.location}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div
                                                                className="py-1 px-2 grid
                                                                    text-sm space-y-2
                                                                    md:grid-cols-2 md:text-lg md:space-y-1
                                                                    lg:py-2 lg:px-4 lg:grid-cols-1 lg:space-y-2 lg:text-lg
                                                                    xl:grid-cols-2"
                                                            >
                                                                <div>
                                                                    <p>
                                                                        <ArticleIcon
                                                                            className="text-[#A9A9A9] mb-1 mr-2"/>
                                                                        {data.criteria}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p>
                                                                        <LeaderboardIcon
                                                                            className="text-[#A9A9A9] mb-1 mr-2"/>
                                                                        {data.skills}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="px-2 text-lg grid grid-cols-2">
                                                        <div>
                                                            <p className="py-2 text-neutral-400">
                                                                {difference} days ago
                                                            </p>
                                                        </div>
                                                        <div align="right">
                                                            <p
                                                                className="px-2 py-1 rounded hover:bg-[#F1F1F1] text-center text-sky-700 w-32 font-semibold"
                                                                onClick={() => {
                                                                    navigate("/Jobs");
                                                                    localStorage.setItem("JobId", data.id);
                                                                }}
                                                            >
                                                                View Details
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </AccordionDetails>
                        </Accordion>
                    </div>

                    <div>
                        <Accordion elevation={0}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Company Name</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="bg-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-2">
                                {output2.map((company) => {
                                    return (
                                        <Card
                                            key={company.id}
                                            elevation={0}
                                            style={{borderRadius: "0.5rem"}}
                                            className="m-2"
                                        >
                                            <CardContent className="mx-2 mt-2">
                                                <div className="grid grid-cols-6">
                                                    <div className="col-span-1">
                                                        <img
                                                            className="rounded-full sm:h-16 sm:w-16 md:h-16 md:w-16 lg:h-20 lg:w-20"
                                                            src={company.company_logo}
                                                            alt=""
                                                        />
                                                    </div>

                                                    <div className="py-2 px-4 col-span-5 text-lg">
                                                        <div className="text-xl md:text-2xl lg:text-2xl font-semibold">
                                                            <p>{company.name}</p>
                                                        </div>
                                                        <div className="text-md md:text-lg lg:text-lg">
                                                            <p>rating</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-lg">
                                                    <div className="mt-1" align="right">
                                                        <p
                                                            className="py-1 w-32 text-center rounded hover:bg-[#F1F1F1] text-sky-700 font-semibold cursor-pointer"
                                                            onClick={(e) => {
                                                            }}
                                                        >
                                                            View Jobs
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </>
    );
};

export default Search;
