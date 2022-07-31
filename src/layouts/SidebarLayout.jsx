import { Link } from "react-router-dom";
import LogoutButton from "../features/authentication/components/LogoutButton";

const SidebarLayout = ({ title, children }) => {
  return (
    <div className="body-container">
      <aside className="sidebar">
        <div className="sidebar-links">
          <ul className="list-style-none">
            <Link to="/">
              <li>
                <img src="../assets/homeicon.png" alt=""></img>
                <span className="d-block">Dashboard</span>
              </li>
            </Link>
            <Link to="/behavioralquestions/all">
              <li>
                <img src="../assets/behavior.png" alt=""></img>
                <span className="d-block">Behavioral Questions</span>
              </li>
            </Link>
            <Link to="/technicalquestions">
              <li>
                <img src="../assets/technical.png" alt=""></img>
                <span className="d-block">Technical Questions</span>
              </li>
            </Link>
            <Link to="/projects">
              <li>
                <img src="../assets/project.png" alt=""></img>
                <span className="d-block">Project Questions</span>
              </li>
            </Link>
            <Link to="/flashcarddecks">
              <li>
                <img src="../assets/flashcard.png" alt=""></img>
                <span className="d-block">Flash cards</span>
              </li>
            </Link>
            <Link to='/dreamCompanies'>
              <li>
                <img src="../assets/dreamcompany.png" alt=""></img>
                <span className="d-block">Dream companies</span>
              </li>
            </Link>

            <LogoutButton />
          </ul>
        </div>
      </aside>
      <main className="main-wrapper" style={{position: "relative"}}>
        <div className="main-wrapper-content">
          {title && <h1>{title}</h1>}

          <div className="content">{children}</div>
        </div>
        
      <footer
        style={{
          width: "100%",
          textAlign: "center",
          boxShadow: "var(--bs-gray)",
          borderTop: "1px solid #F1F5F9",
          background: "white"
        }}
        className="landing-footer"
      >
        <div className="flex flex-center">
          <img src="./assets/hashnode.png" alt="" />
          <div className="m-md">X</div>
          <img src="./assets/planetscale.jpg" alt="" />
        </div>
      </footer>
      </main>
    </div>
  );
};

export default SidebarLayout;
