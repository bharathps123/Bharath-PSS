/* eslint-disable import/first */
import React, { useEffect, useState } from "react";
import Header from "../NavBar-Sidebar/Header";
import { selectHeader } from "../features/HeaderSlice";
import { useSelector } from "react-redux";
import { RiCheckDoubleFill } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Upload,
} from "antd";
import ChoiceFieldCreate from "./QuestionCreateModal/ChoiceFieldCreate";
import MediaFieldCreate from "./QuestionCreateModal/MediaFieldCreate";
const OPTIONS = ["Choice Fields", "Video Field", "Text Field", "Image Field"];
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const cookies = new Cookies();

const onChangeSwitch = (checked) => {
  console.log(`switch to ${checked}`);
};
const AddNewPosition = () => {
  const navigate = useNavigate();
  const currentState = useSelector(selectHeader);
  const [positionName, setPositionName] = useState("");
  const [experience, setExperience] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [location, setLocation] = useState("");
  const [stipend, setStipend] = useState("");
  const [education, setEducation] = useState("");
  const [fulctionalArea, setFunctionalArea] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [skills, setSkills] = useState("");
  const [roleCat, setRoleCat] = useState([]);
  const [roleSubCat, setRoleSubCat] = useState([]);
  const [roleCatId, setRoleCatId] = useState("");
  const [roleSubCatId, setRoleSubCatId] = useState("");
  const [checked, setCheacked] = useState(false);
  const [selectedItems, setSelectedItems] = useState("");
  const [mcq,setMcq] = useState(false)
  const [keyChange,setKeyChange] = useState('')
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const [form] = Form.useForm();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addAnotherQuestion, setAddAnotherQuestion] = useState("");
  const [addAnotherArr, setAddAnotherArr] = useState([]);
  const addQuestion = (e) => {
    e.preventDefault();
    setQuestionCount(questionCount + 1);
    setAddAnotherQuestion(addAnotherQuestion);
    addAnotherArr.push(addAnotherQuestion);
  };

  const [questionCount, setQuestionCount] = useState(1);
  const [data, setData] = useState({});
  const handleChange = (e) => {
    if (e.target.name.startsWith("option")) {
      setData({ ...data, [e.target.name]: e.target.value });
    } else setData({ ...data, [e.target.name]: e.target.value });
  };

  


  console.log("selectedItems", selectedItems);
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);

    setCheacked(e.target.checked);
  };


  async function createJob(e) {

    e.preventDefault();
   
      let question_data = [];
      for (let i = 0; i < questionCount; i++) {
        let obj = {};
        obj["question"] = data[`question${i}`];
        obj["question_type"] = data[`questionType${i}`];
        obj["description"] = data[`questionDes${i}`];
        if (data[`questionType${i}`] === "ChoiceField")
          obj["options"] =
            data[`optionOne${i}`] +
            "," +
            data[`optionTwo${i}`] +
            "," +
            data[`optionThree${i}`] +
            "," +
            data[`optionThree${i}`];
        question_data.push(obj);
      }
      console.log("data", question_data);
      let formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);
      // formData.append("creator", cookies.get("id"));
      formData.append("question_data", question_data);
      
   
    const assessment = {
      name : title,
      description: description,
      questions: question_data
    }
  
  
    axios
      .post(
        "hri_company/newposition/add",
        {
          position_name: positionName,
          experience: experience,
          employment_type: employmentType,
          location: location,
          stipend: stipend,
          criteria: education,
          role_category: roleSubCatId,
          functional_area: fulctionalArea,
          job_description: jobDesc,
          skills: skills,
          assessment: assessment,
         
            is_assessment: checked
       
          // company_details:"null",
          // company: "false",
        },
        {
          headers: {
            Authorization: "Token " + cookies.get("token"),
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        toast.success("Position added successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/Jobs");
      })
      .catch(function (error) {
        console.log(error.response, "asdadsads");

        toast.error("Please re-check the form!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error.response.data.user.message);
      })
    
  }
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  toast.configure();
  useEffect(() => {
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
  const roleCatChange = (e) => {
    setRoleCatId(e.target.value);
  };
  const roleSubCatChange = (e) => {
    setRoleSubCatId(e.target.value);
  };
  return (
    <>
      <Header />

      <div className="pt-4 pb-20  bg-gray-100 px-4 mt-[68px]    w-full h-auto">
        <div
          className={
            !currentState?.show
              ? " lg:ml-72 ease-in duration-300 "
              : " ease-in  duration-300  ml-0 "
          }
        >
          <div className="bg-white px-4 md:px-28 pb-20 pt-8 w-full rounded-lg h-auto">
            <div className="md:flex justify-end mx-2">
              <div className="flex ">
                <Link to="/Jobs">
                  <div className="w-full text-center px-6 hover:bg-red-100 hover:text-black mt-5 md:mt-0 ease rounded py-2  mr-10  text-gray-400">
                    X&nbsp; Cancel
                  </div>
                </Link>
                <div
                  onClick={createJob}
                  className=" mt-5 cursor-pointer md:mt-0 w-40 md:px-10 ml-2  flex justify-center  bg-slate-100 rounded-lg"
                >
                  <div className="  flex bg-slate-100 my-2 text-blue-700 ">
                    <div>Save</div>{" "}
                    <RiCheckDoubleFill className="ml-2 mt-[1px] text-xl" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:mr-28 gap-y-5 gap-x-4 md:gap-x-10 mt-8">
              <div>
                <div className="text-gray-400  text-sm md:text-basetext-sm md:text-base mb-2 font-semibold">
                  Position Name
                </div>
                <TextField
                  className="w-full"
                  label="Enter role of the job"
                  id="outlined-size-small"
                  onChange={(e) => setPositionName(e.target.value)}
                  size="small"
                  required
                />
              </div>
              <div>
                <div className="text-gray-400  text-sm md:text-base mb-2 font-semibold ml-1">
                  Experience
                </div>
                <div>
                  <select
                    className="form-select   ml-1  appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    required
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <option className="h-20  dropdown-item flex text-sm  py-2 px-4 font-normal  block  w-full  whitespace-nowrap bg-transparent text-gray-400 pointer-events-none">
                      Select Experience
                    </option>

                    <option className="h-20">
                      <div>0-1 years </div>
                    </option>
                    <option className="h-20">1-2 years</option>
                    <option className="h-20">2-3 years</option>
                    <option className="h-20">3-4 years</option>
                    <option className="h-20">4-5 years</option>
                    <option className="h-20">5+ years</option>
                  </select>
                  <span></span>
                </div>
              </div>
              <div>
                <div className="text-gray-400  text-sm md:text-base mb-2 font-semibold ml-1">
                  Employment Type
                </div>
                <select
                  className="form-select   ml-1  appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  //   value={emp}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  required
                >
                  <option className="h-20  dropdown-item text-sm  py-2 px-4 font-normal  block  w-full  whitespace-nowrap bg-transparent text-gray-400 pointer-events-none">
                    Select employment type
                  </option>

                  <option className="h-20">Part-time</option>
                  <option className="h-20">Part-time(Work from home)</option>
                  <option className="h-20">Full-time</option>
                  <option className="h-20">Full-time(Work from home)</option>
                </select>
              </div>
              <div>
                <div className="text-gray-400  text-sm md:text-base mb-2 font-semibold">
                  Location
                </div>
                <TextField
                  className="w-full"
                  label="Enter Location of the job will play"
                  id="outlined-size-small"
                  onChange={(e) => setLocation(e.target.value)}
                  size="small"
                />
              </div>
              <div>
                <div className="text-gray-400  text-sm md:text-base mb-2 font-semibold ml-1">
                  Stipend / Salary
                </div>
                <TextField
                  className="w-full"
                  label="Salary"
                  type="number"
                  id="outlined-size-small"
                  onChange={(e) => setStipend(e.target.value)}
                  size="small"
                  required
                />
              </div>
              <div>
                <div className="text-gray-400  text-sm md:text-base mb-2 font-semibold ml-1">
                  Education
                </div>
                <TextField
                  className="w-full"
                  label="Any Degree"
                  id="outlined-size-small"
                  onChange={(e) => setEducation(e.target.value)}
                  size="small"
                  required
                />
              </div>
              <div>
                <div className="text-gray-400  text-sm md:text-base mb-2 font-semibold ml-1">
                  Role Category
                </div>
                <select
                  className="form-select   ml-1  appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  //   value={emp}
                  onChange={roleCatChange}
                  required
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
              <div>
                <div className="text-gray-400  text-sm md:text-base mb-2 font-semibold ml-1">
                  Functional Area
                </div>
                <TextField
                  className="w-full"
                  label="React Apps Develop and Deploy"
                  required
                  id="outlined-size-small"
                  onChange={(e) => setFunctionalArea(e.target.value)}
                  size="small"
                />
              </div>
              <div>
                <div className="text-gray-400  text-sm md:text-base mb-2 font-semibold ml-1">
                  Role Sub-Category
                </div>
                <select
                  className="form-select   ml-1  appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  required
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
            </div>
            <div className="mt-4 md:mr-28">
              <div className="text-gray-400  text-sm md:text-base mb-2 font-semibold">
                Job Description
              </div>
              <textarea
                required
                className="h-28  mt-2   2xl:placeholder:pl-6 placeholder:text-xs md:placeholder:text-base xl:placeholder:text-lg 2xl:placeholder:text-3xl 2xl:mt-6 mt-1 rounded-lg block  w-full border border-slate-300  py-2 pl-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Please describe about in In-Detail"
                cols="10"
                rows="5"
                //    value={compDetails}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>
            <div className="mt-4 md:mr-28">
              <div className="text-gray-400  text-sm md:text-base mb-2 font-semibold">
                Skills
              </div>
              <textarea
                required
                className="h-28  mt-2   2xl:placeholder:pl-6 placeholder:text-xs md:placeholder:text-base xl:placeholder:text-lg 2xl:placeholder:text-3xl 2xl:mt-6 mt-1 rounded-lg block  w-full border border-slate-300  py-2 pl-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Enter skills the job role required to give the best"
                cols="10"
                rows="5"
                //    value={compDetails}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div className="pr-20">
              <div className="flex mt-10 mr-10 justify-between">
                <div className="flex ">
                  <div>
                    <Checkbox className="font-semibold" onChange={onChange}>
                      Add Questionnaire
                    </Checkbox>
                  </div>
                  {/* <div>
                    <Switch defaultChecked onChange={onChangeSwitch} />
                  </div> */}
                </div>
                {/* <div>
                  <Switch defaultChecked onChange={onChangeSwitch} />
                </div> */}
              </div>
            </div>
            {checked ? <>
              <div className="md:mr-28" >
                <div className="text-gray-400   text-sm md:text-base mb-2 font-semibold ml-1">
                  Title
                </div>
                <TextField
                  className="w-full"
                  label="Enter Title"
                  required
                  id="outlined-size-small"
                  onChange={(e) => setTitle(e.target.value)}
                  size="small"
                />
              </div>
            <div className="mt-4 md:mr-28">
              <div className="text-gray-400  text-sm md:text-base mb-2 font-semibold">
              Description
              </div>
              <textarea
                required
                className="h-28  mt-2   2xl:placeholder:pl-6 placeholder:text-xs md:placeholder:text-base xl:placeholder:text-lg 2xl:placeholder:text-3xl 2xl:mt-6 mt-1 rounded-lg block  w-full border border-slate-300  py-2 pl-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Enter Description "
                cols="10"
                rows="5"
                //    value={compDetails}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="row">
                {Array.from({ length: questionCount }, (_, i) => (
                  <>
                    <div className="mt-4">
                      <div className="row">
                        <div className="col-sm-6 mx-auto section_margin_top">
                          <hr className="my-4 mt-8"/>
                          <div className="col-xl-12  noPadding">
                            <p className="bp-form-text-header mb-1">
                              Question <span style={{ color: "red" }}>*</span>
                            </p>
                            <input
                              className="w-full border h-10 rounded-md p-4"
                              type="text"
                              name={`question${i}`}
                              onChange={handleChange}
                              placeholder="Type your first question here..."
                            ></input>
                          </div>
                          <div className="mt-4">
                            <p className="bp-form-text-header mb-1">
                              Description
                            </p>
                            <textarea
                              className="h-20  mt-2   2xl:placeholder:pl-6 placeholder:text-xs md:placeholder:text-base xl:placeholder:text-lg 2xl:placeholder:text-3xl 2xl:mt-6 mt-1 rounded-lg block  w-full border border-slate-300  py-2 pl-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                              name={`questionDes${i}`}
                              onChange={handleChange}
                              type="text"
                              placeholder="Question Description"
                            ></textarea>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div>
                            <div className="col-xl-12 ">
                              <p className="bp-form-text-header mb-1">
                                Answer Mode{" "}
                                <span style={{ color: "red" }}>*</span>
                              </p>
                              <select
                                className="form-select   ml-1  appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name={`questionType${i}`}
                                onChange={handleChange}
                                // onChange={(e) => setQuestionType(e.target.value)}
                              >
                                <option className="h-20" value="">Select</option>
                                <option className="h-20" value="TextField">TextField</option>
                                <option className="h-20" value="ChoiceField">ChoiceField</option>
                                <option className="h-20" value="FileField">File</option>
                                <option className="h-20" value="BoolField">Boolean</option>
                                <option className="h-20" value="VideoField">Video</option>
                                <option className="h-20" value="ImageField">Image</option>
                              </select>
                            </div>

                            {data[`questionType${i}`] == "ChoiceField" ? (
                              <>
                                <div className="col-xl-12 section_margin_top">
                                  <p className="mt-3">
                                    First Option{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </p>
                                  <input
                                    className="w-full border h-10 rounded-md p-4"
                                    type="text"
                                    onChange={handleChange}
                                    name={`optionOne${i}`}
                                    placeholder="Type your first question here..."
                                  ></input>
                                </div>
                                <div className="col-xl-12 section_margin_top">
                                  <p className="mt-3">
                                    Second Option{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </p>
                                  <input
                                    className="w-full border h-10 rounded-md p-4"
                                    name={`optionTwo${i}`}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Type your first question here..."
                                  ></input>
                                </div>
                                <div className="col-xl-12 section_margin_top">
                                  <p className="mt-3">
                                    Third Option
                                  </p>
                                  <input
                                    className="w-full border h-10 rounded-md p-4"
                                    name={`optionThree${i}`}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Type your first question here..."
                                  ></input>
                                </div>
                                <div className="col-xl-12 section_margin_top">
                                  <p className="mt-3">
                                    Forth Option
                                  </p>
                                  <input
                                    className="w-full border h-10 rounded-md p-4"
                                    name={`optionThree${i}`}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Type your first question here..."
                                  ></input>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                <div className=" mt-5">
                  <div className="">
                    <button
                     
                      className="bg-gray-500 text-white p-3 rounded-md"
                      onClick={addQuestion}
                    >
                      Add Another Question +
                    </button>
                  </div>
                </div>

              
              </div></> : null}
     
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewPosition;
