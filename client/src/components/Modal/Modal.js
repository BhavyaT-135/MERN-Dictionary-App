import React from 'react'
import './modal.css'
import axios from 'axios'
import { useState } from 'react'

const MovieModal = (props) => {

    const [newWord, setNewWord] = useState('')


    const handleSubmit = () => {
        const word = {
            word_id: newWord
        }
        axios.post('/words', word).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
            }
        }).catch((err) => {
            if(err.response.status === 500) {
                alert("No such word exists")
            }
        })
        setNewWord('')
        props.toggleModal()
        //Refresh the page
        // window.location.reload()
    }

  return (
        <div className="modal" style={{display: props.showModal ? 'block' : 'none'}}>
            <div className="modalContent">
                <div className="modalTitle">Add to Dictionary</div>
                <div className='modalDivider'></div>
                <div className='modalInputHeading'>Enter New Word</div>
                <input type="text" className="modalInput" placeholder="New Word..." value={newWord} onChange={(e) => {
                    e.preventDefault()
                    setNewWord(e.target.value)
                }} />
                <div className='modalRightButtons'>
                    <button className='modalButtonCancel' onClick={() => {
                      props.toggleModal()
                    }}>CANCEL</button>
                    <button className='modalButtonAdd' onClick={() => {
                        handleSubmit()
                    }}>ADD</button>
                </div>
            </div>
        </div>          
  )
}

export default MovieModal