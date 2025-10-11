import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api";
import Breadcrumb from "../Common/Breadcrumb";

function Study() {
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();
  const navigate = useNavigate();

  // State for card management
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Load Deck
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <h1>Error loading deck: {error.message}</h1>;
  }

  // Handle Loading State
  if (!deck) {
    return <p>Loading deck details...</p>;
  }

  const cards = deck.cards || [];
  const cardCount = cards.length;
  const currentCard = cards[cardIndex];

  // Logic for handling next button click
  const handleNext = () => {
    // If it's the last card, prompt for restart
    if (cardIndex === cardCount - 1) {
      const confirmed = window.confirm(
        "Restart cards?\n\nClick 'Cancel' to return to the home page."
      );
      if (confirmed) {
        setCardIndex(0);
        setIsFlipped(false);
      } else {
        navigate("/");
      }
    } else {
      // Move to the next card
      setCardIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
    }
  };

  // Logic for flipping the card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Content for less than 3 cards
  if (cardCount < 3) {
    return (
      <div className="study-deck-screen">
        <Breadcrumb deckName={deck.name} deckId={deckId} pageName="Study" />

        <h2>{deck.name}: Study</h2> 
        
        <div className="alert alert-warning">
          <h4>Not enough cards.</h4>
          <p>
            You need at least 3 cards to study. There are {cardCount} cards in
            this deck.
          </p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate(`/decks/${deckId}/cards/new`)}
          >
            <span className="oi oi-plus" /> Add Cards
          </button>
        </div>
      </div>
    );
  }

  // Content for studying cards (3 or more)
  return (
    <div className="study-deck-screen">
      <Breadcrumb deckName={deck.name} deckId={deckId} pageName="Study" />
      
      <h2>{deck.name}: Study</h2>
      
      <div className="card study-card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardIndex + 1} of {cardCount}
          </h5>
          <p className="card-text">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
          
          <button onClick={handleFlip} className="btn btn-secondary mr-2">
            <span className="oi oi-loop" /> Flip
          </button>
          
          {/* Show Next button only after the card is flipped */}
          {isFlipped && (
            <button onClick={handleNext} className="btn btn-primary">
              <span className="oi oi-arrow-right" /> Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;
