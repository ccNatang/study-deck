import React from "react";
import { Link } from "react-router-dom";


function DeckForm({ formData, handleChange, handleSubmit, deckId, type }) {
  // Determine the cancel link based on whether we are creating or editing
  const cancelLink = type === "Create" ? "/" : `/decks/${deckId}`;
  
  return (
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
          rows="4"
          onChange={handleChange}
          value={formData.description}
          required
        />
      </div>
      <Link to={cancelLink} className="btn btn-secondary mr-2">
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default DeckForm;
