import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import Breadcrumb from "../Common/Breadcrumb";
import CardListItem from "../Card/CardListItem";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();
  const navigate = useNavigate();

  // Effect to load the specified deck
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  // Handler for deleting the entire deck
  const handleDeleteDeck = async () => {
    const confirmed = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (confirmed) {
      try {
        await deleteDeck(deckId);
        navigate("/");
      } catch (err) {
        setError(err);
      }
    }
  };

  // Handler for deleting an individual card
  const handleDeleteCard = async (cardIdToDelete) => {
    const confirmed = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    if (confirmed) {
      try {
        await deleteCard(cardIdToDelete);
        
        // Update the local state to remove the card without reloading the entire deck
        setDeck((currentDeck) => ({
          ...currentDeck,
          cards: currentDeck.cards.filter((card) => card.id !== cardIdToDelete),
        }));
      } catch (err) {
        setError(err);
      }
    }
  };

  if (error) {
    return <h1>Error loading deck: {error.message}</h1>;
  }

  if (!deck) {
    return <p>Loading deck details...</p>;
  }

  const cards = deck.cards || [];

  const cardList = cards.map((card) => (
    <CardListItem 
      key={card.id} 
      card={card} 
      handleDeleteCard={handleDeleteCard} 
    />
  ));

  return (
    <div className="deck-view-screen">
      <Breadcrumb deckName={deck.name} deckId={deckId} pageName="Deck View" />

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>
          <div className="d-flex justify-content-between">
            <div className="btn-group">
              {/* Study Deck */}
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
                <span className="oi oi-book" /> Study
              </Link>
              {/* Edit Deck */}
              <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mr-2">
                <span className="oi oi-edit" /> Edit
              </Link>
              {/* Add Card */}
              <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-secondary">
                <span className="oi oi-plus" /> Add Cards
              </Link>
            </div>
            {/* Delete Deck */}
            <button className="btn btn-danger" onClick={handleDeleteDeck}>
              <span className="oi oi-trash" /> Delete
            </button>
          </div>
        </div>
      </div>

      <div className="card-list mt-4">
        <h2>Cards</h2>
        {cards.length === 0 ? (
          <p>No cards in this deck.</p>
        ) : (
          cardList
        )}
      </div>
    </div>
  );
}

export default Deck;
