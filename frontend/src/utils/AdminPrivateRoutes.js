// import { Outlet, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// token


// const AdminPrivateRoutes = () => {

//     console.log(User.token,'from the admin private route')
//     return (
//        
//     )
// }

// export default AdminPrivateRoutes;

import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminPrivateRoutes() {
    const User = useSelector((state) => state.userReducer.user);
    console.log(User.token,'fromm the admin private route')
    const token = User.token
  return (
    <div>
      { token ? <Outlet /> : <Navigate to='/admin' /> }
    </div>
  )
}

export default AdminPrivateRoutes
