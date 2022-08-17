import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Shared/Header';
import { createContext, useEffect, useState } from 'react';

const articleContext = createContext();
function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://still-waters-50260.herokuapp.com/articles')
      .then(res => res.json())
      .then(data => setArticles(data))
  }, [])

  return (
    <div>
      <articleContext.Provider value={articles}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </articleContext.Provider>
    </div>
  );
}

export default App;
export { articleContext };