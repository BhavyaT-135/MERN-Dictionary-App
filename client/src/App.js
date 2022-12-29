import TopBar from "./components/topbar/Topbar";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./components/card/Card";
import { useState } from "react";

function App() {

  const [searchWord, setSearchWord] = useState('')

  return (
    <Router>
      <TopBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <Routes>
        <Route exact path="/" element={<Home searchWord={searchWord} setSearchWord={setSearchWord} />} />
        <Route path="/:word_id" element={<Card />} />
      </Routes>
    </Router>
  );
}

export default App;