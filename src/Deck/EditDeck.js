import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Breadcrumb from "../Common/Breadcrumb";
import DeckForm from "./DeckForm.js"; 

/**
 * Renders the Edit Deck screen, allowing the user to modify an existing deck's name and description.
 */
function EditDeck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);

  // Effect to load the specified deck and pre-fill the form
  useEffect(() => {
    const abortController = new AbortController();
    setError(undefined);

    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);
        // Initialize form data with the loaded deck details
        setFormData({ name: loadedDeck.name, description: loadedDeck.description });
      } catch (err) {
        setError(err);
      }
    }
    
    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    
    // Combine loaded deck properties with updated form data
    const updatedDeck = {
        ...deck,
        name: formData.name,
        description: formData.description,
    };
    
    try {
      await updateDeck(updatedDeck, abortController.signal);
      // Navigate to the Deck View screen after successful update
      navigate(`/decks/${deck.id}`);
    } catch (err) {
      setError(err);
    }
  };

  // Handler for cancel/done button
  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  // Handler for input change
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  if (error) {
    return <h1>Error loading deck: {error.message}</h1>;
  }

  if (!deck || !formData.name) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Breadcrumb: Home / Deck Name / Edit */}
      <Breadcrumb 
        paths={[{ name: deck.name, link: `/decks/${deck.id}` }]} 
        current="Edit Deck" 
      />

      <h2>Edit Deck: {deck.name}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            placeholder="Deck Name"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            placeholder="Brief description of the deck"
            rows="5"
            onChange={handleChange}
            value={formData.description}
            required
          />
        </div>
        <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
