import React from "react";
import { Link } from "react-router-dom";


function DeckListItem({ deck, handleDelete }) {

  const cardCount = deck.cards ? deck.cards.length : 0;
  
  return (
    <div className="card w-100 mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between">
            {/* Display Deck Name */}
            <h5 className="card-title">{deck.name}</h5>
            {/* Display Card Count */}
            <p className="text-muted">{cardCount} cards</p>
        </div>
        {/* Display Deck Description */}
        <p className="card-text">{deck.description}</p>
        
        <div className="d-flex justify-content-between">
            <div className="btn-group">
                {/* View Deck: /decks/:deckId */}
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                    <span className="oi oi-eye" /> View
                </Link>
                {/* Study Deck: /decks/:deckId/study */}
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                    <span className="oi oi-book" /> Study
                </Link>
            </div>
            <button 
                className="btn btn-danger" 
                onClick={() => handleDelete(deck.id)}
            >
                <span className="oi oi-trash" /> Delete
            </button>
        </div>
      </div>
    </div>
  );
}

export default DeckListItem;
