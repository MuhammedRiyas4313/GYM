
import Home from './pages/home/home'
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientLogin from './pages/client/login/login';
import ClientRegister from './pages/client/signup/Register'

function App() {
  return (
    <div className="App">
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<ClientLogin />} />
          <Route path="/clientregister" element={<ClientRegister />} />
        </Routes>
    </div>
  );
}

export default App;
