import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import GridContainer from "../../components/GridContainer";
import Modal from "../../components/Modal";
import AddFlashCard from "../../features/flashcards/components/AddFlashCard";
import { getOneFlashcardsDeck } from "../../features/flashcards/services/getOneFlashcardsDeck";
import SidebarLayout from "../../layouts/SidebarLayout";
import { getFormattedDate } from "../../utils/getFormattedDate";

const FlashCardsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [decks, setDecks] = useState([]);

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
      <button
        onClick={() => setShowModal(true)}
        className="save-btn mb-xl mt-xl"
      >
        Create new
      </button>
      <GridContainer>
        {decks.map((data) => (
          <Card
            date={data.date}
            title={data.question}
            pills={data.pills}
            key={Math.random()}
          ></Card>
        ))}
      </GridContainer>

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
