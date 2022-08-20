import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Shared/Header';
import { createContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import CreatePost from './Components/CreatePost/CreatePost';

const articleContext = createContext();
function App() {
  const [articles, setArticles] = useState([]);
  const [signedInUser, setSignedInUser] = useState({});
  const authUser = useAuthState(auth);
  const [handleGroupState, setHandleGroupState] = useState(false);


  useEffect(() => {
    fetch('https://still-waters-50260.herokuapp.com/articles')
      .then(res => res.json())
      .then(data => setArticles(data))
  }, [articles])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        const user = data.find(user => {
          if (data?.email === authUser[0]?.email) {
            return user;
          }
        })
        setSignedInUser(user);
      })
  }, [authUser])


  const data = {
    articles,
    handleGroupState,
    setHandleGroupState,
    signedInUser
  }


  return (
    <div>
      <articleContext.Provider value={data}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </articleContext.Provider>
      <Toaster />
    </div>
  );
}

export default App;
export { articleContext };