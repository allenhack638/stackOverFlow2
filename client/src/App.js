import './App.css';
import Navbar from "./components/navbar/navbar.jsx"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
//the above import allows us to add link tag in our entire project as we can move to any files like {contact , home ..etc}
import { BrowserRouter as Router } from "react-router-dom"
import AllRouts from "./AllRoutes"
import { fetchAllQuestions } from './actions/question'
import { fetchAllUsers } from './actions/users';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRouts />
      </Router>
    </div>
  );
}

export default App;
