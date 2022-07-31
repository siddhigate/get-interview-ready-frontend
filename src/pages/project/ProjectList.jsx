import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import GridContainer from "../../components/GridContainer";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import AddProject from "../../features/project/components/AddProject";
import { getAllProjects } from "../../features/project/services/getAllProjects";
import SidebarLayout from "../../layouts/SidebarLayout";
import { getFormattedDate } from "../../utils/getFormattedDate";

const ProjectList = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await getAllProjects();
      const projectCards = res.data.projects.map((project) => ({
        ...project,
        pills: project.tech_stack.split(",").map((pill, index) => ({
          text: pill,
          color:
            index % 3 === 0 ? "blue" : index % 2 === 0 ? "yellow" : "green",
        })),
        date: getFormattedDate(project.updated_at),
      }));

      setProjects(projectCards);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <SidebarLayout title="Projects">
       <Loader></Loader>
    </SidebarLayout>
  }

  return (
    <SidebarLayout title="Projects">
      <button onClick={() => setShowModal(true)} className="save-btn mb-xl">
        Create new
      </button>

      {projects.length === 0 && (
        <div className="flex-center flex-col">
          <img src="./assets/empty.svg" alt="empty" />
          <p style={{ margin: "1rem", fontSize: "1.25rem" }}>
            No projects! Create new projects.
          </p>
        </div>
      )}
      <GridContainer>
        {projects.map((data) => (
          <Link
            to={`/project/${data.id}`}
            key={Math.random()}
            className="card-link"
          >
            <Card
              date={data.date}
              desc={data.tagline}
              title={data.name}
              pills={data.pills}
            ></Card>
          </Link>
        ))}
      </GridContainer>
      {showModal && (
        <Modal title="Add Project" closeModal={() => setShowModal(false)}>
          <AddProject></AddProject>
        </Modal>
      )}
    </SidebarLayout>
  );
};

export default ProjectList;
