import React from "react";
import { Link } from "react-router-dom";


function CardForm({ formData, handleChange, handleSubmit, deckId, isNew }) {

  const submitButtonText = isNew ? "Save" : "Submit";
  const cancelButtonText = isNew ? "Done" : "Cancel";


  const cancelPath = `/decks/${deckId}`;
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          rows="3"
          required
          placeholder="Front side of card"
          onChange={handleChange}
          value={formData.front}
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          rows="3"
          required
          placeholder="Back side of card"
          onChange={handleChange}
          value={formData.back}
        />
      </div>
      
      <div className="d-flex justify-content-start">
        {/* Cancel/Done button */}
        <Link to={cancelPath} className="btn btn-secondary mr-2">
          {cancelButtonText}
        </Link>
        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
          {submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default CardForm;
