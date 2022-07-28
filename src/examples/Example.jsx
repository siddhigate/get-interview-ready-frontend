import GridContainer from "../components/GridContainer";
import TabNavItem from "../components/Tab/TabNavItem";
import TabContent from "../components/Tab/TabContent";
import SidebarLayout from "../layouts/SidebarLayout";
import { useState } from "react";
import Card from "../components/Card/Card";

import MarkdownEditor from "../components/MarkdownEditor";
import Modal from "../components/Modal";

const dummyCards = [
  {
    date: "Twitter",
    title: "Siddhi Gate",
    pills: [{ text: "Concated", color: "green" }],
  },
  {
    date: "Twitter",
    title: "Siddhi Gate",
    pills: [{ text: "Concated", color: "green" }],
  },
  {
    date: "Twitter",
    title: "Siddhi Gate",
    pills: [{ text: "Concated", color: "green" }],
  },
  {
    date: "Twitter",
    title: "Siddhi Gate",
    pills: [{ text: "Concated", color: "green" }],
  },
];

const dummyMD = `## Why do you want to join this company?
I want to join this company because ........

---

## What does this company do?
This company solves the problem of .....

---

## How will this company help you to achieve your goals
Your answer will go here`;

function Example() {
  const [activeTab, setActiveTab] = useState("tab1");

  const [showModal, setShowModal] = useState(true);

  return (
    <SidebarLayout title="Headout">
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
          title="Referrers"
          id="tab3"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>
      <TabContent id="tab1" activeTab={activeTab}>
        <MarkdownEditor height="500px" defaultValue={dummyMD} onChange={({html, text}) => console.log(text)}></MarkdownEditor>
      </TabContent>
      <TabContent id="tab2" activeTab={activeTab}>
        <div className="referral-msg-container">
            <textarea className="textarea" placeholder="Enter your referral message here"></textarea>
            <div className="tips-container">Tips</div>
        </div>
        <button className="floating-tips-btn"><img src="./assets/bulb.png"></img>
        </button>
      </TabContent>
      <TabContent id="tab3" activeTab={activeTab}>
        <GridContainer>
          {dummyCards.map((data) => (
            <Card key={Math.random()} date={data.date} title={data.title} pills={data.pills}></Card>
          ))}
        </GridContainer>
      </TabContent>
      {showModal && <Modal title={"Hello World"} closeModal={() => setShowModal(false)}> Hellow</Modal>}
    </SidebarLayout>
  );
}

export default Example;
