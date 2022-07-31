import SidebarLayout from "../../layouts/SidebarLayout";
import GridContainer from "../../components/GridContainer";
import TabNavItem from "../../components/Tab/TabNavItem";
import TabContent from "../../components/Tab/TabContent";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { BEHAVIORAL_QUESTIONS } from "../../features/behavioral/data/behavioralQuestions";
import { getAllBehavioralQuestions } from "../../features/behavioral/services/getAllBehavioralQuestions";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

const BehavioralQuestionList = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState({
    allQuestions: [],
    answeredQuestions: [],
    unansweredQuestions: [],
  });

  async function fetchBehavioralQuestions() {
    setLoading(true);
    try {
      const res = await getAllBehavioralQuestions();
      console.log(res.data);

      const answeredQuestions = res.data.behavioralQuestions.map((element) => ({
        ...element,
        date: "today",
        pills: [{ text: "Answered", color: "green" }],
        answered: true,
      }));

      const answeredIDs = answeredQuestions.map(
        (question) => question.questionId
      );

      console.log(answeredIDs);

      const unansweredQuestions = BEHAVIORAL_QUESTIONS.filter(
        (question) => !answeredIDs.includes(question.questionId)
      ).map((element) => ({
        ...element,
        date: "today",
        pills: [{ text: "Unanswered", color: "red" }],
        answered: false,
      }));

      setQuestions({
        allQuestions: answeredQuestions.concat(unansweredQuestions),
        answeredQuestions,
        unansweredQuestions,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBehavioralQuestions();
  }, []);

  return (
    <SidebarLayout title="Behavioral Questions">

      {
        loading && <Loader></Loader>
      }

      <Link to="/behavioralcreate/new" className="save-btn mb-xl">Create new</Link>
      <ul className="tab-list list-style-none">
        <TabNavItem
          title="All"
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Answered"
          id="tab2"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Unanswered"
          id="tab3"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>
      
      <TabContent id="tab1" activeTab={activeTab}>
        <GridContainer>
          {questions.allQuestions.map((data) =>
            data.answered ? (
              <Link to={`/behavioral/${data.id}`} className="card-link">
                <Card
                  key={Math.random()}
                  date={data.date}
                  title={data.question}
                  pills={data.pills}
                ></Card>
              </Link>
            ) : (
              <Link to={`/behavioralcreate/${data.questionId}`} className="card-link">
                <Card
                  key={Math.random()}
                  date={data.date}
                  title={data.question}
                  pills={data.pills}
                ></Card>
              </Link>
            )
          )}
        </GridContainer>
      </TabContent>
      <TabContent id="tab2" activeTab={activeTab}>
        <GridContainer>
          {questions.answeredQuestions.map((data) => (
            <Link to={`/behavioral/${data.id}`} className="card-link">
              <Card
                key={Math.random()}
                date={data.date}
                title={data.question}
                pills={data.pills}
              ></Card>
            </Link>
          ))}
        </GridContainer>
      </TabContent>
      <TabContent id="tab3" activeTab={activeTab}>
        <GridContainer>
          {questions.unansweredQuestions.map((data) => (
            <Link to={`/behavioralcreate/${data.questionId}`} className="card-link">
              <Card
                key={Math.random()}
                date={data.date}
                title={data.question}
                pills={data.pills}
              ></Card>
            </Link>
          ))}
        </GridContainer>
      </TabContent>
    </SidebarLayout>
  );
};

export default BehavioralQuestionList;
