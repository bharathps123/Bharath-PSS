import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import {VscPlayCircle} from 'react-icons/vsc'

const TextField = ({  text }) => {


  return (
    <div className="bg-gray-100 mt-10 mx-20 px-4 py-5 rounded-md text-gray-500">
      <div>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking
      </div>

      <div className="grid gap-y-3  mt-4">
        <div className="">
          <div className="card border-none cursor-pointer rounded-lg m-2">
          <p>
            {text}
          </p>
         
    </div>
    </div>
    </div>
    </div>
    
  );
};

export default TextField;
