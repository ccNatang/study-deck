import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import Breadcrumb from "../Common/Breadcrumb";
import CardForm from "./CardForm";

/**
 * Renders the Edit Card screen, allowing the user to modify an existing card.
 */
function EditCard() {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();
  const initialFormState = { front: "", back: "" };
  
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    setError(undefined);

    async function loadDeckAndCard() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);

        const loadedCard = await readCard(cardId, abortController.signal);

        setFormData({ front: loadedCard.front, back: loadedCard.back });
      } catch (err) {
        setError(err);
      }
    }
    
    loadDeckAndCard();

    return () => abortController.abort();
  }, [deckId, cardId]);

  // Handler for input change
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    
    // Create the updated card object including the original ID and Deck ID
    const updatedCard = {
        ...formData,
        id: cardId, // Ensure card ID is included
        deckId: Number(deckId), // Ensure deck ID is included
    };
    
    try {
      await updateCard(updatedCard, abortController.signal);
      // Navigate to the Deck View screen after successful update
      navigate(`/decks/${deckId}`);
    } catch (err) {
      setError(err);
    }
  };

  // Handler for cancel button (returns to Deck View)
  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  if (error) {
    return <h1>Error loading content: {error.message}</h1>;
  }

  // Check for both deck context and form data availability
  if (!deck || !formData.front) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Breadcrumb 
        paths={[
          { name: deck.name, link: `/decks/${deck.id}` },
          { name: `Edit Card ${cardId}`, link: `/decks/${deck.id}/cards/${cardId}/edit` },
        ]} 
        current="Edit Card" 
      />

      <h2>Edit Card</h2>

      <CardForm 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        deckId={deckId}
        isNew={false} 
      />
    </div>
  );
}

export default EditCard;
