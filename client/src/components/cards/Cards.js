import React from 'react'
import './cards.css'
import { useNavigate } from 'react-router-dom';

function Cards({ word }) {

    const navigate = useNavigate();
    
    const lexicalEntries = word.word_id.results[0].lexicalEntries;
    
  return (
    <div className="cardsContainer" onClick={() => {navigate(`/${word.word_id.id}`)}}>
          <div className="cardsTitle">{word.word_id.id}</div>
          <div className="cardsDivider"></div>
          {lexicalEntries.map((entry) => {
              return (
                  <div className="cardsEntry" key={entry.lexicalCategory.id}>{`(${entry.lexicalCategory.id}) ${entry.entries[0].senses[0].definitions[0]}`}</div>
              )
          })}
    </div>
  )
}

export default Cards