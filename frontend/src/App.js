import { Route, Routes ,Navigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// import io from 'socket.io-client'

import Home from "./pages/home/home";
import ClientLogin from "./pages/login/login";
import ClientRegister from "./pages/client/signup/Register";
import TrainerRegister from "./pages/trainer/signup/Register";
import AdminLogin from "./pages/admin/login/Login";
import OtpVerfication from "./pages/client/otpverification/OtpVerfication";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Trainers from "./pages/admin/trainers/Trainers";
import Users from "./pages/admin/users/Users";
import Message from "./pages/admin/message/AdminChat";
import Notification from "./pages/admin/notification/Notification";
import Transaction from "./pages/admin/transaction/Transaction";
import TrainerDetail from "./pages/admin/trainerDetails/TrainerDetails";
import Success from "./pages/trainer/signup/Success";
import UserDetail from "./pages/admin/userDetails/UserDetail";
import Profile from "./pages/trainer/Profile/Profile";
import Course from "./pages/admin/courses/Course";
import ClienProfile from "./pages/client/Profile/Profile";
import AddCourses from "./pages/trainer/AddCourse/AddCourses";
import CourseList from "./pages/courses/CourseList";
import CourseDetail from "./pages/courseDetails/CourseDetail";
import TrainersList from "./pages/trainers/TrainersList";
import TrainersDetails from "./pages/trainerDetails/TrainersDetails";
import RegisterCourse from "./pages/client/joinCourse/RegisterCourse";
import TrainerCourses from "./pages/trainer/Courses/TrainerCourses";
import TrainerClients from "./pages/trainer/Clients/ClientsList";
import TrainerClientDetails from "./pages/trainer/ClientDetails/ClientsDetail";
import TrainerChat from "./pages/trainer/Chating/TrainerChat";
import ClientChat from "./pages/client/Chat/ClientChat";
import AdminChat from "./pages/admin/message/AdminChat";
import About from "./pages/aboutUs/About";
import Wallets from "./pages/Wallet.js/Wallets";
import Transactions from "./pages/transactions/Transactions";
import ClientCourses from './pages/client/Course/Course'
import Contactus from "./pages/contactUs/Contactus";
import ClientAttendance from './pages/client/attendance/Attendanc'
import VideoCall from "./pages/videoCall/VideoCallPage";
import Error10 from "./pages/error404/Error";
import AdminError10 from "./pages/adminError/AdminError";

function App() {
  
  const UserDetails = useSelector((state) => state.userReducer.user);
  const TrainerDetails = useSelector((state) => state.trainerReducer.trainer);
  const AdminDetails = useSelector((state) => state.adminReducer.admin);
  
  const User = UserDetails?.token
  const Trainer = TrainerDetails?.token
  const Admin = AdminDetails?.token

  const adminState = JSON.parse(localStorage.getItem('adminReducer.admin.token'));
  const adminToken = adminState ? JSON.parse(adminState).admin.token : '';

  console.log(localStorage.getItem('trainerReducer'),'admin token....in app.js....')

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ User || Trainer ? <Navigate to="/" />:<ClientLogin />} />
        <Route path="/clientregister" element={<ClientRegister />} />
        <Route path="/client/profile" element={ User ? <ClienProfile /> :  <Navigate to="/login" /> } />
        <Route path="/client/chat" element={ User ? <ClientChat /> : <Navigate to="/login" />} />
        <Route path="/client/courses" element={ User ? <ClientCourses /> : <Navigate to="/login" />} />
        <Route path="/attendance/client" element={ User ? <ClientAttendance /> : <Navigate to="/login" />} />

        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/details" element={<CourseDetail />} />
        <Route path="/trainers" element={<TrainersList />} />
        <Route path="/trainer/details" element={<TrainersDetails />} />
        <Route path="/enroll" element={ User ? <RegisterCourse /> : <ClientLogin /> } />

        <Route path="/verification/:id" element={<OtpVerfication />} />
        <Route path="/trainerregister" element={<TrainerRegister />} />
        <Route path="/trainersignupsuccess" element={ Trainer ? <Success /> : <Navigate to="/login" /> } />
        <Route path="/trainer/profile" element={ Trainer ? <Profile /> : <Navigate to="/login" /> } />
        <Route path="/trainer/addcourse" element={ Trainer ? <AddCourses /> : <Navigate to="/login" /> } />
        <Route path="/trainer/courses" element={ Trainer ? <TrainerCourses /> : <Navigate to="/login" /> } />
        <Route path="/trainer/clients" element={ Trainer ? <TrainerClients /> : <Navigate to="/login" /> } />
        <Route path="/trainer/client/details" element={ Trainer ? <TrainerClientDetails /> : <Navigate to="/login" /> } />
        <Route path="/trainer/chat" element={ Trainer ? <TrainerChat /> : <Navigate to="/login" /> } />

        <Route path="/admin" element={ Admin ? <Navigate to="/admin/dashboard" />:<AdminLogin />} />
        <Route path="/admin/dashboard" element={ Admin ? <Dashboard /> : <Navigate to="/admin" /> } />
        <Route path="/admin/trainers" element={ Admin ? <Trainers /> : <Navigate to="/admin" /> } />
        <Route path="/admin/trainerdetails" element={ Admin ? <TrainerDetail /> :<Navigate to="/admin" /> } />
        <Route path="/admin/users" element={ Admin ? <Users /> : <Navigate to="/admin" /> } />
        <Route path="/admin/userdetails" element={ Admin ? <UserDetail /> : <Navigate to="/admin" /> } />
        <Route path="/admin/messages" element={ Admin ? <Message /> : <Navigate to="/admin" /> } />
        <Route path="/admin/notifications" element={ Admin ? <Notification /> :<Navigate to="/admin" /> } />
        <Route path="/admin/transactions" element={ Admin ? <Transaction />:<Navigate to="/admin" /> } />
        <Route path="/admin/courses" element={ Admin ? <Course />:<Navigate to="/admin" /> } />
        <Route path="/admin/chat" element={ Admin ? <AdminChat />:<Navigate to="/admin" /> } />

        <Route path="/admin*" element={ <AdminError10 /> } />

        <Route path="/videocall" element={ Trainer|| User ? <VideoCall />:<Navigate to="/login" /> } />
        <Route path="/wallet" element={<Wallets />} />
        <Route path="/transaction" element={<Transactions />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contactus" element={<Contactus />} />


        <Route path="*" element={<Error10 />} />

      </Routes>
    </div>
  );
}

export default App;
