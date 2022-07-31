import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MarkdownEditor from "../../components/MarkdownEditor";
import Modal from "../../components/Modal";
import TabContent from "../../components/Tab/TabContent";
import TabNavItem from "../../components/Tab/TabNavItem";
import { getOneCompany } from "../../features/company/services/getOneCompany";
import { getAllReferrers } from "../../features/company/services/getAllReferrers";
import { updateInfo } from "../../features/company/services/updateInfo";
import { updateReferralMsg } from "../../features/company/services/updateReferralMsg";
import SidebarLayout from "../../layouts/SidebarLayout";
import { showToast } from "../../utils/showToast";
import GridContainer from "../../components/GridContainer";
import { getFormattedDate } from "../../utils/getFormattedDate";
import Card from "../../components/Card/Card";
import { createRefferer } from "../../features/company/services/createReferrer";
import { updateReferrer } from "../../features/company/services/updateReferrer";
import { COMPANY_QUESTIONS } from "../../features/company/data/companyQuestions";

const Company = () => {
  const { id } = useParams();
  const [companyName, setCompanyName] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");
  const [info, setInfo] = useState(COMPANY_QUESTIONS);
  const [referralMsg, setReferralMsg] = useState("");
  const [referrers, setReferrers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showReferrerModal, setShowReferrerModal] = useState(false);
  const [referrerModalName, setReferrerModalName] = useState("");
  const [referrerModalLink, setReferrerModalLink] = useState("");
  const [referrerModalId, setReferrerModalId] = useState("");
  const [referrerModalContacted, setReferrerModalContacted] = useState("");
  const [error, setError] = useState("");

  const getCompany = async () => {
    try {
      const res = await getOneCompany(id);
      const { name, md_text, referral_msg } = res.data?.dreamCompany;
      setCompanyName(name);
      md_text ? setInfo(md_text) : setInfo(COMPANY_QUESTIONS);
      referral_msg ? setReferralMsg(referral_msg) : setReferralMsg("");
    } catch (err) {
      console.log(err);
    }
  };

  async function fetchReferrers() {
    try {
      const res = await getAllReferrers(id);
      const referrerCards = res.data.referrers.map((referrer) => ({
        ...referrer,
        pills: [
          referrer.contacted === 2
            ? { text: "Contacted", color: "green" }
            : { text: "Not Contacted", color: "red" },
        ],
        date: getFormattedDate(referrer.updated_at),
      }));
      setReferrers(referrerCards);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCompany();
    fetchReferrers();
  }, []);

  async function saveInfo() {
    setLoading(true);
    try {
      await updateInfo({ id, info });
      setLoading(false);
      showToast(true, "Info updated successfully!");
    } catch (err) {
      console.error(err);
      showToast(false, "Info updation failed");
      setLoading(false);
    }
  }

  async function saveReferralMsg() {
    setLoading(true);
    try {
      await updateReferralMsg({ id, referralMsg });
      setLoading(false);
      showToast(true, "Referral message updated successfully!");
    } catch (err) {
      showToast(false, "Referral message updation failed");
      setLoading(false);
    }
  }

  async function addReferrer(referrer) {
    setLoading(true);
    try {
      const res = await createRefferer(referrer);

      if (res.data.success) {
        setShowModal(false);
      } else {
        setError("Something went wrong.");
      }

      setLoading(false);
      fetchReferrers();
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message?.length > 0) {
        setError(err.response.data.message);
      } else if (err.code === "ERR_NETWORK") {
        setError("Something went wrong, please check your network.");
      } else {
        setError("Something went wrong.");
      }
      setLoading(false);
    }
  }

  const updateContactedStatus = async (status) => {
    try {
      await updateReferrer({
        id: referrerModalId,
        isContacted: status ? 2 : 1,
      });
      fetchReferrers();
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let referrer = { company_id: id };
    for (const [key, value] of formData) {
      referrer[key] = value;
    }
    addReferrer(referrer);
  };

  const openReferrerModal = (referrer) => {
    setReferrerModalName(referrer.name);
    setReferrerModalLink(referrer.link);
    setReferrerModalId(referrer.id);
    referrer.contacted === 2
      ? setReferrerModalContacted(true)
      : setReferrerModalContacted(false);
    setShowReferrerModal(true);
  };

  return (
    <SidebarLayout>
      <p
        style={{
          color: "gray",
          fontSize: "0.9rem",
          marginBottom: "2rem",
          fontStyle: "italic",
          textTransform: "lowercase",
        }}
      >
        <Link to="/dreamCompanies">Dream-Companies</Link>/
        {companyName.replaceAll(" ", "-")}
      </p>
      <h1 style={{ marginBottom: "1rem" }}>{companyName}</h1>
      <ul className="tab-list list-style-none">
        <TabNavItem
          title="Info"
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Referral Message"
          id="tab2"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Referrals"
          id="tab3"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>

      <TabContent id="tab1" activeTab={activeTab}>
        <button
          onClick={saveInfo}
          className="save-btn mb-xl"
          disabled={loading}
        >
          {loading && "Saving"}
          {!loading && "Save"}
        </button>
        <MarkdownEditor
          view="both"
          height="60vh"
          defaultValue={info}
          value={info}
          onChange={({ text }) => setInfo(text)}
        ></MarkdownEditor>
      </TabContent>

      <TabContent id="tab2" activeTab={activeTab}>
        <button
          onClick={saveReferralMsg}
          className="save-btn mb-xl"
          disabled={loading}
        >
          {loading && "Saving"}
          {!loading && "Save"}
        </button>
        <MarkdownEditor
          height="60vh"
          defaultValue={referralMsg}
          value={referralMsg}
          onChange={({ text }) => setReferralMsg(text)}
        ></MarkdownEditor>
      </TabContent>

      <TabContent id="tab3" activeTab={activeTab}>
        <button
          onClick={() => setShowModal(true)}
          className="save-btn mb-xl"
          disabled={loading}
        >
          {loading && "Saving Referrer"}
          {!loading && "Add Referrer"}
        </button>
        <GridContainer>
          {referrers.map((data) => (
            <div onClick={() => openReferrerModal(data)} key={Math.random()}>
              <Card
                date={data.date}
                title={data.name}
                pills={data.pills}
              ></Card>
            </div>
          ))}
        </GridContainer>
      </TabContent>

      {showModal && (
        <Modal title={`Add Referrer`} closeModal={() => setShowModal(false)}>
          <form onSubmit={submitHandler} style={{ fontSize: "0.9rem" }}>
            <div className="form-control-wrapper mt-md">
              <label htmlFor="name" className="form-label">
                Enter referrer name
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Referrer name"
                name="name"
                onChange={() => setError("")}
                required
              />
            </div>
            <div className="form-control-wrapper mt-md">
              <label htmlFor="description" className="form-label">
                Enter referrer link (LinkedIn/Twitter/Instagram)
              </label>
              <input
                id="description"
                type="url"
                className="form-control"
                placeholder="Link"
                name="link"
                onChange={() => setError("")}
                required
              />
            </div>

            {error && (
              <p
                className="mt-md mb-md txt-red txt-center"
                style={{ fontSize: "0.9rem" }}
              >
                {error}
              </p>
            )}

            <div className="flex flex-center">
              <button
                className="save-btn width-100"
                style={{ width: "80%", marginTop: "1rem" }}
                disabled={loading}
              >
                Add Referrer
              </button>
            </div>
          </form>
        </Modal>
      )}
      {showReferrerModal && (
        <Modal
          title={referrerModalName}
          closeModal={() => setShowReferrerModal(false)}
        >
          <div>
            <label className="checkbox-container">
              Contacted?
              <input
                type="checkbox"
                className="form-control"
                onChange={(e) => updateContactedStatus(e.target.checked)}
                defaultChecked={referrerModalContacted}
              />
              <span className="checkbox-custom"></span>
            </label>
          </div>
          <a
            href={referrerModalLink}
            rel="noreferrer"
            target="_blank"
            className="btn save-btn d-block mt-md"
            style={{ width: "fit-content" }}
          >
            Go to referrer link
          </a>
        </Modal>
      )}
    </SidebarLayout>
  );
};

export default Company;
