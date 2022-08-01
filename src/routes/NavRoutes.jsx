import { Routes, Route } from "react-router-dom";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import BehavioralQuestion from "../pages/behavioral/BehavioralQuestion";
import BehavioralQuestionCreate from "../pages/behavioral/BehavioralQuestionCreate";
import BehavioralQuestionList from "../pages/behavioral/BehavioralQuestionList";
import Dashboard from "../pages/dashboard/Dashboard";
import FlashCardDecksList from "../pages/flashcards/FlashCardDecksList";
import FlashCardsList from "../pages/flashcards/FlashCardsList";
import Landing from "../pages/landing/Landing";
import Project from "../pages/project/Project";
import ProjectList from "../pages/project/ProjectList";
import TechnicalQuestion from "../pages/technical/TechnicalQuestion";
import TechnicalQuestionsList from "../pages/technical/TechnicalQuestionsList";
import CompanyList from "../pages/company/CompanyList";
import Company from "../pages/company/Company";
import { ProtectedRoutes } from "./ProtectedRoutes";

const NavRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Landing />}></Route>
  
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route
          path="/behavioralquestions/all"
          element={<BehavioralQuestionList></BehavioralQuestionList>}
        ></Route>
        <Route
          path="/behavioral/:id"
          element={<BehavioralQuestion></BehavioralQuestion>}
        ></Route>
        <Route
          path="/behavioralcreate/:id"
          element={<BehavioralQuestionCreate></BehavioralQuestionCreate>}
        ></Route>
        <Route path="/projects" element={<ProjectList></ProjectList>}></Route>
        <Route path="/project/:id" element={<Project></Project>}></Route>
        <Route
          path="/technicalquestions"
          element={<TechnicalQuestionsList></TechnicalQuestionsList>}
        ></Route>
        <Route
          path="/technicalquestion/:id"
          element={<TechnicalQuestion></TechnicalQuestion>}
        ></Route>
        <Route
          path="/flashcarddecks"
          element={<FlashCardDecksList></FlashCardDecksList>}
        ></Route>
        <Route
          path="/flashcards/:id"
          element={<FlashCardsList></FlashCardsList>}
        ></Route>
        <Route path="/dreamCompanies" element={<CompanyList />}></Route>
        <Route path="/dreamCompany/:id" element={<Company />}></Route>
      </Route>
    </Routes>
  );
};

export default NavRoutes;
