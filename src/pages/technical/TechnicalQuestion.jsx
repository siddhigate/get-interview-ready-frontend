import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Embed from "../../components/Embed/Embed";
import Loader from "../../components/Loader";
import MarkdownEditor from "../../components/MarkdownEditor";
import Modal from "../../components/Modal";
import TabContent from "../../components/Tab/TabContent";
import TabNavItem from "../../components/Tab/TabNavItem";
import AddSolutionUrl from "../../features/technical/components/AddSolutionUrl";
import { getOneTechnicalQuestion } from "../../features/technical/services/getOneTechnicalQuestion";
import { updateSolution } from "../../features/technical/services/updateSolution";
import SidebarLayout from "../../layouts/SidebarLayout";
import { showToast } from "../../utils/showToast";

const TechnicalQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);
  const [solutionURL, setSolutionURL] = useState({ type: null, url: null });
  const [showModal, setShowModal] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false)

  const getProject = async () => {
    setFetchLoading(true);
    try {
      const res = await getOneTechnicalQuestion(id);
      const { question, solution, solution_url, solution_type } = res.data?.project;
      console.log({ question, solution, solution_url, solution_type })
      setQuestion(question);
      if(solution){
        setSolution(solution);
      } else {
        setSolution("")
      }
      
      setSolutionURL({
        type: solution_type,
        url: solution_url,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  async function saveSolution() {
    setLoading(true);
    try {
      console.log(id, solution);
      const res = await updateSolution({ id, solution });
      console.log(res.data);
      setLoading(false);
      showToast(true, "Solution updated successfully!");
    } catch (err) {
      showToast(false, "Solution updation failed");

      setLoading(false);
    }
  }

  if(fetchLoading) {
    return <SidebarLayout><Loader></Loader></SidebarLayout>
  }

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
        <Link to="/technicalquestions">Technical-Questions</Link>/
        {question.replaceAll(" ", "-")}
      </p>
      <h1 style={{ marginBottom: "1rem" }}>{question}</h1>
      <ul className="tab-list list-style-none">
        <TabNavItem
          title="Embed"
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Solution"
          id="tab2"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>
      <TabContent id="tab1" activeTab={activeTab}>
        {!solutionURL.url && (
          <div className="embed-btn-container">
            <button
              onClick={() => {
                setSolutionURL((element) => ({
                  ...element,
                  type: "codesandbox",
                }));
                setShowModal(true);
              }}
            >
              <img src="/assets/codesandbox.svg"></img>
              <p>Embed Codesandbox</p>
            </button>
            <button
              onClick={() => {
                setSolutionURL((element) => ({
                  ...element,
                  type: "codepen",
                }));
                setShowModal(true);
              }}
            >
              <img src="/assets/codepen.svg"></img>
              <p>Embed Codepen</p>
            </button>
            <button
              onClick={() => {
                setSolutionURL((element) => ({
                  ...element,
                  type: "gist",
                }));
                setShowModal(true);
              }}
            >
              <img src="/assets/gist.svg"></img>
              <p>Embed GitHub Gist</p>
            </button>
            <button
              onClick={() => {
                setSolutionURL((element) => ({
                  ...element,
                  type: "repl",
                }));
                setShowModal(true);
              }}
            >
              <img src="/assets/replit.svg"></img>
              <p> Embed Repl</p>
            </button>
          </div>
        )}

        {solutionURL.url && <div><Embed url={solutionURL.url}></Embed></div>}
      </TabContent>
      <TabContent id="tab2" activeTab={activeTab}>
        <button
          onClick={saveSolution}
          className="save-btn mb-xl"
          disabled={loading}
        >
          {loading && "Saving"}
          {!loading && "Save"}
        </button>
        <MarkdownEditor
          height="60vh"
          defaultValue={solution}
          value={solution}
          onChange={({ text }) => setSolution(text)}
        ></MarkdownEditor>
      </TabContent>

      {showModal && (
        <Modal
          title={`Embed ${solutionURL.type}`}
          closeModal={() => setShowModal(false)}
        >
          <AddSolutionUrl
            id={id}
            type={solutionURL.type}
            setSolutionURL={setSolutionURL}
            closeModal={() => setShowModal(false)}
          ></AddSolutionUrl>
        </Modal>
      )}
    </SidebarLayout>
  );
};

export default TechnicalQuestion;
