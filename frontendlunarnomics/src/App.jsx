import Article from "./pages/Article";
import News from "./pages/News"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="*" element={<News />} />
        <Route path="/page/*" element={<Article />} />
      </Routes>
    </Router>
    </>
  )
}
//just test commont to check git

export default App
