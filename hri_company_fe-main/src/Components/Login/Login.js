import LogImg from "./LoginImg.png";
import React, {useState, useEffect} from "react";


import {FcGoogle} from "react-icons/fc";
import {BsApple, BsFacebook} from "react-icons/bs";
import {Link, useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import "./Login.css"

const cookies = new Cookies();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState('')

  async function Login(e) {
    e.preventDefault();
    let data = {email, password};
    console.log(data);
    axios
        .post("auth/company/login", data)
        .then((resp) => {
          console.log(resp);

          navigate(`/Jobs?token=${resp?.data?.user?.token}`);
          toast.success("Login successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          cookies.set("token", resp?.data?.user?.token);
          cookies.set("id", resp.data.user.id);
          cookies.set("email", resp.data.user.email);
        }).catch(function (error) {

      console.log(error.response, "asdadsads")


      toast.error(error.response.data.user.message, {
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

  toast.configure();
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
        <div className="">
          <div className="mx-8 h-auto  md:mx-20 mt-10 md:mt-12 lg:mt-16 ">
            <div className=" md:flex">
              <div className="hidden md:flex md:flex-col  w-1/2">
                <div className="flex md:mt-16 lg:mt-2">
                  <div className="md:text-lg lg:text-2xl xl:text-3xl lg:mt-1 font-semibold ">
                    Welcome to
                  </div>
                  <div className="ml-1  md:text-xl lg:text-3xl xl:text-4xl font-semibold text-[#0865B6]">
                    {companyName}
                  </div>
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
                  <div className="mt-2 text-xs lg:text-base text-neutral-500">
                    Powered by HRI @MyBizmo
                  </div>
                </div>
              </div>
              <div className="border-[3px] w-full py-5 px-5 md:w-1/2  rounded-lg border-[#0865B6] md:ml-20">
                <div className="grid grid-cols-1 gap-y-4">
                  <div className="text-xl  md:text-2xl lg:text-4xl">
                    Login as Recruiter
                  </div>
                  <div className="xl:mt-6">
                    <TextField
                        className="w-full"
                        label="Email"
                        placeholder="Enter Email ID"
                        id="outlined-size-small"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="">
                    <FormControl variant="outlined" className="w-full">
                      <InputLabel htmlFor="outlined-adornment-password" className="">
                        <div className="mt-[-5px]">Enter Your Password</div>
                      </InputLabel>
                      <OutlinedInput
                          label="Current Password"
                          className="w-full"
                          type={values.showPassword ? 'text' : 'password'}
                          onChange={(e) => setPassword(e.target.value)}
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
                  <div className="grid justify-end">
                    <Link to="/ForgotPass">
                      <div className=" text-slate-500 cursor-pointer">
                        Forgot Password?
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Button onClick={Login} className="w-full" variant="contained" style={{backkgroundColor:"#0865B6"}}>
                      Login
                    </Button>
                  </div>
                  <div>
                    <div>
                      <Button
                          fullWidth
                          variant="outlined"
                          style={{borderColor:"#0865B6", color:"#0865B6"}}
                          onClick={() => navigate("/Signup")}
                      >
                        Not a Member? Sign Up
                      </Button>
                    </div>
                  </div>
                  <div className="grid justify-center">
                    <div className="text-neutral-600 font-semibold text-sm">
                      Or login with
                    </div>
                  </div>
                  {/*<div className="flex justify-between mx-5">*/}
                  {/*  <div>*/}
                  {/*    <button>*/}
                  {/*      <FcGoogle/>*/}
                  {/*    </button>*/}
                  {/*  </div>*/}
                  {/*  <div>*/}
                  {/*    <button*/}
                  {/*        className="text-[#0865B6] border-2 xl:px-5 xl:py-2 xl:text-lg px-2 py-1 rounded border-slate-400">*/}
                  {/*      <BsFacebook/>*/}
                  {/*    </button>*/}
                  {/*  </div>*/}
                  {/*  <div>*/}
                  {/*    <button*/}
                  {/*        className="text-neutral-500 border-2 px-2 xl:px-5 xl:py-2 xl:text-lg py-1 rounded border-slate-400">*/}
                  {/*      <BsApple/>*/}
                  {/*    </button>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  <div className="flex justify-center font-semibold text-xs xl:text-sm text-center">
                    <div>The&nbsp;</div>
                    <a href={terms} target="_blank" className="text-[#0865B6]">terms of use&nbsp;</a>
                    <div>and&nbsp;</div>
                    <a href={privacyPolicy} target="_blank" className="text-[#0865B6]">our Policy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
  );
};

export default Login;
