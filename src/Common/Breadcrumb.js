import React from "react";
import { Link } from "react-router-dom";


function Breadcrumb({ deckName, deckId, pageName }) {
  const crumbs = [];

  // 1. Home Link (Always present)
  crumbs.push(
    <li className="breadcrumb-item" key="home">
      <Link to="/">
        <span className="oi oi-home" /> Home
      </Link>
    </li>
  );

  // 2. Deck Link (If a deck is specified, and we're not on the main Deck View page)
  if (deckName && deckId && pageName !== "Deck View") {
    crumbs.push(
      <li className="breadcrumb-item" key="deck-link">
        <Link to={`/decks/${deckId}`}>{deckName}</Link>
      </li>
    );
  } else if (deckName) {
      // If we are on the Deck View page, the deck name itself is the active item
      crumbs.push(
        <li className="breadcrumb-item active" aria-current="page" key="deck-active">
          {deckName}
        </li>
      );
  }

  // 3. Current Page (If a pageName is specified)
  if (pageName && pageName !== "Home" && pageName !== "Deck View") {
    crumbs.push(
      <li className="breadcrumb-item active" aria-current="page" key="current-page">
        {pageName}
      </li>
    );
  }
  
  // Special case for Home page when pageName is "Home"
  if (pageName === "Home" && crumbs.length === 1) {
     crumbs.push(
      <li className="breadcrumb-item active" aria-current="page" key="current-page">
        Home
      </li>
    );
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {crumbs}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
