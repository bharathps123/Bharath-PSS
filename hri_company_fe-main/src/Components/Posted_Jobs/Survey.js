import React, { useEffect, useState } from "react";
import Header from "../NavBar-Sidebar/Header";
import { selectHeader } from "../features/HeaderSlice";
import { useSelector } from "react-redux";


import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

import { message, Upload, Radio } from 'antd';
import ChoiceField from "./questionTypeModal/ChoiceField";
import VideoField from "./questionTypeModal/VideoField";
import ImageField from "./questionTypeModal/ImageField";
import FileField from "./questionTypeModal/FileField";
import TextField from "./questionTypeModal/TextField";

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


const cookies = new Cookies();

const Survey = () => {
  const [data, setData] = useState([]);


  
  async function getData() {
    await axios
      .get(`survey/answer-list/${cookies.get('assimentId')}/${cookies.get('userId')}`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((resp) => {
        setData(resp.data);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);
  const currentState = useSelector(selectHeader);

  return (
    <>
      <Header />

      <div className="bg-gray-100 w-full h-auto mt-[68px] p-4">
        <div
          className={
            !currentState?.show
              ? " lg:ml-72 ease-in duration-300 "
              : " ease-in  duration-300  ml-0 "
          }
        >
          
          <div className="bg-white rounded-md px-4 py-4" >
            <div className="font-semibold text-2xl text-gray-600">Survey Discription.</div>
       
          <div className="mt-6 text-gray-400">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here
          </div>
          {data.map((item,index) => {
            return(
              <>
             
              {item.question_detail?.question_type  ==='VideoField'?
              <VideoField title={''} questionNum={index +1}   url={item.answer_media} description={item.question_detail.description}  /> :null}
               {item.question_detail?.question_type  ==='ImageField'?
              <ImageField qouestionNum={index +1}   url={item.answer_media}/> :null}
               {item.question_detail?.question_type  ==='FileField'?
               <FileField qouestionNum={index +1}   url={item.answer_media} description={item.question_detail.description} title={''}   /> :null}
                 {item.question_detail?.question_type  ==='ChoiceField'?
              <ChoiceField questionNum={index +1}   option={item.question_detail.options} rytAns={item.question_detail.correct_answer} answer={item.answer}/> :null}
                {item.question_detail?.question_type  ==="TextField"?
                <TextField qouestionNum={index +1}   text={item.answer}/> :null}
              </>
            )
          })}
          
          
        
     
        
             </div>
        </div>
      </div>
    </>
  );
};

export default Survey;
