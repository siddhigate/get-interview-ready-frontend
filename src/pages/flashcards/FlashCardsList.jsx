import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import GridContainer from "../../components/GridContainer";
import Modal from "../../components/Modal";
import AddFlashCard from "../../features/flashcards/components/AddFlashCard";
import { getOneFlashcardsDeck } from "../../features/flashcards/services/getOneFlashcardsDeck";
import SidebarLayout from "../../layouts/SidebarLayout";
import { getFormattedDate } from "../../utils/getFormattedDate";

import TabContent from "../../components/Tab/TabContent";
import TabNavItem from "../../components/Tab/TabNavItem";
import FlashCard from "../../features/flashcards/components/FlashCard";
import FlashCardsTest from "../../features/flashcards/components/FlashCardsTest";
import Loader from "../../components/Loader";

const FlashCardsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [decks, setDecks] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  async function getCards() {
    setLoading(true);
    try {
      const res = await getOneFlashcardsDeck(id);
      setName(res.data.deckName);
      const deckCards = res.data.flashCards.map((deck) => ({
        ...deck,
        pills: [],
        date: getFormattedDate(deck.updated_at),
      }));
      setDecks(deckCards);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getCards();
  }, []);

  return (
    <SidebarLayout>
      <h1>Flash Cards: {name}</h1>

      {loading && <Loader></Loader>}
      <button onClick={() => setShowModal(true)} className="save-btn mt-xl">
        Create new
      </button>

      {decks.length === 0 && (
        <div className="flex-center flex-col">
          <img src="/assets/empty.svg" alt="empty" />
          <p style={{ margin: "1rem", fontSize: "1.25rem" }}>
            No flash cards! Create new.
          </p>
        </div>
      )}
      {decks.length > 0 && (
        <>
          <ul className="tab-list list-style-none">
            <TabNavItem
              title="Cards"
              id="tab1"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabNavItem
              title="Test"
              id="tab2"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </ul>
          <TabContent id="tab1" activeTab={activeTab}>
            <GridContainer>
              {decks.map((data) => (
                <FlashCard
                  key={Math.random()}
                  data={data.date}
                  question={data.question}
                  answer={data.answer}
                ></FlashCard>
              ))}
            </GridContainer>
          </TabContent>
          <TabContent id="tab2" activeTab={activeTab}>
            <FlashCardsTest cards={decks} id={id} name={name}></FlashCardsTest>
          </TabContent>
        </>
      )}

      {showModal && (
        <Modal title="Add Flash card" closeModal={() => setShowModal(false)}>
          <AddFlashCard
            id={id}
            closeModal={() => setShowModal(false)}
          ></AddFlashCard>
        </Modal>
      )}
    </SidebarLayout>
  );
};

export default FlashCardsList;
