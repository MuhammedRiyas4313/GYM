import React, { useEffect, useState } from "react";
import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/userSlice";
import { trainerLogout } from "../../redux/trainerSlice";
import Modal from "./Modal";
import "./Header.css";

function NavBar() {
  
  const [logoutModalShow, setlogoutModalShow] = useState(false);
  const [loged, setLoged] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(Trainer.trainer, "in the use effect trainer 22222222222");
    if (Trainer.trainer) {
      console.log(Trainer.trainer, "in the use effect trainer");
      setLoged(Trainer.trainer);
    } else if (User) {
      setLoged(User.user);
    } else {
      setLoged("");
    }
  });

  const User = useSelector((state) => state.userReducer.user);
  const Trainer = useSelector((state) => state.trainerReducer.trainer);
  console.log(Trainer?.trainer, "trainer", Trainer?.token, "trainer token....");
  console.log(User?.user, "User", User?.token, "user token....");
  console.log(loged, "loged in ;;;;;;;;");

  function logout() {
    setlogoutModalShow(true);
  }

  function LogoutConfirmed(status) {
    if (status) {
      if (Trainer.trainer) {
        console.log("user logout ");
        dispatch(trainerLogout());
      } else if (User) {
        console.log("user logout ");
        dispatch(userLogout());
      }
    }
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
          <Link to="">
            <Button className="bg-orange-500 hover:bg-orange-700 mr-5 text-white uppercase">
              {loged.fname}
            </Button>
          </Link>
        )}
        {loged ? (
          <Button
            className="bg-orange-500 hover:bg-orange-700 mr-5 text-white uppercase"
            onClick={logout}
          >
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button className="bg-orange-500 hover:bg-orange-700 mr-5 text-white uppercase">
              Login
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/">
          <Navbar.Link href="/" className="navbarlink hover:bg-orange-500">
            Home
          </Navbar.Link>
        </Link>
        <Navbar.Link href="/" className="navbarlink">
          Courses
        </Navbar.Link>
        <Navbar.Link href="/" className="navbarlink">
          Trainers
        </Navbar.Link>
        <Navbar.Link href="/" className="navbarlink">
          About
        </Navbar.Link>
        <Navbar.Link href="/" className="navbarlink">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
