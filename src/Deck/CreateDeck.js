import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api";
import Breadcrumb from "../Common/Breadcrumb";

/**
 * Defines the initial state for a new deck form.
 */
const initialFormState = {
  name: "",
  description: "",
};


function CreateDeck() {
  const [formData, setFormData] = useState({ ...initialFormState });
  const navigate = useNavigate();

  // Handler for all form field changes
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the API function to save the new deck
      const newDeck = await createDeck(formData);
      
      // Navigate to the Deck View screen for the newly created deck
      navigate(`/decks/${newDeck.id}`);
      
    } catch (error) {
      console.error("Failed to create deck:", error);
    }
  };

  // Handler for the Cancel button
  const handleCancel = () => {
    // Navigate back to the Home screen
    navigate("/");
  };

  return (
    <div>
      {/* Breadcrumb for navigation */}
      <Breadcrumb paths={[]} current="Create Deck" />

      <h2>Create Deck</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
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
            rows="4"
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

export default CreateDeck;
