import React, {useState} from "react";
import axios from "axios";
// import {base_url} from "../../components/consts";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import {toast} from "react-toastify";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { selectHeader} from '../features/HeaderSlice';
import { useSelector } from 'react-redux';
import {
    Button,
    Card,
    CardContent,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";

import Cookies from "universal-cookie";
import Header from "../NavBar-Sidebar/Header";

const cookies = new Cookies();

toast.configure();

const Settings = () => {
    const currentState = useSelector(selectHeader);
    const [active, setActive] = useState("btn1")
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const data = {
        old_password: oldPassword,
        new_password: newPassword
    }

    const ChangePassword = () => {
        axios
            .post(
                '/auth/user/changepassword',
                data,
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token")
                    },
                },
            )
            .then((res) => {
                console.log("Succesfully Changed Password", res);
                window.location.reload();
                toast.success("Successfully Changed Password", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    style: {backgroundColor: "#1ab394", color: "white"},
                    icon: false,
                    progressStyle: {backgroundColor: "#BAE8DE"},
                });
            })
            .catch((err) => {
                console.log(err);
                if (oldPassword === "") {
                    toast.error("Please enter the old password", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        style: {backgroundColor: "#FF6347", color: "white"},
                        icon: false,
                        progressStyle: {backgroundColor: "#FFB1A3"},
                    });
                } else if (newPassword === "") {
                    toast.error("Please enter the new password", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        style: {backgroundColor: "#FF6347", color: "white"},
                        icon: false,
                        progressStyle: {backgroundColor: "#FFB1A3"},
                    });
                } else {
                    toast.error("Error", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        style: {backgroundColor: "#FF6347", color: "white"},
                        icon: false,
                        progressStyle: {backgroundColor: "#FFB1A3"},
                    });
                }
            });
    }


    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });


    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword2 = () => {
        setValues({
            ...values,
            showPassword2: !values.showPassword2,
        });
    };

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword3 = () => {
        setValues({
            ...values,
            showPassword3: !values.showPassword3,
        });
    };

    const handleMouseDownPassword3 = (event) => {
        event.preventDefault();
    };

    const Checking_Password = function () {
        if (document.getElementById("new_password").value === document.getElementById("confirm_password").value) {
            console.log("password same");
            ChangePassword();
        } else if ((document.getElementById("confirm_password").value) === "") {
            toast.error("Please enter confirm password", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                style: {backgroundColor: "#FF6347", color: "white"},
                icon: false,
                progressStyle: {backgroundColor: "#FFB1A3"},
            });
        } else {
            toast.error("New Password does not match", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                style: {backgroundColor: "#FF6347", color: "white"},
                icon: false,
                progressStyle: {backgroundColor: "#FFB1A3"},
            });
        }
    }

    //Forgot password
    const [userEmail, setUserEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newForgetPassword, setNewForgetPassword] = useState("");

    const dataToForgetPassword = {
        email: userEmail,
    };

    const ForgotPassword = (e) => {
        e.preventDefault();

        axios
            .post
            (
                '/auth/user/forgot/password',
                dataToForgetPassword,
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                setOtp(res.data.otp);
                setActive("btn3");
                toast.success(`Your OTP for forget password has been sent to your email id`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    style: {backgroundColor: "#1ab394", color: "white"},
                    icon: false,
                    progressStyle: {backgroundColor: "#BAE8DE"},
                });
            })
            .catch((err) => {
                console.log(err);
                if (userEmail === "") {
                    toast.error("Please Enter Email id", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        style: {backgroundColor: "#FF6347", color: "white"},
                        icon: false,
                        progressStyle: {backgroundColor: "#FFB1A3"},
                    });
                } else {
                    toast.error("Please Enter Correct Email", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        style: {backgroundColor: "#FF6347", color: "white"},
                        icon: false,
                        progressStyle: {backgroundColor: "#FFB1A3"},
                    });
                }
            });
    };

    //Verify OTP
    const dataToVerifyOtp = {
        email: userEmail,
        otp: otp,
    };

    const VerifyOtp = (e) => {
        e.preventDefault();

        axios
            .post
            (
                '/auth/user/forgot/password/verify',
                dataToVerifyOtp,
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                setActive("btn4");
                toast.success(`${res.data.message}`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    style: {backgroundColor: "#1ab394", color: "white"},
                    icon: false,
                    progressStyle: {backgroundColor: "#BAE8DE"},
                });
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error verifying OTP", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    style: {backgroundColor: "#FF6347", color: "white"},
                    icon: false,
                    progressStyle: {backgroundColor: "#FFB1A3"},
                });
            });
    };

    //Reset Password
    const dataToResetPassword = {
        password: newForgetPassword
    };

    const ResetPassword = (e) => {
        e.preventDefault();

        axios
            .post(
                '/auth/user/reset/password',
                dataToResetPassword,
                {
                    headers: {
                        Authorization: "Token " + cookies.get("token"),
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                setActive("btn1");
                toast.success(`Password changed Successfully`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    style: {backgroundColor: "#1ab394", color: "white"},
                    icon: false,
                    progressStyle: {backgroundColor: "#BAE8DE"},
                });
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error occurred while changing password", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    style: {backgroundColor: "#FF6347", color: "white"},
                    icon: false,
                    progressStyle: {backgroundColor: "#FFB1A3"},
                });
            });
    };

    return (
        <>
        <Header/>
        <div className='bg-gray-100 w-full h-screen mt-[68px]'>
        <div className={!currentState?.show?' lg:ml-72 ease-in duration-300 ' : ' ease-in  duration-300  ml-0 '}>
        <div className="py-3 px-3">

            {active === "btn1" ? <div>
                <div className="card rounded-lg bg-white mb-3  border-none">
                    <div className="card-body mx-4 mb-4 mt-2">
                        <div className="card-text">
                            <div className="text-2xl font-semibold pt-5 px-5 text-sky-700">Change Password</div>
                            <div className=" row p-6 space-y-5">
                                <div>
                                    
                                    <div className="mt-3 ">
                                        <FormControl variant="outlined" className="m-2 w-full sm:mr-5">
                                            <InputLabel htmlFor="outlined-adornment-password">
                                                Current Password
                                            </InputLabel>
                                            <OutlinedInput
                                                label="Current Password"
                                                className="w-full md:w-[255px] lg:w-[320px]"
                                                type={values.showPassword ? 'text' : 'password'}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            type={values.showPassword ? 'text' : 'password'}
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                required
                                            />
                                        </FormControl>
                                    </div>
                                </div>

                                <div className=" ">
                                    <div className="grid gap-y-4 md:grid-cols-2">
                                        <FormControl variant="outlined" className="m-2">
                                            <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                            <OutlinedInput
                                                label="New Password"
                                                id="new_password"
                                                className="sm:w-52 md:w-64 lg:w-80"
                                                type={values.showPassword2 ? 'text' : 'password'}
                                                onChange={(e) => setNewPassword(e.target.value)} endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        type={values.showPassword ? 'text' : 'password'}
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword2}
                                                        onMouseDown={handleMouseDownPassword2}
                                                        edge="end"
                                                    >
                                                        {values.showPassword2 ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                                required
                                            />
                                        </FormControl>

                                        <FormControl variant="outlined" className="m-2">
                                            <InputLabel htmlFor="outlined-adornment-password">Confirm
                                                Password</InputLabel>
                                            <OutlinedInput
                                                label="Confirm Password"
                                                id="confirm_password"
                                                className="sm:w-52 md:w-64 lg:w-80"
                                                type={values.showPassword3 ? 'text' : 'password'}
                                                onChange={(e) => setNewPassword(e.target.value)} endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        type={values.showPassword ? 'text' : 'password'}
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword3}
                                                        onMouseDown={handleMouseDownPassword3}
                                                        edge="end"
                                                    >
                                                        {values.showPassword2 ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                                required
                                            />
                                        </FormControl>
                                    </div>

                                </div>
                                <div className="grid gap-y-4 gap-x-4  md:grid-cols-2 md:mr-20">
                                    <Button
                                        className="py-2 px-4 m-2"
                                        onClick={Checking_Password}
                                        style={{
                                            backgroundColor: "#F1F1F1",
                                            color: "#0865B6",
                                            fontSize: "13px",
                                            borderRadius: "0.4rem"
                                        }}
                                    >
                                        <DoneAllIcon/>
                                        Save
                                    </Button>
                                    <Button
                                        className="py-2 px-4 m-2"
                                        onClick={() => setActive("btn2")}
                                        style={{
                                            backgroundColor: "#F1F1F1",
                                            color: "#0865B6",
                                            fontSize: "13px",
                                            borderRadius: "0.4rem"
                                        }}
                                    >
                                        <CloseIcon/>
                                        Forgot Password
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <></>}

            {active === "btn2" ? <div>
                <Card elevation={0}>
                    <CardContent className=" mx-4 mb-4 mt-2">
                        <div className="text-2xl font-semibold text-sky-700">Forget Password</div>

                        <div className="my-4 md:w-1/2 lg:w-2/6">
                            <TextField
                                fullWidth
                                label="Email ID"
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                helperText="Please enter your Email ID"
                            />
                        </div>
                        <div className="space-x-4">
                            <Button
                                className="py-2 px-4"
                                style={{
                                    backgroundColor: "#F1F1F1",
                                    color: "#0865B6",
                                    fontSize: "13px",
                                    borderRadius: "0.4rem"
                                }}
                                onClick={ForgotPassword}
                            >
                                Next
                            </Button>

                            <Button
                                className="py-2 px-4"
                                style={{
                                    backgroundColor: "#F1F1F1",
                                    color: "#0865B6",
                                    fontSize: "13px",
                                    borderRadius: "0.4rem"
                                }}
                                onClick={() => setActive("btn1")}
                            >
                                Cancel
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </div> : <></>}

            {active === "btn3" ? <div>
                <Card elevation={0}>
                    <CardContent className=" mx-4 mb-4 mt-2">
                        <div className="text-2xl font-semibold text-sky-700">Verify OTP</div>

                        <div className="my-4 md:w-1/2 lg:w-2/6">
                            <TextField
                                fullWidth
                                label="OTP"
                                type="number"
                                helperText="Enter OTP here to verify"
                                // value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        <div className="space-x-4">
                            <Button
                                className="py-2 px-4"
                                style={{
                                    backgroundColor: "#F1F1F1",
                                    color: "#0865B6",
                                    fontSize: "13px",
                                    borderRadius: "0.4rem"
                                }}
                                onClick={VerifyOtp}
                            >
                                Verify
                            </Button>

                            <Button
                                className="py-2 px-4"
                                style={{
                                    backgroundColor: "#F1F1F1",
                                    color: "#0865B6",
                                    fontSize: "13px",
                                    borderRadius: "0.4rem"
                                }}
                                onClick={() => setActive("btn1")}
                            >
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div> : <></>}

            {active === "btn4" ? <div>
                <Card elevation={0}>
                    <CardContent className=" mx-4 mb-4 mt-2">
                        <div className="text-2xl font-semibold text-sky-700">Enter New password</div>

                        <div className="my-4 md:w-1/2 lg:w-2/6">
                            <TextField
                                fullWidth
                                label="Enter Your New Password"
                                type="email"
                                value={newForgetPassword}
                                onChange={(e) => setNewForgetPassword(e.target.value)}
                            />
                        </div>
                        <div className="space-x-4">
                            <Button
                                className="py-2 px-4"
                                style={{
                                    backgroundColor: "#F1F1F1",
                                    color: "#0865B6",
                                    fontSize: "13px",
                                    borderRadius: "0.4rem"
                                }}
                                onClick={ResetPassword}
                            >
                                Reset
                            </Button>

                            <Button
                                className="py-2 px-4"
                                style={{
                                    backgroundColor: "#F1F1F1",
                                    color: "#0865B6",
                                    fontSize: "13px",
                                    borderRadius: "0.4rem"
                                }}
                                onClick={() => setActive("btn1")}
                            >
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div> : <></>}

        </div>
        </div>
        </div>
        </>
    )
}

export default Settings;