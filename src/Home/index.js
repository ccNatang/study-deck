import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";
import DeckListItem from "./DeckListItem"; 
import Breadcrumb from "../Common/Breadcrumb"; 

/**
 * Renders the Home screen, displaying a list of all decks and a "Create Deck" button.
 */
function Home() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  // Load Decks on component mount
  useEffect(() => {
    const abortController = new AbortController();
    
    listDecks(abortController.signal)
      .then(setDecks)
      .catch(setError);

    return () => abortController.abort();
  }, []);

  // Handler for deleting a deck
  const handleDelete = async (deckId) => {
    const confirmed = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );

    if (confirmed) {
      try {
        await deleteDeck(deckId);
        // Reload the list of decks after successful deletion by filtering the state
        setDecks((currentDecks) =>
          currentDecks.filter((deck) => deck.id !== deckId)
        );
      } catch (err) {
        setError(err);
      }
    }
  };

  // Error handling display
  if (error) {
    return <h1>Error loading decks: {error.message}</h1>;
  }
  
  // Map over the decks to render the list
  const list = decks.map((deck) => (
    <DeckListItem 
        key={deck.id} 
        deck={deck} 
        handleDelete={handleDelete} 
    />
  ));
  
  return (
    <div className="home-screen">
      <Breadcrumb pageName="Home" /> 
      
      {/* Create Deck button */}
      <Link to="/decks/new" className="btn btn-secondary mb-2">
        <span className="oi oi-plus" /> Create Deck
      </Link>
      <div className="card-deck">
        {/* Render the list of decks */}
        {list.length > 0 ? list : <p>No decks found. Please create one.</p>}
      </div>
    </div>
  );
}

export default Home;
