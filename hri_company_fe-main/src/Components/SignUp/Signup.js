import LogImg from "../Login/LoginImg.png";
import {useEffect, useState} from "react";

import IconButton from "@mui/material/IconButton";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Cookies from "universal-cookie";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Checkbox} from "@mui/material";
import {toast} from "react-toastify";

const cookies = new Cookies();


const Signup = () => {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [is_company, setIs_company] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState("");
    const [tnc, setTnc] = useState(false);
    const [email, setEmail] = useState("");

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const signUpCompany = () => {
        let data = {email, password, is_company};
        if (tnc === true && password === confirmPassword) {
            axios
                .post(
                    `auth/user/register`,
                    {
                        email: email,
                        password: password,
                        is_company: is_company,
                    }
                )
                .then((resp) => {
                    console.log(resp);
                    navigate("/VerifySignup");
                    cookies.set("token", resp.data.token);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error(`Please agree to Terms and Conditions`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    async function SignUp(e) {
        e.preventDefault();
        let data = {email, password, is_company};
        if (tnc === true && password === confirmPassword) {
            axios
                .post("auth/user/register", data)
                .then((resp) => {
                    console.log(resp);
                    navigate("/VerifySignup");
                    cookies.set("token", resp.data.token);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const [values, setValues] = useState({
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
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

    const [companyName, setCompanyName] = useState("");
    const [tagline, setTagline] = useState("");
    const [terms, setTerms] = useState("");
    const [privacyPolicy, setPrivacyPolicy] = useState("");

    const GetDetails = () => {
        axios
            .get(
                `profile/landing-page`,
            )
            .then((res) => {
                setCompanyName(res.data.business_details[0].name);
                setTagline(res.data.business_details[0].tag_line);
                setTerms(res.data.business_details[0].terms);
                setPrivacyPolicy(res.data.business_details[0].privacy_policy);
            })
            .catch((err) => {
                console.log("error: ", err)
            })
    };

    useEffect(() => {
        GetDetails();
    }, []);

    return (
        <>
            <div className="mx-8 h-auto md:mx-12 lg:mx-20 mt-10 md:mt-12 lg:mt-16 ">
                <div className=" md:flex">
                    <div className="hidden md:flex md:flex-col w-1/2">
                        <div className="flex md:mt-16 lg:mt-2">
                            <div className="md:text-lg lg:text-2xl xl:text-3xl lg:mt-1 font-semibold ">
                                Welcome to
                            </div>
                            {/*<div className="ml-1  md:text-xl lg:text-3xl xl:text-4xl font-semibold text-[#0865B6]">*/}
                            {/*  {companyName}*/}
                            {/*</div>*/}
                        </div>
                        <div className="text-neutral-500 md:text-sm lg:text-lg">
                            {tagline}
                        </div>

                        <div className=" mt-10 xl:mt-0 xl:pl-10 xl:pt-10 xl:pr-10 2xl:p-20">
                            <img
                                src={LogImg}
                                alt=""
                            />
                        </div>
                        <div className="grid justify-end">
                            <div className="mt-2 text-xs lg:text-base text-slate-500">
                                Powered by HRI @MyBizmo
                            </div>
                        </div>
                    </div>

                    <div className="border-[3px] w-full py-4 px-5 md:w-1/2  rounded-lg border-[#0865B6] md:ml-20">
                        <div className="grid grid-cols-1 gap-y-4">
                            <div className="text-xl mb-4 md:mb-6 lg:mb-10 md:text-2xl lg:text-4xl">
                                Sign Up as Recruiter
                            </div>
                            <div className="xl:mt-6">
                                <TextField
                                    className="w-full "
                                    label="Enter Full Name"
                                    id="outlined-size-small"
                                />
                            </div>
                            <div>
                                <TextField
                                    className="w-full "
                                    label={"Email"}
                                    placeholder="Enter Email ID"
                                    id="outlined-size-small"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <FormControl variant="outlined" className="w-full">
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Create Password
                                    </InputLabel>
                                    <OutlinedInput
                                        label="Create Password"
                                        className="w-full"
                                        type={values.showPassword ? "text" : "password"}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    type={values.showPassword ? "text" : "password"}
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? (
                                                        <VisibilityOff/>
                                                    ) : (
                                                        <Visibility/>
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        required
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl variant="outlined" className=" w-full">
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Confirm Password
                                    </InputLabel>
                                    <OutlinedInput
                                        label="Confirm Password"
                                        id="new_password"
                                        className="w-full"
                                        type={values.showPassword2 ? "text" : "password"}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    type={values.showPassword ? "text" : "password"}
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword2}
                                                    onMouseDown={handleMouseDownPassword2}
                                                    edge="end"
                                                >
                                                    {values.showPassword2 ? (
                                                        <VisibilityOff/>
                                                    ) : (
                                                        <Visibility/>
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        required
                                    />
                                </FormControl>
                            </div>
                            <div className="mt-2 xl:mt-6">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{backgroundColor:"#0865B6"}}
                                    onClick={signUpCompany}
                                >
                                    SignUp
                                </Button>
                            </div>
                            <div>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    style={{borderColor: "#0865B6"}}
                                    onClick={() => navigate("/")}
                                >
                                    Already have an account? login...
                                </Button>
                            </div>

                            <div className="inline-flex justify-center font-semibold text-center">
                                <Checkbox
                                    {...label}
                                    onChange={(e) => setTnc(e.target.checked)}
                                />
                                <p>
                                    By signing you agree to the <b className="text-[#0865B6]">terms of use</b> and <b
                                    className="text-[#0865B6]">our Policy</b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
