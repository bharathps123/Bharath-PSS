import React, {useEffect, useState} from "react";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const MeetModal = ({
                       title,
                       company,
                       time,
                       date,
                       link,
                       day,
                       onClick,
                       duration,
                       end_time,
                       start_time,
                       meeting_password,
                       note,
                       clock
                   }) => {

    const [sum, setSum] = useState("");

    // const style = {
    //     transform: 'translate(-50%, -50%)',
    //     bgcolor: 'background.paper',
    //     boxShadow: 24,
    //     p: 4,
    // };

    const countDown = (time) => {
        var countDownDate = new Date(time).getTime();

        var x = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setSum(days + "d " + hours + "h " + minutes + "m " + seconds + "s ")

            if (distance < 0) {
                clearInterval(x);
                setSum("Expired")
            }

        }, 1000);

    };

    useEffect(() => {
        countDown(clock);
    }, [clock])

    const meeting_date = new Date(date.slice(0,10))
    const month = meeting_date.toLocaleString('default', {month: 'long'})

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="relative">
            <div className="bg-white px-3 pb-3 pt-16 rounded-lg space-y-3">
                <Modal
                    open={open}
                    onClose={handleClose}
                    className="flex justify-center items-center"
                >
                    <Box className="space-y-2 bg-white p-5 rounded-lg w-5/6 md:w-4/6 lg:w-2/6">
                        <div>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Title: {title}
                            </Typography>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Company: {company ? company : "null"}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                Note: {note}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                Date: {meeting_date.getDate()}&nbsp;{month.slice(0,3)}, {meeting_date.getFullYear()}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                Time: {start_time} - {end_time}
                            </Typography>
                        </div>
                    </Box>
                </Modal>
                {/*<div className="flex item-center justify-end space-x-4">*/}
                {/*    <IconButton onClick={onClick}>*/}
                {/*        <EditIcon/>*/}
                {/*    </IconButton>*/}
                {/*    <p className="bg-gray-400 h-10 w-[1px]"></p>*/}
                {/*    <IconButton>*/}
                {/*        <DeleteSweepIcon/>*/}
                {/*    </IconButton>*/}
                {/*</div>*/}
                <div className="flex items-center space-x-3">
                    <EventNoteIcon/>
                    <div>
                        <p className="text-gray-600 text-lg md:text-xl lg:text-2xl font-semibold">{title}</p>
                        <p className="text-sm md:text-base lg:text-lg">{date}</p>
                    </div>
                </div>
                <div className="flex items-center text-sm md:text-base lg:text-lg space-x-3">
                    <AccessAlarmsIcon/>
                    <p>{time}</p>
                </div>
                <div className="flex items-center space-x-3">
                    {sum === "Expired" && (
                        <div className="flex items-center justify-end">
                            {/*<Button*/}
                            {/*    variant="contained"*/}
                            {/*    onClick={() => {*/}
                            {/*        window.open(*/}
                            {/*            link.substring(0, 8) === 'https://' ? link : `https://${link}`, '_blank'*/}
                            {/*        );*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    Join Now*/}
                            {/*</Button>*/}
                        </div>
                    )}
                    <div className="flex items-center justify-end">
                        {/*<Button variant="outlined">{sum ? sum : "Loading..."}</Button>*/}
                        <Button variant="contained" onClick={handleOpen}>Details</Button>
                    </div>
                </div>
            </div>
            <div
                className="  ">
                <div
                    className="absolute top-0 left-0 flex items-center justify-center
                        bg-blue-200 w-24 h-12 text-base font-semibold rounded-br-lg rounded-tl-lg"
                >
                    {day}
                </div>
                <p className="absolute top-0 right-0 flex items-center justify-center
                    w-24 h-12 cursor-default bg-[#F1F1F1]"
                >
                    {sum ? sum : "Loading..."}
                </p>
            </div>
        </div>
    );
};

export default MeetModal;