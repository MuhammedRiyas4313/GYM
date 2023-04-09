
import Home from './pages/home/home'
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientLogin from './pages/login/login';
import ClientRegister from './pages/client/signup/Register'
import TrainerRegister from './pages/trainer/signup/Register';
import AdminLogin from './pages/admin/login/login';
import OtpVerfication from './pages/client/otpverification/OtpVerfication';

function App() {
  return (
    <div className="App">
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<ClientLogin />} />
          <Route path="/clientregister" element={<ClientRegister />} />
          <Route path="/verification" element={<OtpVerfication />} />
          <Route path="/trainerregister" element={<TrainerRegister />} />
          <Route path="/admin" element={<AdminLogin />} />

        </Routes>
    </div>
  );
}

export default App;
