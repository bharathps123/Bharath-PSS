import React, {useEffect, useState} from 'react'
import Header from '../NavBar-Sidebar/Header'
import {useSelector} from 'react-redux';
import {selectHeader} from '../features/HeaderSlice';
import {Link, useNavigate} from "react-router-dom";
import Spinner from "../Meeting/Spinner";
import Cookies from "universal-cookie";
import axios from 'axios';
import Button from '@mui/material/Button';
import {MdArrowBackIos, MdDelete} from 'react-icons/md'
import logoMessage from './logoMessage.jpeg'
import nodata from './Nodata.png'

const cookies = new Cookies();

const Message = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [mHeader, setMHeader] = useState("");
    const [mMessage, setMMessage] = useState("");
    const [status, setStatus] = useState("Received")
    const [toDate, setToDate] = useState("3000-1-1");
    const [fromDate, setFromDate] = useState("1900-1-1");
    const [active, setActive] = useState("All");
    const [loading, setLoading] = useState(true)


    const from = new Date(fromDate);
    const to = new Date(toDate);

    const currentState = useSelector(selectHeader);

    async function getData() {
        await axios
            .get(`hri_company/message?message_type=${status}`, {
                headers: {
                    Authorization: "Token " + cookies.get("token"),
                },
            })
            .then((resp) => {
                setData(resp.data);
                console.log(resp.data);
                setLoading(false)

            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function getMessage(id) {
        await axios
            .get(`hri_company/message/${id}?message_type=${status}`, {
                headers: {
                    Authorization: "Token " + cookies.get("token"),
                },
            })
            .then((resp) => {
                setMHeader(resp.data.header);
                setMMessage(resp.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    async function deleteMessage(id) {
        console.log(id)
        await axios
            .get(`hri_company/message/delete/${id}`, {
                headers: {
                    Authorization: "Token " + cookies.get("token"),
                },
            })
            .then((resp) => {
            })
            .catch((err) => {
                console.log(err);
            });
        getData()
    };

    useEffect(() => {

        getData();

    }, [toDate, fromDate, status]);

    const all = () => {
        setActive("All")
        setStatus("Received")
    }
    const unRead = () => {
        setActive("un-read")
        setStatus("Unread")
    }
    const sent = () => {
        setActive("sent")
        setStatus("Sent")
    }


    return (
        <>
            <Header/>

            <div className='bg-gray-100 w-full h-auto mt-[68px] '>
                <div
                    className={!currentState?.show ? ' lg:ml-72 ease-in duration-300 h-auto' : ' ease-in  duration-300 h-auto ml-0 '}>
                    <div className=" bg-white w-full  h-auto lg:flex justify-between">
                        <div
                            className={!currentState?.show ? 'bg-white flex  space-x-1 text-xs md:text-xs lg:text-xl  font-semibold p-1 text-gray-600  md:p-2 ' : "bg-white space-x-1 flex  lg:space-x-4 text-xs md:text-lg xl:text-xl  font-semibold p-1 text-gray-600  md:p-2 "}>
                            {active === "All" ?
                                <div onClick={all}
                                     className={!currentState?.show ? 'p-3 text-lg cursor-pointer rounded-lg lg:py-5 xl:py-3 md:px-3 lg:px-4 bg-slate-100 text-blue-700' : 'p-3 rounded-lg md:px-8 lg:py-5 xl:py-3 bg-slate-100 text-blue-700'}>Received</div>
                                : <div onClick={all}
                                       className={!currentState?.show ? 'p-3 text-lg rounded-lg cursor-pointer lg:py-5 xl:py-3 md:px-3 lg:px-4 hover:bg-slate-100 hover:text-blue-700' : 'p-3 rounded-lg md:px-8 lg:py-5 xl:py-3 hover:bg-slate-100 hover:text-blue-700'}>Received</div>}
                            {active === "un-read" ?
                                <div onClick={unRead}
                                     className={!currentState?.show ? 'p-3 text-lg rounded-lg cursor-pointer lg:py-5 xl:py-3 md:px-3 lg:px-4 bg-slate-100 text-blue-700' : 'p-3 rounded-lg md:px-8 lg:py-5 xl:py-3 bg-slate-100 text-blue-700'}>Un-Read</div>
                                : <div onClick={unRead}
                                       className={!currentState?.show ? 'p-3 rounded-lg text-lg lg:py-5 cursor-pointer xl:py-3 md:px-3 lg:px-4 hover:bg-slate-100 hover:text-blue-700' : 'p-3 rounded-lg md:px-8 lg:py-5 xl:py-3 hover:bg-slate-100 hover:text-blue-700'}>Un-Read</div>}
                            {active === "sent" ?
                                <div onClick={sent}
                                     className={!currentState?.show ? 'p-3  text-lg rounded-lg lg:py-5 cursor-pointer xl:py-3 md:px-3 lg:px-4 bg-slate-100 text-blue-700' : 'p-3 rounded-lg md:px-8 lg:py-5 xl:py-3 bg-slate-100 text-blue-700'}>Sent</div>
                                : <div onClick={sent}
                                       className={!currentState?.show ? 'p-3 text-lg rounded-lg lg:py-5 xl:py-3 cursor-pointer md:px-3 lg:px-4 hover:bg-slate-100 hover:text-blue-700' : 'p-3 rounded-lg md:px-8 lg:py-5 xl:py-3 hover:bg-slate-100 hover:text-blue-700'}>Sent</div>}


                        </div>

                        <div className="md:flex mb-4 ml-4 md:ml-0 lg:mb-0 py-3 lg:pb-5  xl:pb-3">
                            <div className="flex">
                                <span
                                    className="text-base mt-3 lg:mt-4 xl:mt-3 text-slate-400 mr-2 md:ml-10">From&nbsp;:</span>
                                <input
                                    onChange={(e) => {
                                        setFromDate(e.target.value);
                                    }}
                                    className="mt-1  md:mr-10 lg:mr-4 xl:mr-10   w-44 px-4 py-2 bg-white border shadow-sm border-slate-300 placeholder-text-bold placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-2xl sm:text-sm focus:ring-1"
                                    type="date"
                                    placeholder=""
                                />
                            </div>
                            <div className="flex mt-2 md:mt-0">
                                <span
                                    className="text-base mr-5 md:mr-0 mt-3 lg:mt-4 xl:mt-3 text-slate-400 ">To&nbsp;:</span>
                                <input
                                    onChange={(e) => {
                                        setToDate(e.target.value);

                                    }}
                                    className="mt-1 ml-2  placeholder-text-sm w-44 px-4 py-2 bg-white border shadow-sm border-slate-300 placeholder-text-bold placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-2xl sm:text-sm focus:ring-1"
                                    type="date"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className="mb-4 lg:mb-0 lg:mt-2 xl:mt-1 ml-4 md:ml-10">
                            <div
                                className={!currentState?.show ? 'mt-1 mr-2 md:mt-3 lg:mt-4 md:mr-3 lg:mr-10' : 'mt-1 mr-2 md:mt-4 md:mr-10'}>
                                <Link to="/SendMessage">
                                    <Button className='w-auto px-5' size="small" variant="contained">Send
                                        message</Button>

                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-4 bg-gray-100 px-4 md:px-10   w-full h-screen'>
                <div
                    className={!currentState?.show ? ' lg:ml-72 ease-in duration-300 ' : ' ease-in  duration-300  ml-0 '}>
                    <div className='overflow-auto  rounded-lg shadow  mb-20'>
                        {data.length ? (
                            <table className="w-full ">
                                <thead className="bg-slate-200 border-b-2 border-gray-200">
                                <tr className='text-blue-700 '>
                                    <th className="w-20 p-3 pl-10 text-lg font-semibold tracking-wide text-center">
                                        Sender
                                    </th>
                                    <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                                        Message
                                    </th>
                                    <th className="w-10 p-3 text-lg font-semibold tracking-wide text-center">
                                        Date
                                    </th>
                                    <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                                        Details
                                    </th>
                                    <th className="w-24 p-3 text-lg font-semibold tracking-wide text-center">
                                        Delete
                                    </th>
                                </tr>
                                </thead>


                                <tbody className="divide-y divide-gray-100 text-center">
                                {data.map((user) => {
                                    cookies.set("id", user.id)
                                    const date = new Date(user.updated_at.slice(0, 10))
                                    const month = date.toLocaleString('default', {month: 'long'});
                                    if (from <= date && date <= to) {
                                        return (
                                            <tr

                                                key={user.id}

                                                className="bg-white cursor-pointer hover:bg-slate-100"

                                            >
                                                <td className="p-3  pl-10 text-base text-gray-700 whitespace-nowrap">
                                                    {user.sender_name}
                                                    {cookies.set("senderName", user.sender_name)}

                                                </td>
                                                <td className="p-3  MessageLine text-base text-gray-700 whitespace-nowrap">

                                                    <div className='font-semibold  text-lg'>{user.header}</div>
                                                    {user.message.slice(0, 50)}
                                                </td>
                                                <td className="p-3 text-base text-gray-700 whitespace-nowrap">
                                                    {date.getDate()}&nbsp;
                                                    {month.slice(0, 3)}&nbsp;
                                                    {date.getFullYear()}
                                                </td>
                                                <td className="p-3  text-base text-gray-700 whitespace-nowrap">
                                                    <div onClick={() => getMessage(user.id)}
                                                         data-bs-toggle="modal"
                                                         data-bs-target="#exampleModalCenter"
                                                         className='bg-slate-100  py-2 rounded-lg text-blue-600 hover:bg-slate-300 hover:text-blue-700 '> View
                                                        Message
                                                    </div>
                                                </td>
                                                <td className="p-3 text-center  text-base text-gray-700 whitespace-nowrap">
                                                    <div onClick={() => {
                                                        deleteMessage(user.id);
                                                    }} className='flex justify-center'><MdDelete
                                                        className='text-2xl text-red-500 hover:text-3xl'/></div>

                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                                </tbody>
                            </table>
                        ) : (
                            <div className='flex justify-center w-full'>
                                {loading ? <div className='flex justify-center w-full'><Spinner/></div> :
                                    <div className='flex justify-center w-full'><img src={nodata} alt="noData"/></div>}

                            </div>

                        )}


                        <div
                            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                            id="exampleModalCenter"
                            tabIndex="-1"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-modal="true"
                            role="dialog"
                        >
                            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                                <div
                                    className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                    <div className=" bg-blue-200  rounded-t-lg w-full h-auto p-4 md:pl-10 md:pr-10">
                                        <div className="flex justify-between ">
                                            <button
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                                className="text-sky-600 flex"
                                            >
                                                <MdArrowBackIos className="mt-1"/>
                                                <div className="font-semibold">Back</div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="modal-header flex flex-shrink-0 items-center p-4  rounded-t-md">
                                        <div>
                                            <img className="w-10 h-10 rounded-full" src={logoMessage} alt=""/>

                                        </div>
                                        <div
                                            className="text-xl ml-4 break-all font-medium leading-normal text-gray-800"
                                            id="exampleModalCenteredScrollableLabel"
                                        >
                                            {mHeader}
                                        </div>
                                    </div>
                                    <div className="modal-body break-all relative p-4">
                                        <div>{mMessage}</div>
                                    </div>
                                    <div
                                        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-start p-4 border-t border-gray-200 rounded-b-md">
                                        <Link to="/SendReply">
                                            <button
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                                type="button"
                                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-3xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                            >
                                                Reply
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Message