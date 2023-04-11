
import Home from './pages/home/home'
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientLogin from './pages/login/login';
import ClientRegister from './pages/client/signup/Register'
import TrainerRegister from './pages/trainer/signup/Register';
import AdminLogin from './pages/admin/login/login';
import OtpVerfication from './pages/client/otpverification/OtpVerfication';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Trainers from './pages/admin/trainers/Trainers';
import Users from './pages/admin/users/Users';
import Message from './pages/admin/message/Message';
import Notification from './pages/admin/notification/Notification';
import Transaction from './pages/admin/transaction/Transaction';

function App() {
  return (
    <div className="App">
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<ClientLogin />} />
          <Route path="/clientregister" element={<ClientRegister />} />
          <Route path="/verification/:id" element={<OtpVerfication />} />
          <Route path="/trainerregister" element={<TrainerRegister />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/trainers" element={<Trainers />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/messages" element={<Message />} />
          <Route path="/admin/notifications" element={<Notification />} />
          <Route path="/admin/transactions" element={<Transaction />} />
        </Routes>
    </div>
  );
}

export default App;
