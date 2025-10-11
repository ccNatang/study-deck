import React from "react";

import { Routes, Route } from "react-router-dom"; 
import Header from "./Header";
import NotFound from "./NotFound";

import Home from "../Home"; 
import CreateDeck from "../Deck/CreateDeck"; 
import Deck from "../Deck";
import Study from "../Deck/Study";
import EditDeck from "../Deck/EditDeck";
import AddCard from "../Card/AddCard";
import EditCard from "../Card/EditCard"; 

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/decks/new" element={<CreateDeck />} /> 
          <Route path="/decks/:deckId/study" element={<Study />} /> 
          <Route path="/decks/:deckId/edit" element={<EditDeck />} /> 
          <Route path="/decks/:deckId/cards/new" element={<AddCard />} /> 
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} /> 
          <Route path="/decks/:deckId" element={<Deck />} /> 
          <Route path="*" element={<NotFound />} /> 

        </Routes>
      </div>
    </>
  );
}

export default Layout;
