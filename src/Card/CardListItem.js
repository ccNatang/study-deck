import React from "react";
import { Link } from "react-router-dom";


function CardListItem({ card, deckId, handleDeleteCard }) {
  
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          {/* Card Front Side */}
          <div className="col-md-6">
            <p className="font-weight-bold">Front</p>
            <p>{card.front}</p>
          </div>
          
          {/* Card Back Side */}
          <div className="col-md-6">
            <p className="font-weight-bold">Back</p>
            <p>{card.back}</p>
            
            <div className="d-flex justify-content-end">
              {/* Edit Card Button */}
              <Link 
                to={`/decks/${deckId}/cards/${card.id}/edit`} 
                className="btn btn-secondary mr-2"
              >
                <span className="oi oi-pencil" /> Edit
              </Link>
              
              {/* Delete Card Button */}
              <button 
                className="btn btn-danger" 
                onClick={() => handleDeleteCard(card.id)}
              >
                <span className="oi oi-trash" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardListItem;
