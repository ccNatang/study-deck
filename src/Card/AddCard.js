import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import Breadcrumb from "../Common/Breadcrumb";
import CardForm from "./CardForm";

/**
 * Defines the initial state for a new card.
 */
const initialFormState = {
  front: "",
  back: "",
};

/**
 * Renders the screen to add a new card to a specific deck.
 */
function AddCard() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(undefined);

  // Load the deck for context and breadcrumb
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  // Handle input changes
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // API call to create the card
      await createCard(deckId, formData);
      
      // Reset form to add another card, as requested in project
      setFormData(initialFormState); 
      
      
    } catch (err) {
      setError(err);
    }
  };

  // Handle Cancel/Done button click
  const handleDone = () => {
    navigate(`/decks/${deckId}`);
  };

  // Handle Loading and Error States
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }
  if (!deck) {
    return <p>Loading deck...</p>;
  }

  // Render the Add Card Form
  return (
    <div className="add-card-screen">
      <Breadcrumb 
        deckName={deck.name} 
        deckId={deckId} 
        pageName="Add Card" 
      />

      <h2>{deck.name}: Add Card</h2>
      
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleDone}
        isNew={true}
        deckId={deckId}
      />
    </div>
  );
}

export default AddCard;
