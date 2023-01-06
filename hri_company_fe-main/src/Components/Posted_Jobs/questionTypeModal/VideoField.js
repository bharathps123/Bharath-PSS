import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import {VscPlayCircle} from 'react-icons/vsc'

const VideoField = ({ title, description, url }) => {
  const [open, setOpen] = useState(false);
  const [modalTitle2, setModalTitle2] = useState("");
  const [modalDescrip2, setModalDescrip2] = useState("");
  const [modalUrl2, setModalUrl2] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="bg-gray-100 mt-10 lg:mx-20 px-4 py-5 rounded-md text-gray-500">
      <div>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking
      </div>

      <div className="grid gap-y-3 w-1/2 mt-4">
        <div className="">
          <div className="card border-none cursor-pointer rounded-lg m-2">
            <div className="card-body">
              <p className="text-lg lg:text-2xl font-bold">{title}</p>
              <p className="text-base lg:text-xl mb-4">{description}</p>
            <div className="relative"> 
            <div className="absolute   text-white w-[400px] h-full "><div className="flex  justify-center items-center">
                <div className="place-items-center grid h-[220px] w-[400px]">
                <div className=" " ><VscPlayCircle onClick={() => {
                  handleOpen();
                  setModalTitle2(title);
                  setModalDescrip2(description);
                  setModalUrl2(url);
                 
                }} className="text-[40px]  cursor-pointer"/></div> </div></div>
            </div>
             
        
            <video
            style={{borderRadius: '15px'}}
               className='rounded-md h-[220px] w-[400px]'
                onClick={() => {
                  handleOpen();
                  setModalTitle2(title);
                  setModalDescrip2(description);
                  setModalUrl2(url);
                 
                }}
              >
                <source src={url} type="video/mp4" />
              </video>
              </div>
             
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex justify-center items-center"
              >
                <Box className="w-10/12 p-3 border-solid border-[#000] rounded-md bg-white lg:w-1/2 lg:p-5">
                  <p className="text-lg lg:text-2xl font-bold">{modalTitle2}</p>
                  <p className="text-base lg:text-xl mb-4">{modalDescrip2}</p>
                  <ReactPlayer
                    url={modalUrl2}
                    className="react-player"
                    // playing
                    width="100%"
                    height="100%"
                    controls
                  />
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoField;
