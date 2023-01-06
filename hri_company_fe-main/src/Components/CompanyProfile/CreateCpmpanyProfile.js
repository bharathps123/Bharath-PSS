import React, { useEffect, useState } from "react";
import Header from "../NavBar-Sidebar/Header";
import { selectHeader } from "../features/HeaderSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";
import comp from "./CompPng.png";
import { FaRegEdit } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { RiCheckDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const CreateCompanyProfile = () => {
  const navigate = useNavigate();

  const currentState = useSelector(selectHeader);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [founder, setFounder] = useState("");
  const [ceo, setCeo] = useState("");
  const [hrPhone, setHrPhone] = useState("");
  const [hr, setHr] = useState("");
  const [emp, setEmp] = useState("");
  const [established, setEstablished] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [compDetails, setCompDetails] = useState("");
  const [compWebsite, setCompWebsite] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [facebook, setFacebook] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");

  

  async function updateImage(e) {
    e.preventDefault();
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("company_logo", e.target.files[0]);
    console.log(formData);
    axios
      .put(`hri_company/company/add`, formData, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        setImage(formData);
        cookies.set("image", image);
        console.log(image);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateData(e) {
    e.preventDefault();

    axios
      .post(
        `hri_company/company/add`,
        {
          name: name,
          user: cookies.get("id"),
          company_email: email,
          company_number: phone,
          contact_person: hr,
          contact_number: hrPhone,
          address: location,
          company_logo: image,
          established_in: established,
          working_sector: sector,
          company_url: compWebsite,
          linkedin_url: linkedIn,
          facebook_url: facebook,
          company_founder: founder,
          company_ceo: ceo,
          company_employee: emp,
          company_description: compDetails,
          
        },
        {
          headers: {
            Authorization: "Token " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        navigate("/CompanyProfile");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    setId(cookies.get("compId"));
  }, [image]);

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
          <div className="bg-white px-4 md:px-10 pb-20 pt-8 w-full rounded-lg h-auto">
            <div className="md:flex justify-between">
              <div className="md:w-80">
                <div className="flex justify-center ">
                  <div className="w-20  border-gray-600 cursor-pointer rounded-full">
                    <img
                      style={{ filter: "blur(1.2px)" }}
                      className="w-20 h-20  rounded-full "
                      src={image ? image : comp}
                      alt=""
                    />
                    <label className="">
                      <FaRegEdit className="text-xs  absolute mt-[-45px] ml-8 text-lg xl:text-lg 2xl:text-2xl md:text-base  cursor-pointer" />
                      <input
                        className="w-20"
                        type="file"
                        onChange={updateImage}
                        style={{ visibility: "hidden" }}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className=" w-full mx-10  ml-[-10px]">
                <div className="flex space-x-10 xl:space-x-20">
                  <div className="space-y-4">
                    <div>
                      <div className="">
                        <div className="text-gray-400 font-semibold">
                          Full Name
                        </div>

                        <TextField
                          className={
                            !currentState?.show ? "w-full  " : "w-full xl:w-80 "
                          }
                          value={name}
                          id="outlined-size-small"
                          onChange={(e) => setName(e.target.value)}
                          size="small"
                        />
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div className="">
                        <div className="text-gray-400 font-semibold">
                          Company Email ID
                        </div>
                        <TextField
                          className="w-full "
                          value={email}
                          id="outlined-size-small"
                          onChange={(e) => setEmail(e.target.value)}
                          size="small"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <div className="text-gray-400  font-semibold">CEO</div>
                        <TextField
                          className="w-full "
                          value={ceo}
                          id="outlined-size-small"
                          onChange={(e) => setCeo(e.target.value)}
                          size="small"
                        />
                      </div>
                      <div className=" mt-4">
                        <div className="text-gray-400  font-semibold">HR</div>
                        <TextField
                          className="w-full "
                          value={hr}
                          id="outlined-size-small"
                          onChange={(e) => setHr(e.target.value)}
                          size="small"
                        />
                      </div>
                      <div className=" mt-4">
                        <div className="text-gray-400  font-semibold">
                          Established In
                        </div>
                        <TextField
                          className="w-full "
                          value={established}
                          id="outlined-size-small"
                          onChange={(e) => setEstablished(e.target.value)}
                          size="small"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      {" "}
                      <div className="">
                        <div className="text-gray-400 font-semibold">
                          Company Phone Number
                        </div>
                        <TextField
                          className={
                            !currentState?.show ? "w-full  " : "w-full xl:w-80 "
                          }
                          value={phone}
                          id="outlined-size-small"
                          onChange={(e) => setPhone(e.target.value)}
                          size="small"
                        />
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div className="">
                        <div className="text-gray-400 font-semibold">
                          Founder
                        </div>
                        <TextField
                          className="w-full"
                          value={founder}
                          id="outlined-size-small"
                          onChange={(e) => setFounder(e.target.value)}
                          size="small"
                        />
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div className="">
                        <div className="text-gray-400 font-semibold">
                          HR Phone Number
                        </div>
                        <TextField
                          className="w-full "
                          value={hrPhone}
                          id="outlined-size-small"
                          onChange={(e) => setHrPhone(e.target.value)}
                          size="small"
                        />
                      </div>
                      <div className="">
                        <div className="text-gray-400 font-semibold mt-5 ml-1">
                          Employees
                        </div>
                        <select
                          className="form-select bg-slate-100  ml-1  appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          aria-label="Default select example"
                          value={emp}
                          onChange={(e) => setEmp(e.target.value)}
                        >
                            <option className="h-20"></option>
                          <option className="h-20">100-200</option>
                          <option className="h-20">200-300</option>
                          <option className="h-20">300-400</option>
                        </select>
                      </div>
                      <div className="">
                        <div className="text-gray-400 font-semibold mt-5 ml-1">
                          Working Sector
                        </div>
                        <select
                          className="form-select bg-slate-100  ml-1  appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          aria-label="Default select example"
                          value={sector}
                          onChange={(e) => setSector(e.target.value)}
                        >
                            <option className="h-20" lable="Select Sector"></option>
                          <option className="h-20">Software Solutions</option>
                          <option className="h-20">IT sector</option>
                          <option className="h-20">Mechanical sector</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-gray-400 font-semibold">Location</div>
                  <TextField
                    className="w-full "
                    value={location}
                    id="outlined-size-small"
                    onChange={(e) => setLocation(e.target.value)}
                    size="small"
                  />
                </div>
                <div className="mt-10">
                  <div className="text-gray-400 font-semibold">
                    Company Description
                  </div>
                  <div className="">
                    <textarea
                      className="h-28  mt-2   2xl:placeholder:pl-6 placeholder:text-xs md:placeholder:text-base xl:placeholder:text-lg 2xl:placeholder:text-3xl 2xl:mt-6 mt-1 rounded-lg block  w-full border border-slate-300  py-2 pl-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      placeholder="Discribe about company"
                      cols="10"
                      rows="5"
                      value={compDetails}
                      onChange={(e) => setCompDetails(e.target.value)}
                    />
                    <div className="flex space-x-10 mt-5 xl:space-x-20">
                      <div className="space-y-4">
                        <div>
                          <div className="">
                            <div className="text-gray-400 font-semibold">
                              Company website Link
                            </div>

                            <TextField
                              className={
                                !currentState?.show
                                  ? "w-full  "
                                  : "w-full xl:w-80 "
                              }
                              value={compWebsite}
                              id="outlined-size-small"
                              onChange={(e) => setCompWebsite(e.target.value)}
                              size="small"
                            />
                          </div>
                        </div>
                        <div>
                          {" "}
                          <div className="">
                            <div className="text-gray-400 font-semibold">
                              LinkedIn Link
                            </div>
                            <TextField
                              className="w-full "
                              value={linkedIn}
                              id="outlined-size-small"
                              onChange={(e) => setLinkedIn(e.target.value)}
                              size="small"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          {" "}
                          <div className="">
                            <div className="text-gray-400 font-semibold">
                              Facebook Link
                            </div>
                            <TextField
                              className={
                                !currentState?.show
                                  ? "w-full  "
                                  : "w-full xl:w-80 "
                              }
                              value={facebook}
                              id="outlined-size-small"
                              onChange={(e) => setFacebook(e.target.value)}
                              size="small"
                            />
                          </div>
                        </div>

                        <div>
                          {" "}
                          <div className="">
                            <div className="text-gray-400 font-semibold">
                              Others
                            </div>
                            <TextField
                              className="w-full "
                              // value={other}
                              id="outlined-size-small"
                              //  onChange={(e) => setHrPhone(e.target.value)}
                              size="small"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-80">
                <Link to="/CompanyProfile">
                  <div
                    onClick={updateData}
                    className=" mt-5 md:mt-0 w-full px-10   flex justify-center  bg-slate-100 rounded-lg"
                  >
                    <div className="  flex bg-slate-100 my-2 text-blue-700 ">
                      <div>Create</div>{" "}
                      <RiCheckDoubleFill className="ml-2 mt-[1px] text-xl" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCompanyProfile;
