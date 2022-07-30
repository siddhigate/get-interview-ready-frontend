import { Routes, Route } from "react-router-dom";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import { ProtectedRoutes } from "./ProtectedRoutes";

const NavRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

        <Route path="/" element={<ProtectedRoutes/>}>
            <Route path="/" element={<Dashboard></Dashboard>}></Route>
        </Route>
    </Routes>
  )
}

export default NavRoutes