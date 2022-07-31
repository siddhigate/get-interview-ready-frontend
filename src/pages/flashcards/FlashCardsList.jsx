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

const FlashCardsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [decks, setDecks] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");

  const { id } = useParams();

  async function getCards() {
    try {
      const res = await getOneFlashcardsDeck(id);
      const deckCards = res.data.flashCards.map((deck) => ({
        ...deck,
        pills: [],
        date: getFormattedDate(deck.updated_at),
      }));

      setDecks(deckCards);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCards();
  }, []);

  return (
    <SidebarLayout>
      <h1>Flash Cards</h1>
      <button onClick={() => setShowModal(true)} className="save-btn mt-xl">
        Create new
      </button>

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
              data={data.date}
              question={data.question}
              answer={data.answer}
            ></FlashCard>
          ))}
        </GridContainer>
      </TabContent>
      <TabContent id="tab2" activeTab={activeTab}>
        <FlashCardsTest cards={decks}></FlashCardsTest>
      </TabContent>

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
