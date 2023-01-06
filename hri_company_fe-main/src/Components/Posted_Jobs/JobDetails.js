import React, { useEffect, useState } from "react";
import Header from "../NavBar-Sidebar/Header";
import { selectHeader } from "../features/HeaderSlice";
import { useSelector } from "react-redux";
import { GoLocation } from "react-icons/go";
import { AiOutlineEdit } from "react-icons/ai";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const JobDetails = () => {
  const navigate = useNavigate();
  const [position_name, setPositionName] = useState("");
  const [employment_type, setEmplomentType] = useState("");
  const [stipend, setStipend] = useState("");
  const [role_sub_category_name, setRole_sub_category_name] = useState("");
  const [role_category_name, setRole_category_name] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [criteria, setEducation] = useState("");
  const [functional_area, setFunctionalArea] = useState("");
  const [skills, setSkills] = useState("");
  const [job_description, setDisc] = useState("");
  const [id, setId] = useState("");
  const [updated_at, setUpdatedAt] = useState("");

  async function getJob() {
    await axios
      .get(`hri_company/jobs/${cookies.get("jobId")}`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setPositionName(resp.data.position_name);
        setEmplomentType(resp.data.employment_type);
        setStipend(resp.data.stipend);
        setRole_sub_category_name(resp.data.role_sub_category_name);
        setRole_category_name(resp.data.role_category_name);
        setExperience(resp.data.experience);
        setLocation(resp.data.location);
        setEducation(resp.data.criteria);
        setFunctionalArea(resp.data.functional_area);
        setSkills(resp.data.skills);
        setDisc(resp.data.job_description);
        setId(resp.data.id);
        setUpdatedAt(resp.data.updated_at);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const date = new Date(updated_at.slice(0, 10));
  const month = date.toLocaleString("default", { month: "long" });
  const myArray = skills.split(",");

  useEffect(() => {
    getJob();
    cookies.set("JobId", id);
  }, []);

  const currentState = useSelector(selectHeader);
  return (
    <>
      <Header />

      <div className="pt-5 pb-20 mt-[68px]  bg-gray-100 px-4  md:px-10   w-full h-auto">
        <div
          className={
            !currentState?.show
              ? " lg:ml-72 ease-in duration-300 "
              : " ease-in  duration-300  ml-0 "
          }
        >
          <div key={id}>
            <Link to="/Jobs">
              <div className="mb-2 text-lg font-semibold text-blue-700">
                {" "}
                Posted jobs / {cookies.get("check")} / {position_name}{" "}
              </div>
            </Link>
            <div className="bg-white px-4 md:px-12 pb-20 pt-8 w-full rounded-lg h-auto">
              <div>
                <div className="md:flex  justify-between">
                  <div>
                  <div className="md:mx-20 px-5 text-white rounded-md py-2 mb-2 cursor-pointer flex justify-center bg-blue-600">
                    <div onClick={() => navigate("/JobResponse")} >Survey Responces</div></div>
                  <div className=" md:flex">
                    
                    <div className="md:ml-20 text-lg font-semibold">
                      Date : {date.getDate()}&nbsp;
                      {month.slice(0, 3)}&nbsp;
                      {date.getFullYear()}
                    </div>
                  </div>
                  </div>
                 
                  <Link to="/EditJobDetails">
                    <div className="lg:flex mt-2 lg:mt-0 lg:space-x-4 lg:space-y-0 space-y-2">
                      <div className="flex justify-center bg-slate-100 px-4 py-2 rounded-lg font-semibold text-blue-600 text-sm">
                        Edit <AiOutlineEdit className="ml-2 text-lg " />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="flex mt-5 text-sm font-semibold ml-2 md:ml-20">
                  <div className="grid gap-y-5">
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Position Name</div>
                      <div>{position_name? position_name : "N/A"}</div>
                    </div>
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Emploment Type</div>
                    
                      <div>{employment_type? employment_type : "N/A"}</div>
                    </div>
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Money</div>
                  
                      <div>{stipend? stipend : "N/A"}</div>
                    </div>
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Role Categoty</div>
                     
                      <div>{role_category_name? role_category_name : "N/A"}</div>
                    </div>
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Role Sub Category</div>
                    
                      <div>{role_sub_category_name? role_sub_category_name : "N/A"}</div>
                    </div>
                   
                  </div>
                  <div className="grid gap-y-5 ml-10 md:ml-40">
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Experience</div>
                      
                      <div>{experience? experience : "N/A"}</div>
                    </div>
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Location</div>
                      <div className="flex">
                      
                        <div>{location? location : "N/A"}...</div>
                        <GoLocation className="text-gray-400 text-2xl md:text-xl  ml-4" />
                      </div>
                    </div>
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Education</div>
                      <div className="w-2/3 md:w-full">{criteria ? criteria : "N/A"}</div>
                    </div>
                    <div className="grid gap-y-2">
                      <div className="text-gray-400 ">Functional Area</div>
                      <div className="">{functional_area ? functional_area: "N/A"}</div>
                    </div>
                  </div>
                </div>
                <div className="md:ml-20 mt-5 font-semibold text-sm  ">
                  <div className="text-gray-400 ">Job Description</div>
                  <div className="md:w-3/5 mt-3">{job_description ? job_description: "N/A" }</div>
                </div>
                <div className="md:ml-20 mt-5 font-semibold text-sm  ">
                  <div className="text-gray-400 ">Skills</div>
                  <div className="grid grid-cols-2 gap-4 md:flex md:space-x-5 mt-4">
                    {myArray.map((items) => (
                      <div
                        key={items}
                        className="bg-gray-300 text-center p-2 px-6 rounded-3xl"
                      >
                        {items}{" "}
                      </div>
                    ))}
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

export default JobDetails;
