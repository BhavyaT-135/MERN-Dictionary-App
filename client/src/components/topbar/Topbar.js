import "./topbar.css";
import { useState } from "react";


export default function TopBar({ searchWord, setSearchWord }) {
  
  const [search, setSearch] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchWord(search);
  }

  return (
    <div className='top'>
        <form className='searchBar' onSubmit={(e) => handleSubmit(e)}>
          <input type="search" className="searchInput" placeholder="Vocab" value={search} onChange = {(e) => {
            e.preventDefault();
            setSearch(e.target.value);
            }} 
            onSubmit={(e) => handleSubmit(e)}
          />
          <i className="topIcon fa-solid fa-magnifying-glass" onClick={(e) => handleSubmit(e)}/>       
        </form>      
    </div>
  )
}
