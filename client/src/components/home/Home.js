import React, { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Cards from '../cards/Cards'
import Modal from '../Modal/Modal'

function Home({searchWord, setSearchWord}) {

  const [words, setWords] = useState([])
  const { search } = useLocation();
 
  useEffect(() => {
    const getWords = async () => {
      const res = await axios.get('/words')
      setWords(res.data)
    }
    getWords();

    if (searchWord) {
      const getSearch = async () => {
        await axios.get('/words/' + searchWord).then((res) => {
          if (res.status === 200 && res.data.length !== 0) {
            setWords([res.data])
          }
          else {
            setWords([])
          }
        }).catch((err) => {
          console.log(err)
          setWords([])
        })
      }
      getSearch();
    }
  }, [search, searchWord])

  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className="home">
      <div className="homeTitle">Words List</div>
      {Array.isArray(words) &&
        (words.map((word) => {
        return (
          <Cards word={word} key={word._id} />
        )
        }))}
      <div className="addButtonFixed">
        <i className='addButton fa-solid fa-plus' onClick={() => {
          toggleModal()
        }}></i>
      </div>
      <Modal showModal={showModal} toggleModal={toggleModal} />
    </div>
  )
}

export default Home