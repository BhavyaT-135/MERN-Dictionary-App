import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import './card.css'

function Card() {
    const word_id = window.location.pathname.split("/")[1];

    const { search } = useLocation();
    const [lexicalEntries, setLexicalEntries] = useState([])
    const [etymology, setEtymologies] = useState([])
    
    useEffect(() => {
        const getWords = async () => {
        const res = await axios.get('/words/'+ word_id)
            setLexicalEntries(res.data.word_id.results[0].lexicalEntries)
            setEtymologies(res.data.word_id.results[0].lexicalEntries[0].entries[0].etymologies)
        }

        getWords();
    }, [search, word_id])

    return (
        <div className="cardContainer">
            <div className="fixedCross">
                <a href="/"><i className='cardCross fa-solid fa-xmark'></i></a>
            </div>
            <div className="cardTitle">
                {word_id}
            </div>
            <div className="cardEtymology">{etymology}</div>
            <div className="cardDivider"></div>
            {lexicalEntries.map((entry) => {
                return (
                    <div className="cardEntry" key={entry.lexicalCategory.id}>
                        <div className='cardLexicalCategory'>{`${entry.lexicalCategory.id}`}</div>
                        <div className='cardDefinition'>{`${entry.entries[0].senses[0].definitions[0]}`}</div>
                        {entry.entries[0].senses[0].examples && (<div className="cardExample"><ul><li>{`${entry.entries[0].senses[0].examples[0].text}`}</li></ul></div>)}
                        <div className="cardDivider"></div>
                    </div>
                )
            })

            }
        </div>
    )
}

export default Card