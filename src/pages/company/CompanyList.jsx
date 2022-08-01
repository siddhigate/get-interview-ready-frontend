import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import GridContainer from "../../components/GridContainer";
import Modal from "../../components/Modal";
import AddCompany from "../../features/company/components/AddCompany";
import { getAllCompanies } from "../../features/company/services/getAllCompanies";
import SidebarLayout from "../../layouts/SidebarLayout";
import { getFormattedDate } from "../../utils/getFormattedDate";

const CompanyList = () => {
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);

  async function fetchCompanies() {
    try {
      const res = await getAllCompanies();
      const companyCards = res.data.dreamCompanies.map((company) => ({
        ...company,
        // pills: company.tech_stack.split(",").map((pill, index) => ({
        //   text: pill,
        //   color:
        //     index % 3 === 0 ? "blue" : index % 2 === 0 ? "yellow" : "green",
        // })),
        pills: [],
        date: getFormattedDate(company.updated_at),
      }));

      setCompanies(companyCards);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <SidebarLayout title="Dream Companies">
      <button onClick={() => setShowModal(true)} className="save-btn mb-xl">
        Create new
      </button>
      {companies.length === 0 && (
        <div className="flex-center flex-col">
          <img src="/assets/empty.svg" alt="empty" />
          <p style={{ margin: "1rem", fontSize: "1.25rem" }}>
            No companies! Create new.
          </p>
        </div>
      )}
      <GridContainer>
        {companies.map((data) => (
          <Link
            to={`/dreamCompany/${data.id}`}
            key={Math.random()}
            className="card-link"
          >
            <Card
              date={data.date}
            //   desc={data.tagline}
              title={data.name}
              pills={data.pills}
            ></Card>
          </Link>
        ))}
      </GridContainer>
      {showModal && (
        <Modal title="Add Company" closeModal={() => setShowModal(false)}>
          <AddCompany />
        </Modal>
      )}
    </SidebarLayout>
  );
};

export default CompanyList;
