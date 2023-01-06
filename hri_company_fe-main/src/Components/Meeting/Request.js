import axios from "axios";
import { toast } from "react-toastify";
import {base_url} from "./consts";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const getRequest = (endPoint, setData) => {
  axios
    .get(endPoint, {
      headers: {
        Authorization: "Token " + cookies.get("token"),
      },
    })
    .then((res) => {
      console.log("response from submitting the form successful", res.data);
       
      setData(res.data);
    })
    .catch((err) => {
      console.log("ERROR  from update in form", err);
      toast.error("Some error occurred");
    });
};

const postRequest = (endPoint, data, path) => {
  axios
    .post(`${base_url}/${endPoint}`, data, {
      headers: {
        Authorization: "Token " + cookies.get("token"),
      },
    })
    .then((res) => {
      console.log("response from submitting the form successful", res.data);
       
      // window.location.replace(path);
    })
    .catch((err) => {
      console.log("ERROR  from update in form", err);
      toast.error("Some error occurred");
    });
};

const updateRequest = (endPoint, data, path) => {
  axios
    .put(`${base_url}/${endPoint}`, data, {
      headers: {
        Authorization: "Token " + cookies.get("token"),
      },
    })
    .then((res) => {
      console.log("response from submitting the form successful", res.data);
       
      window.location.replace(path);
    })
    .catch((err) => {
      console.log("ERROR  from update in form", err);
      toast.error("Some error occurred");
    });
};

const deleteRequest = (endPoint, path) => {
  axios
    .get(`${base_url}/${endPoint}`, {
      headers: {
        Authorization: "Token " + cookies.get("token"),
      },
    })
    .then((res) => {
      console.log("response from submitting the form successful", res.data);
       
      window.location.replace(path);
    })
    .catch((err) => {
      console.log("ERROR  from update in form", err);
      toast.error("Some error occurred");
    });
};

export { getRequest, postRequest, updateRequest, deleteRequest };