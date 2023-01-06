import React, { useEffect, useState } from "react";
import Header from "../NavBar-Sidebar/Header";

import Cookies from "universal-cookie";
import { selectHeader } from "../features/HeaderSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { RiCheckDoubleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();

const EditJobDetails = () => {
  const currentState = useSelector(selectHeader);
  const [position_name, setPositionName] = useState("");
  const [employment_type, setEmplomentType] = useState("");
  const [stipend, setStipend] = useState("");

  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [criteria, setEducation] = useState("");
  const [functional_area, setFunctionalArea] = useState("");
  const [skills, setSkills] = useState("");
  const [job_description, setDisc] = useState("");
  const [id, setId] = useState("");
  const [updated_at, setUpdatedAt] = useState("");
  const [roleCatId, setRoleCatId] = useState("");
  const [roleSubCatId, setRoleSubCatId] = useState("");
  const [roleCat, setRoleCat] = useState([]);
  const [roleSubCat, setRoleSubCat] = useState([]);

  const navigate = useNavigate();

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

  async function updateData(e) {
    e.preventDefault();

    await axios
      .put(
        `hri_company/newposition/update/${cookies.get("jobId")}`,
        {
          position_name: position_name,
          experience: experience,
          employment_type: employment_type,
          location: location,
          stipend: stipend,
          role_sub_category: roleSubCatId,
          functional_area: functional_area,
          criteria: criteria,
          job_description: job_description,
          skills: skills,
        },
        {
          headers: {
            Authorization: "Token " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        navigate("/Jobs");
        toast.success("Edited sucessfully!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      .catch(function (error) {
       
        console.log(error.response,"asdadsads")
        
        
      
           
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            console.log(error.response.data.user.message)
          
        
      });
  }

  const roleCatChange = (e) => {
    setRoleCatId(e.target.value);
  };
  const roleSubCatChange = (e) => {
    setRoleSubCatId(e.target.value);
  };
  const date = new Date(updated_at.slice(0, 10));
  const month = date.toLocaleString("default", { month: "long" });

  useEffect(() => {
    getJob();
    axios
      .get("hri_company/roles", {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setRoleCat(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`hri_company/sub_roles/${roleCatId}`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setRoleSubCat(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [roleCatId]);
  return (
    <>
      <Header />

      <div className="pt-5 pb-20 mt-[68px] bg-gray-100 px-4  md:px-10   w-full h-auto">
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
                  <div className=" md:flex">
                    <div className="md:ml-20 text-lg font-semibold">
                      Date : {date.getDate()}&nbsp;
                      {month.slice(0, 3)}&nbsp;
                      {date.getFullYear()}
                    </div>
                  </div>

                  <div
                    onClick={updateData}
                    className="lg:flex mt-2 lg:mt-0 lg:space-x-4 cursor-pointer lg:space-y-0 space-y-2"
                  >
                    <div className="flex justify-center bg-slate-100 px-4 py-2 rounded-lg font-semibold text-blue-600 text-sm">
                      Save{" "}
                      <RiCheckDoubleFill className="ml-2 mt-[1px] text-xl" />
                    </div>
                  </div>
                </div>
                <div className="space-y-5 md:space-y-0 md:grid gap-y-5 gap-x-10 mr-20  grid-cols-2  mt-5 text-sm font-semibold ml-2 md:ml-20">
                  <div className="  ">
                    <div className="text-gray-400 ">Position Name</div>

                    <TextField
                      className="w-full "
                      value={position_name}
                      id="outlined-size-small"
                      onChange={(e) => setPositionName(e.target.value)}
                      size="small"
                    />
                  </div>
                  <div className="  ">
                    <div className="text-gray-400 ">Emploment Type</div>

                    <select
                      className="form-select   appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                      value={employment_type}
                      onChange={(e) => setEmplomentType(e.target.value)}
                    >
                      <option className="h-20">Part-time</option>
                      <option className="h-20">
                        Part-time(Work from home)
                      </option>
                      <option className="h-20">Full-time</option>
                      <option className="h-20">
                        Full-time(Work from home)
                      </option>
                    </select>
                  </div>
                  <div className="  ">
                    <div className="text-gray-400 ">Stipend / Sallery</div>

                    <TextField
                      className="w-full "
                      value={stipend}
                      id="outlined-size-small"
                      onChange={(e) => setStipend(e.target.value)}
                      size="small"
                    />
                  </div>
                  <div className="  ">
                    <div className="text-gray-400 ">Role Categoty</div>

                    <select
                      className="form-select     appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                      //   value={emp}
                      onChange={roleCatChange}
                    >
                      <option className="h-20  dropdown-item text-sm  py-2 px-4 font-normal  block  w-full  whitespace-nowrap bg-transparent text-gray-400 pointer-events-none">
                        Select Role Category
                      </option>

                      {roleCat.map((user) => (
                        <option className="h-20" key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="  ">
                    <div className="text-gray-400 ">Role</div>

                    <select
                      className="form-select     appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                      //   value={emp}
                      onChange={roleSubCatChange}
                    >
                      <option className="h-20  dropdown-item text-sm  py-2 px-4 font-normal  block  w-full  whitespace-nowrap bg-transparent text-gray-400 pointer-events-none">
                        Enter Sub-category (If Any)
                      </option>

                      {roleSubCat.map((user) => (
                        <option className="h-20" key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="  ">
                    <div className="text-gray-400 ">Experience</div>

                    <TextField
                      className="w-full "
                      value={experience}
                      id="outlined-size-small"
                      onChange={(e) => setExperience(e.target.value)}
                      size="small"
                    />
                  </div>
                  <div className="  ">
                    <div className="text-gray-400 ">Location</div>
                    <div className="flex">
                      <TextField
                        className="w-full "
                        value={location}
                        id="outlined-size-small"
                        onChange={(e) => setLocation(e.target.value)}
                        size="small"
                      />
                    </div>
                  </div>
                  <div className="  ">
                    <div className="text-gray-400 ">Education</div>

                    <TextField
                      className="w-full "
                      value={criteria}
                      id="outlined-size-small"
                      onChange={(e) => setEducation(e.target.value)}
                      size="small"
                    />
                  </div>
                  <div className="  ">
                    <div className="text-gray-400 ">Functional Area</div>

                    <TextField
                      className="w-full "
                      value={functional_area}
                      id="outlined-size-small"
                      onChange={(e) => setFunctionalArea(e.target.value)}
                      size="small"
                    />
                  </div>
                  <div className=" ">
                    <div className="text-gray-400 ">Skills</div>
                    <div className="">
                      <TextField
                        className="w-full"
                        value={skills}
                        id="outlined-size-small"
                        onChange={(e) => setSkills(e.target.value)}
                        size="small"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:ml-20 mt-5 font-semibold text-sm  ">
                  <div className="text-gray-400 ">Job Description</div>

                  <textarea
                    className="h-28  mt-2   2xl:placeholder:pl-6 placeholder:text-xs md:placeholder:text-base xl:placeholder:text-lg 2xl:placeholder:text-3xl 2xl:mt-6 mt-1 rounded-lg block  w-full border border-slate-300  py-2 pl-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Discribe about company"
                    cols="10"
                    rows="5"
                    value={job_description}
                    onChange={(e) => setDisc(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditJobDetails;
