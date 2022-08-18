import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Shared/Header';
import { createContext, useEffect, useState } from 'react';

const articleContext = createContext();
function App() {
  const [articles, setArticles] = useState([]);
  const [handleGroupState, setHandleGroupState] = useState(false);

  useEffect(() => {
    fetch('https://still-waters-50260.herokuapp.com/articles')
      .then(res => res.json())
      .then(data => setArticles(data))
  }, [])

  const data = {
    articles,
    handleGroupState,
    setHandleGroupState
  }


  return (
    <div>
      <articleContext.Provider value={data}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-account' element={<Home />} />
          <Route path='/signin' element={<Home />} />
        </Routes>
      </articleContext.Provider>
    </div>
  );
}

export default App;
export { articleContext };