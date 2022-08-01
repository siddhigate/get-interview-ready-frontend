import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import GridContainer from "../../components/GridContainer";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import AddFlashcardDeck from "../../features/flashcards/components/AddFlashcardDeck";
import { getAllFlashCardsDecks } from "../../features/flashcards/services/getAllFlashcardsDecks";

import SidebarLayout from "../../layouts/SidebarLayout";
import { getFormattedDate } from "../../utils/getFormattedDate";

const FlashCardDecksList = () => {
  const [showModal, setShowModal] = useState(false);
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getDecks() {
    setLoading(true);
    try {
      const res = await getAllFlashCardsDecks();
      const deckCards = res.data.decks.map((deck) => ({
        ...deck,
        pills: [
          {
            text: `${deck.cards_count} cards added`,
            color: deck.cards_count < 5 ? "red" : "green",
          },
        ],
        date: getFormattedDate(deck.updated_at),
      }));
      setDecks(deckCards);
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDecks();
  }, []);

  return (
    <SidebarLayout>
      <h1>Flash Card Decks</h1>
      {
        loading && <Loader></Loader>
      }
      <button onClick={() => setShowModal(true)} className="save-btn mb-xl mt-xl">
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
      <GridContainer>
        {decks.map((data) => (
          <Link
            to={`/flashcards/${data.id}`}
            key={Math.random()}
            className="card-link"
          >
            <Card date={data.date} title={data.name} pills={data.pills}></Card>
          </Link>
        ))}
      </GridContainer>

      {showModal && (
        <Modal title="Add Deck" closeModal={() => setShowModal(false)}>
          <AddFlashcardDeck></AddFlashcardDeck>
        </Modal>
      )}
    </SidebarLayout>
  );
};

export default FlashCardDecksList;
