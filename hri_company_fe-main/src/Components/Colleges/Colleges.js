/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";

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
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArticleIcon from "@mui/icons-material/Article";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { selectHeader } from "../features/HeaderSlice";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Header_Navbar from "../NavBar-Sidebar_CompanyList/Header_Navbar";
import { Input } from "antd";
import { BsSearch } from "react-icons/bs";
import { TiLocationOutline } from "react-icons/ti";

const cookies = new Cookies();

const Colleges = () => {
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
          position: id,
        },
        {
          headers: {
            Authorization: "Token " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        console.log("Bookmarked");
        setBookmark(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Some error Occurred", err);
      });
  };

  const UnBookmark = (id) => {
    axios
      .delete(`/profile/bookmark/delete/${id}`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log("UnBookmarked");
        setBookmark(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Some error Occurred", err);
      });
  };

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
        return item.name?.toLowerCase().includes(input?.toLowerCase());
      })
    );
  }, [input, companyList]);
  const currentState = useSelector(selectHeader);

  return (
    <>
      <Header_Navbar />
      <div>
        <div className="pt-1 pb-20  bg-gray-100 mt-[68px]  w-full h-full">
          <div
            className={
              !currentState?.show
                ? " lg:ml-72 ease-in duration-300 "
                : " ease-in  duration-300  ml-0 "
            }
          >
            <div className="bg-white p-2 pt-4">
              {/* <input
                        type="text"
                        className="h-10 border-2 rounded px-4"
                        placeholder="Search"
                    
                    /> */}
              <Input
                placeholder="Enter Company Name"
                size="large"
                suffix={<BsSearch className="site-form-item-icon" />}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="px-4 ">
              <div className="grid grid-cols-6 rounded-md gap-x-10 bg-white mt-4 h-16">
                <div className="flex justify-center items-center h-16">
                  <div>
                    <img
                      src={cookies.get("companyProfile")}
                      className="w-10 h-10 rounded-full"
                      title="image_"
                    />
                  </div>
                </div>
                <div className="flex  items-center h-16 col-span-2">
                  <div>
                    <div>
                      <span className="font-semibold text-[17px] ">
                        Company naem
                      </span>{" "}
                      <span className="text-[14px] text-gray-500 font-semibold">
                        (565564)
                      </span>{" "}
                    </div>{" "}
                    <div className="truncate flex">
                      <span>
                        <TiLocationOutline className="mt-1 mr-1" />{" "}
                      </span>{" "}
                      <span className="w-60 truncate">
                        asd asd sdasda asdasd asdasd asdasd asdasd
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center h-16">
                  <div>
                    <button
                      onClick={() => navigate("/Profile")}
                      className="bg-blue-500 px-6 py-2 font-semibold text-white rounded-md  "
                    >
                      Connect
                    </button>
                  </div>
                </div>
                <div className="flex justify-center items-center h-16 font font-semibold text-[16px] ">
                  asd
                </div>
                <div className="flex justify-center items-center h-16 font font-semibold text-[16px] ">
                  asd
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Colleges;
