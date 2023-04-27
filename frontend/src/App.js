import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import io from 'socket.io-client'

import Home from "./pages/home/home";
import ClientLogin from "./pages/login/login";
import ClientRegister from "./pages/client/signup/Register";
import TrainerRegister from "./pages/trainer/signup/Register";
import AdminLogin from "./pages/admin/login/login";
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

const socket = io.connect('http://localhost:3001')

function App() {
  const UserDetails = useSelector((state) => state.userReducer.user);
  const TrainerDetails = useSelector((state) => state.trainerReducer.trainer);
  const AdminDetails = useSelector((state) => state.adminReducer.admin);
  
  const User = UserDetails?.token
  const Trainer = TrainerDetails?.token
  const Admin = AdminDetails?.token

  console.log(User, "user from the app ");
  console.log(Trainer, "trainer from the app ");
  console.log(Admin, "admin from the app ");

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/clientregister" element={<ClientRegister />} />
        <Route path="/client/profile" element={ User ? <ClienProfile /> : <ClientLogin />} />
        <Route path="/client/chat" element={ User ? <ClientChat /> : <ClientLogin />} />

        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/details" element={<CourseDetail />} />
        <Route path="/trainers" element={<TrainersList />} />
        <Route path="/trainer/details" element={<TrainersDetails />} />
        <Route path="/enroll" element={ User ? <RegisterCourse /> : <ClientLogin /> } />

        <Route path="/verification/:id" element={<OtpVerfication />} />
        <Route path="/trainerregister" element={<TrainerRegister />} />
        <Route path="/trainersignupsuccess" element={ Trainer ? <Success /> : <ClientLogin /> } />
        <Route path="/trainer/profile" element={ Trainer ? <Profile /> : <ClientLogin /> } />
        <Route path="/trainer/addcourse" element={ Trainer ? <AddCourses /> : <ClientLogin /> } />
        <Route path="/trainer/courses" element={ Trainer ? <TrainerCourses /> : <ClientLogin /> } />
        <Route path="/trainer/clients" element={ Trainer ? <TrainerClients /> : <ClientLogin /> } />
        <Route path="/trainer/client/details" element={ Trainer ? <TrainerClientDetails /> : <ClientLogin /> } />
        <Route path="/trainer/chat" element={ Trainer ? <TrainerChat /> : <ClientLogin /> } />

        <Route path="/admin" element={ Admin ? <Dashboard />:<AdminLogin />} />
        <Route path="/admin/dashboard" element={ Admin ? <Dashboard /> : <AdminLogin /> } />
        <Route path="/admin/trainers" element={ Admin ? <Trainers /> : <AdminLogin /> } />
        <Route path="/admin/trainerdetails" element={ Admin ? <TrainerDetail /> :<AdminLogin /> } />
        <Route path="/admin/users" element={ Admin ? <Users /> : <AdminLogin /> } />
        <Route path="/admin/userdetails" element={ Admin ? <UserDetail /> : <AdminLogin /> } />
        <Route path="/admin/messages" element={ Admin ? <Message /> : <AdminLogin /> } />
        <Route path="/admin/notifications" element={ Admin ? <Notification /> :<AdminLogin /> } />
        <Route path="/admin/transactions" element={ Admin ? <Transaction />:<AdminLogin /> } />
        <Route path="/admin/courses" element={ Admin ? <Course />:<AdminLogin /> } />
        <Route path="/admin/chat" element={ Admin ? <AdminChat />:<AdminLogin /> } />
      </Routes>
    </div>
  );
}

export default App;
