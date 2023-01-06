import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";

import { Box } from "@mui/material";
import {BsFileEarmarkPdf} from 'react-icons/bs'
import { Modal } from "antd";

const FileField = ({ title, description, url }) => {
  const [open, setOpen] = useState(false);
  const [modalTitle2, setModalTitle2] = useState("");
  const [modalDescrip2, setModalDescrip2] = useState("");
  const [modalUrl2, setModalUrl2] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-gray-100 mt-10 lg:mx-20 px-4 py-5 rounded-md text-gray-500">
      <div>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking
      </div>

      <div className="grid gap-y-3 lg:w-1/2 mt-4">
        <div className="">
          <div className=" border-none cursor-pointer rounded-lg m-2">
            <div className="card-body">
              <p className="text-lg lg:text-2xl font-bold">{title}</p>
              <p className="text-base lg:text-xl mb-4">{description}</p>
            <div className="relative"> 
            <div  onClick={() => {
                showModal()
                  setModalTitle2(title);
                  setModalDescrip2(description);
                  setModalUrl2(url);
                 
                }} className="absolute    lg:w-[400px] h-full "><div className="flex  justify-center items-center">
                <div className="place-items-center grid h-[220px] lg:w-[400px] w-48">
                <div className=" " ><BsFileEarmarkPdf className="text-[50px]  cursor-pointer"/></div> </div></div>
            </div>
                </div>
        
            <div
            style={{borderRadius: '15px'}}
               className='rounded-md h-[220px] bg-sky-200  lg:w-[400px]'
                onClick={() => {
                    showModal()
                    setModalTitle2(title);
                    setModalDescrip2(description);
                    setModalUrl2(url);
                 
                }}
              >
                <source src={url} type="video/mp4" />
              </div>
             
              <Modal  visible={isModalVisible} onCancel={handleCancel}>
              <iframe src={modalUrl2} title="file" className="lg:w-[400px] lg:h-[400px]" />
      </Modal>
              {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex justify-center items-center"
              >
                <Box className=" p-3 border-solid border-[#000] rounded-md bg-white ">
                  <p className="text-lg lg:text-2xl font-bold">{modalTitle2}</p>
                  <p className="text-base lg:text-xl mb-4">{modalDescrip2}</p>
               
                </Box>
              </Modal> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileField;
