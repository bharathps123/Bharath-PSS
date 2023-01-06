import React, {useEffect, useRef, useState} from "react";
import Header from "../NavBar-Sidebar/Header";
import {selectHeader} from "../features/HeaderSlice";
import {useSelector} from "react-redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PrintIcon from '@mui/icons-material/Print';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Disclosure, Transition} from "@headlessui/react";
import {BsFacebook, BsFillFileEarmarkPdfFill, BsGithub, BsLinkedin} from "react-icons/bs";
import ProfileDetails from "./ProfileDetails";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip
} from "@mui/material";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProfileSharedByAdminDetails = () => {

    const navigate = useNavigate();

    const currentState = useSelector(selectHeader);

    const [data, setData] = useState([]);
    const [view, setView] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [companyLogo, setCompanyLogo] = useState("");
    const [companyTagline, setCompanyTagline] = useState("");

    async function getData() {
        await axios
            .get(
                `hri_company/profileshare/${cookies.get("profileSharedByAdminID")}`,
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token"),
                    },
                }
            )
            .then((resp) => {
                setData(resp.data);
                console.log(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getBusinessDetails = () => {
        axios
            .get(
                `profile/landing-page`,
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                // setData(resp.data);
                console.log("Business Details", res.data);
                setCompanyName(res.data.business_details[0].name);
                setCompanyLogo(res.data.business_details[0].logo);
                setCompanyTagline(res.data.business_details[0].tag_line);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);


    function printDiv(divName) {
        const printContents = document.getElementById(divName).innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    }

    useEffect(() => {
        cookies.get("profileSharedByAdminID");
        getData();
        getBusinessDetails();
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            <Header/>
            <div>
                <div className="pt-5 pb-20 mt-[68px]  bg-gray-100 px-4  md:px-10   w-full h-auto">
                    <div
                        className={
                            !currentState?.show
                                ? " lg:ml-72 ease-in duration-300 "
                                : " ease-in  duration-300  ml-0 "
                        }
                    >
                        <div className="bg-white px-4 md:px-10 pb-20 pt-8 w-full rounded-lg h-auto">
                            <div className="flex">
                                <div className="flex-grow">
                                    <Button
                                        startIcon={<ArrowBackIosNewIcon fontSize={"small"}/>}
                                        onClick={() => navigate("/ProfileShearedByAdmin")}
                                        style={{color: "#A9A9A9",}}
                                    >
                                        Back
                                    </Button>
                                </div>

                                <div>
                                    <Tooltip title="Print to PDF">
                                        <Button
                                            variant="contained"
                                            onClick={handleClickOpen}
                                        >
                                            Generate PDF
                                        </Button>
                                    </Tooltip>
                                </div>

                                <Dialog
                                    open={open}
                                    fullWidth
                                    maxWidth="md"
                                    onClose={handleClose}
                                    aria-labelledby="scroll-dialog-title"
                                    aria-describedby="scroll-dialog-description"
                                >
                                    <DialogTitle id="scroll-dialog-title">Resume</DialogTitle>
                                    <DialogContent dividers>
                                        <DialogContentText
                                            id="scroll-dialog-description"
                                            ref={descriptionElementRef}
                                            tabIndex={-1}
                                        >
                                            <div className="py-4" id={"resume"}>
                                                <ProfileDetails/>
                                            </div>
                                        </DialogContentText>
                                    </DialogContent>

                                    <DialogActions>

                                        <Button
                                            endIcon={<PrintIcon/>}
                                            variant="contained"
                                            onClick={() => printDiv("resume")}>
                                            Print
                                        </Button>
                                        <Button onClick={handleClose} variant="outlined">
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                            </div>

                            <div>
                                {data.map((user) => {
                                    const date = new Date(user.user_dob.slice(0, 10));

                                    const month = date.toLocaleString("default", {
                                        month: "long",
                                    });
                                    return (
                                        <div key={user.id} className="">
                                            <div className="md:flex  mx-4 md:mx-24 mt-5">
                                                <div className="flex justify-center ">
                                                    <div className="w-20 h-20 rounded-full">
                                                        <img
                                                            className="rounded-full w-20 h-20 "
                                                            src={user.user_pic}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className="text-xl flex justify-center font-semibold ml-4 md:ml-6 flex mt-4">
                                                    {user.user_fname}&nbsp;{user.user_lname}{" "}
                                                    {/* <VscCopy className="text-blue-700 ml-2 mt-1" /> */}
                                                </div>
                                            </div>
                                            <div
                                                className="grid grid-cols-1 md:text-left md:grid-cols-2 md:mx-24 gap-y-4 md:gap-x-10 lg:gap-x-5 mt-7">
                                                <div className="text-gray-400 font-semibold">
                                                    Role Applied{" "}
                                                    <div className="text-black">{user.job_name} </div>
                                                </div>

                                                <div className="text-gray-400 font-semibold">
                                                    Marital Status{" "}
                                                    <div className="text-black">
                                                        {user.user_martial_status}{" "}
                                                    </div>
                                                </div>
                                                <div className="text-gray-400 font-semibold">
                                                    Gender{" "}
                                                    <div className="text-black">{user.user_gender} </div>
                                                </div>
                                                <div className="text-gray-400 font-semibold">
                                                    Permanent Address{" "}
                                                    <div className="text-black break-all">
                                                        {user.user_address}, {user.user_city},
                                                        {user.user_country}{" "}
                                                    </div>
                                                </div>
                                                <div className="text-gray-400 font-semibold">
                                                    Languages{" "}
                                                    <div className="text-black">English, Hindi</div>
                                                </div>
                                                <div className="text-gray-400 break-all font-semibold">
                                                    Present Address{" "}
                                                    <div className="text-black">
                                                        {user.user_present_address}{" "}
                                                    </div>
                                                </div>
                                                <div className="text-gray-400 font-semibold">
                                                    Date of Birth{" "}
                                                    <div className="text-black">
                                                        {date.getDate()}&nbsp;
                                                        {month.slice(0, 3)}&nbsp;
                                                        {date.getFullYear()}
                                                    </div>
                                                </div>
                                                <div className="text-gray-400 font-semibold">
                                                    Country of Citizenship{" "}
                                                    <div className="text-black">{user.user_country} </div>
                                                </div>
                                            </div>
                                            <div className="border-b-2 mt-10 border-gray-500"/>
                                            <div
                                                className="text-xl font-semibold text-left md:mx-24 mt-10">
                                                Work Experience
                                            </div>
                                            <div
                                                className=" md:text-left grid grid-cols-1 md:grid-cols-2 md:ml-24 gap-y-10 mt-8 ">
                                                {user.work_exp.map((user) => {
                                                    const start = new Date(user.start_date.slice(0, 10));

                                                    const month1 = start.toLocaleString("default", {
                                                        month: "long",
                                                    });
                                                    const end = new Date(user.end_date.slice(0, 10));

                                                    const month2 = end.toLocaleString("default", {
                                                        month: "long",
                                                    });
                                                    return (
                                                        <div key={user.id} className=" mt-3 ">
                                                            <div className="text-lg font-semibold">
                                                                {user.position}{" "}
                                                            </div>
                                                            <div className="justify-start  flex">
                                                                <div className="font-semibold">From:</div>
                                                                &nbsp;{start.getDate()}&nbsp;
                                                                {month1.slice(0, 3)}&nbsp;
                                                                {start.getFullYear()}
                                                            </div>
                                                            <div className="justify-start flex  ">
                                                                <div className="font-semibold">To:</div>
                                                                &nbsp;{" "}
                                                                {end.getDate()}&nbsp;
                                                                {month2.slice(0, 3)}&nbsp;
                                                                {end.getFullYear()}
                                                            </div>
                                                            <div className="justify-start flex">
                                                                <div className="font-semibold ">
                                                                    {user.company_name}{" "}
                                                                </div>
                                                                <div className="text-gray-400">
                                                                    &nbsp; - {user.city}
                                                                </div>
                                                                <div className="text-gray-400">
                                                                    {" "}
                                                                    , {user.country}
                                                                </div>
                                                            </div>
                                                            <div className="text-gray-400">
                                                                {/* {!view ? (
                                  <div className="">
                                    {user.description.slice(0, 50)}...
                                    <div
                                      onClick={() => setView(!view)}
                                      className="text-blue-700 cursor-pointer"
                                    >
                                      view more
                                    </div>
                                  </div>
                                ) : (
                                  <div className="">
                                   ...
                                    <div
                                      onClick={() => setView(!view)}
                                      className="text-blue-700 cursor-pointer"
                                    >
                                      view less
                                    </div>
                                  </div>
                                )} */}
                                                                <Disclosure>
                                                                    {({open}) => (
                                                                        <>
                                                                            <Disclosure.Button onClick={() => {
                                                                                setView(!view)
                                                                            }}
                                                                                               className='text-regular flex w-full justify-between rounded-lg py-2  text-right font-medium text-[#4f46e5] underline '>
                                                                                <span>{setView ? 'Read More' : 'Read Less'}</span>
                                                                            </Disclosure.Button>
                                                                            <Transition
                                                                                leave='transition duration-100 ease-out'
                                                                                leaveFrom='transform scale-100 opacity-100'
                                                                                leaveTo='transform scale-100 opacity-0'
                                                                            >
                                                                                <Disclosure.Panel
                                                                                    className='px-2  pb-2 text-sm text-gray-500'>
                                                                                    {user.description}
                                                                                </Disclosure.Panel>
                                                                            </Transition>
                                                                        </>
                                                                    )}
                                                                </Disclosure>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="border-b-2 mt-10 border-gray-500"/>
                                            <div
                                                className="text-xl font-semibold text-left md:mx-24 mt-10">
                                                Skills / Strengths
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 ">
                                                {user.user_skills.map((user) => {
                                                    return (
                                                        <div key={user.id} className="ml-1 md:ml-24 mt-8">
                                                            <div className="text-lg break-words font-semibold">
                                                                {user.skills}
                                                            </div>
                                                            <div
                                                                className="w-full mt-2 bg-gray-200 h-2 rounded-full mb-6">
                                                                <div
                                                                    className="bg-blue-600 h-2 rounded-full"
                                                                    style={{width: `${user.rating}0%`}}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="border-b-2 mt-10 border-gray-500"/>
                                            <div
                                                className="text-xl font-semibold text-left md:mx-24 mt-10">
                                                Education / Certifications
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 ">
                                                {user.education_certificate.map((user) => {

                                                    return (
                                                        <div key={user.id} data-bs-toggle="modal"
                                                             data-bs-target="#exampleModalScrollable"
                                                             className="ml-1 cursor-pointer md:ml-24 mt-8">
                                                            <div
                                                                className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                                                                id="exampleModalScrollable"
                                                                tabIndex="-1"
                                                                aria-labelledby="exampleModalScrollableLabel"
                                                                aria-hidden="true"
                                                            >
                                                                <div
                                                                    className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
                                                                    <div
                                                                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                                                        <div
                                                                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                                                            <p
                                                                                className="text-xl font-medium leading-normal text-gray-800"
                                                                                id="exampleModalScrollableLabel"
                                                                            >
                                                                                {user.certificate_name}.pdf
                                                                            </p>
                                                                        </div>
                                                                        <div className="modal-body relative p-4">
                                                                            <iframe src={user.certificate}
                                                                                    width="100%"
                                                                                    className="h-96"
                                                                                    title="some"></iframe>
                                                                        </div>
                                                                        <div
                                                                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                                                            <button
                                                                                type="button"
                                                                                className="inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                                                                data-bs-dismiss="modal"
                                                                            >
                                                                                Close
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-lg font-semibold">
                                                                {user.degree_name}
                                                            </div>
                                                            <div className="font-semibold ">
                                                                    {user.university_name}{" "}
                                                                </div>
                                                            <div className="flex">

                                                                <div className="text-gray-400">
                                                                    &nbsp; - {user.city}
                                                                </div>
                                                                <div className="text-gray-400">
                                                                    , {user.country}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="bg-slate-100  md:w-80 flex justify-center rounded py-10 mt-2">
                                                                {" "}

                                                                <div className="text-center">
                                                                    <BsFillFileEarmarkPdfFill
                                                                        className="text-blue-600  ml-12 md:ml-12 mb-2  text-6xl"/>{" "}
                                                                    <div className="text-center  text-blue-500">
                                                                        {user.degree_name} certificate.pdf
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="border-b-2 mt-10 border-gray-500"/>
                                            <div
                                                className="text-lg text-gray-400 font-semibold text-left md:mx-24 mt-10">
                                                Social Media
                                            </div>
                                            <div
                                                className="md:ml-24  mt-8 flex justify-start font-semibold space-x-7 text-4xl">
                                                <BsFacebook className="text-blue-600"/>
                                                <BsLinkedin className="text-blue-700"/>
                                                <BsGithub/>
                                            </div>
                                            <div className="flex rounded px-4 md:px-10 py-2 mt-6 bg-slate-100">
                                                <div className="mt-5 md:my-3 mr-2">By</div>
                                                <img
                                                    className="w-10 rounded-full h-10 m-2"
                                                    src={companyLogo}
                                                    alt=""
                                                />
                                                <div>
                                                    <div className="text-xl">{companyName}</div>
                                                    <div className="text-gray-500">
                                                        {companyTagline}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSharedByAdminDetails;
