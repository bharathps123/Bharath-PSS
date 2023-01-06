import ForgotPass from "./Components/ForgotPass/ForgotPass";
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Jobs from "./Components/Posted_Jobs/Jobs";
import EnterOtp from "./Components/ForgotPass/EnterOtp";
import ChangePass from "./Components/ForgotPass/ChangePass";
import CompanyProfile from "./Components/CompanyProfile/CompanyProfile";
import Message from "./Components/Message/Message";
import SendMessage from "./Components/Message/SendMessage";
import SendReply from "./Components/Message/SendReply";
import JobDetails from "./Components/Posted_Jobs/JobDetails";
import Profile from "./Components/Profile/Profile";
import Settings from "./Components/Settings/Settings";
import EditProfile from "./Components/Profile/EditProfile";
import CompanyEdit from "./Components/CompanyProfile/CompanyEdit";
import ProfileSharedByAdmin from "./Components/ProfileSharedByAdmin/ProfileSharedByAdmin";
import AddNewPosition from "./Components/Posted_Jobs/AddNewPosition";
import ProfileSharedByAdminDetails from "./Components/ProfileSharedByAdmin/ProfileSharedByAdminDetails";
import EditJobDetails from "./Components/Posted_Jobs/EditJobDetails";
import Meeting from "./Components/Meeting/Meeting";
import { Upcoming } from "@mui/icons-material";
import Previous from "./Components/Meeting/Previous";
import Help from "./Components/Help/Help";
import VerifyOtp from "./Components/SignUp/VerifyOtp";
import CreateCompanyProfile from "./Components/CompanyProfile/CreateCpmpanyProfile";
import JobResponse from "./Components/Posted_Jobs/JobResponse";
import Survey from "./Components/Posted_Jobs/Survey";
import Search from './Components/Search/Search'
import Calender from './Components/Calender/Calender'
import Colleges from "./Components/Colleges/Colleges";



function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/Signup" element={<Signup/>} />
      <Route exact path="/ForgotPass" element={<ForgotPass/>} />
      <Route exact path="/EnterOtp" element={<EnterOtp/>} />
      <Route exact path="/ChangePass" element={<ChangePass/>} />
      <Route exact path="/Jobs" element={<Jobs/>} />
      <Route exact path="/CompanyProfile" element={<CompanyProfile/>} />
      <Route exact path="/CompanyEdit" element={<CompanyEdit/>} />
      <Route exact path="/Message" element={<Message/>} />
      <Route exact path="/SendMessage" element={<SendMessage/>} />
      <Route exact path="/SendReply" element={<SendReply/>} />
      <Route exact path="/Search" element={<Search/>} />
      <Route exact path="/Calender" element={<Calender/>} />
      <Route exact path="/JobDetails" element={<JobDetails/>} />
      <Route exact path="/JobResponse" element={<JobResponse/>} />
      <Route exact path="/EditJobDetails" element={<EditJobDetails/>} />
      <Route exact path="/Profile" element={<Profile/>} />
      <Route exact path="/EditProfile" element={<EditProfile/>} />
      <Route path="/schedule_meets/*" element={<Meeting/>} />
      <Route exact path="/Settings" element={<Settings/>} />
      <Route exact path="/ProfileShearedByAdmin" element={<ProfileSharedByAdmin/>} />
      <Route exact path="/Survey" element={<Survey/>} />
      <Route exact path="/ProfileShearedByAdminDetails" element={<ProfileSharedByAdminDetails/>} />
      <Route exact path="/AddNewPosition" element={<AddNewPosition/>} />
      <Route exact path="/HelpFaq" element={<Help/>} />
      <Route exact path="/VerifySignup" element={<VerifyOtp/>} />
      <Route exact path="/CreateCompanyProfile" element={<CreateCompanyProfile/>} />
      <Route exact path="/Colleges" element={<Colleges/>} />

     

    </Routes>
    </Router>
  );
}

export default App;
