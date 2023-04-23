import React, { useEffect, useState } from "react";
import { Button, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/userSlice";
import { trainerLogout } from "../../redux/trainerSlice";
import { motion } from 'framer-motion'
import Modal from "./Modal";
import "./Header.css";

function NavBar() {

  const [logoutModalShow, setlogoutModalShow] = useState(false);
  const [loged, setLoged] = useState("");
  const [buttonHide, setButtonHide] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const User = useSelector((state) => state.userReducer.user);
  const Trainer = useSelector((state) => state.trainerReducer.trainer);

  function showProfile(Id) {
    console.log(Id, "show profile");
    navigate("/trainer/profile");
    if (Trainer?.trainer) {
      navigate("/trainer/profile", { state: { trainerId: Id } });
      console.log("trainer profile");
    } else if (User.user) {
      navigate("/client/profile", { state: { userId: Id } });
      console.log("user profile");
      setLoged(User.user);
    }
  }

  useEffect(() => {
    logedPerson();
  }, [loged,buttonHide]);

  useEffect(() => {
    const handleResize = () => {
      console.log(' screen resize working...')
      if (window.innerWidth > 759) {
        setButtonHide(true);
      } else {
        setButtonHide(false);
      }
    };
    window.addEventListener("scroll", handleResize);
    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  });

  function logedPerson() {
    if (Trainer?.trainer) {
      console.log(Trainer, "in the use effect trainer");
      setLoged(Trainer.trainer);
    } else if (User.user) {
      console.log(User, "in the use effect user");
      setLoged(User.user);
    } else {
      setLoged("");
    }
  }

  function logout() {
    setlogoutModalShow(true);
  }

  function LogoutConfirmed(status) {
    if (status) {
      if (Trainer?.trainer) {
        console.log("trainer logout ");
        dispatch(trainerLogout());
        setLoged("");
        navigate("/login");
      } else if (User.user) {
        console.log("user logout ");
        dispatch(userLogout());
        setLoged("");
        navigate("/login");
      }
    }
  }

  function navGate(url){
    console.log(url,'nav calling.....')
    navigate(url)
  }

  return (
    <Navbar className="navbar p-10">
      {logoutModalShow ? (
        <Modal
          LogoutConfirmed={LogoutConfirmed}
          setlogoutModalShow={setlogoutModalShow}
        />
      ) : (
        ""
      )}
      <Link to="/">
        <Navbar.Brand href="">
          <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
        </Navbar.Brand>
      </Link>
      <div className="flex md:order-2 ">
        {loged && (
          <Button
            onClick={() => showProfile(loged._id)}
            className="bg-orange-500 font-mono hover:bg-orange-700 mr-1 md:mr-5 text-white uppercase"
          >
            {loged.fname}
          </Button>
        )}
        {buttonHide && (
          <div >
            {loged ? (
              <Button
                className="bg-orange-500 font-mono hover:bg-orange-700 mr-1 md:mr-5 text-white uppercase"
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button className="bg-orange-500 font-mono hover:bg-orange-700 md:mr-5 text-white uppercase">
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link onClick={() => navGate('/')} className="navbarlink hover:bg-orange-500 cursor-pointer">
          Home
        </Navbar.Link>
        <Navbar.Link onClick={() => navGate('/courses')} className="navbarlink cursor-pointer">
          Courses
        </Navbar.Link>
        <Navbar.Link onClick={() => navGate('/trainers')} className="navbarlink cursor-pointer">
          Trainers
        </Navbar.Link>
        <Navbar.Link onClick={() => navGate('/')} className="navbarlink cursor-pointer">
          About
        </Navbar.Link>
        <Navbar.Link onClick={() => navGate('/')} className="navbarlink cursor-pointer">
          Contact
        </Navbar.Link>
        {!buttonHide && (
          <div>
            {loged ? (
              <Button
                className="bg-orange-500 font-mono hover:bg-orange-700 mr-2 md:mr-5 text-white uppercase"
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button className="bg-orange-500 font-mono hover:bg-orange-700 mr-2 md:mr-5 text-white uppercase">
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
