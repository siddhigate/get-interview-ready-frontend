import { Routes, Route } from "react-router-dom";
import NavLayoutExample from "../examples/NavLayoutExample";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import { ProtectedRoutes } from "./ProtectedRoutes";

const NavRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

        <Route path="/" element={<ProtectedRoutes/>}>
            <Route path="/" element={<NavLayoutExample></NavLayoutExample>}></Route>
        </Route>
    </Routes>
  )
}

export default NavRoutes